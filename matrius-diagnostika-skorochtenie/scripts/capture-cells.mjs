import { chromium } from 'playwright'
import sharp from 'sharp'

const URL = 'https://matrius.online/sckorochtenie?utm_source=organic&utm_medium=en'
const DSF = 2

const browser = await chromium.launch({ headless: true })
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: DSF,
})
const page = await ctx.newPage()

await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 })
await page.waitForLoadState('load', { timeout: 60000 }).catch(() => {})
await page.waitForTimeout(3000)

// Удаляем все плавающие/fixed элементы (cookies, чаты, всплывашки)
await page.evaluate(() => {
  for (const el of document.querySelectorAll('*')) {
    const cs = getComputedStyle(el)
    if (cs.position === 'fixed' || cs.position === 'sticky') {
      el.remove()
    }
  }
})
await page.waitForTimeout(300)

await page.evaluate(async () => {
  const total = document.body.scrollHeight
  for (let y = 0; y <= total; y += 600) {
    window.scrollTo(0, y)
    await new Promise((r) => setTimeout(r, 200))
  }
  window.scrollTo(0, 0)
})
await page.waitForTimeout(1500)

await page.locator('text=Игровая платформа').first().scrollIntoViewIfNeeded()
await page.waitForTimeout(800)

console.log('full-page screenshot...')
const fullBuf = await page.screenshot({ fullPage: true, type: 'png' })
const meta = await sharp(fullBuf).metadata()
console.log('full page:', meta.width, 'x', meta.height)

// Получим bbox каждой карточки через t396__elem с заданным data-elem-type="image" или background
const cardsRaw = await page.evaluate(() => {
  // Берём секцию по тексту
  const re = /Игровая платформа/i
  let target = null
  for (const el of document.querySelectorAll('*')) {
    if (el.children.length === 0 && re.test(el.textContent || '')) {
      target = el
      break
    }
  }
  if (!target) return null
  const section = target.closest('.r')
  if (!section) return null

  const elems = Array.from(section.querySelectorAll('.t396__elem'))
  return elems
    .map((el) => {
      const r = el.getBoundingClientRect()
      const cs = getComputedStyle(el)
      const dataType = el.getAttribute('data-elem-type') || ''
      const elemId = el.getAttribute('data-elem-id') || ''
      const bg = cs.backgroundColor || ''
      const bi = cs.backgroundImage || ''
      const text = (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80)
      return {
        elemId,
        dataType,
        x: r.left + window.scrollX,
        y: r.top + window.scrollY,
        w: r.width,
        h: r.height,
        bg,
        bi: bi.slice(0, 80),
        text,
      }
    })
    .filter((c) => c.w >= 200 && c.h >= 100 && c.w <= 1200 && c.h <= 600)
})

if (!cardsRaw) {
  console.error('no cards found')
  process.exit(1)
}

console.log(`Found ${cardsRaw.length} t396__elem cards:`)
for (const c of cardsRaw)
  console.log(
    `  id=${c.elemId} type=${c.dataType} ${c.w.toFixed(0)}x${c.h.toFixed(0)} @${c.x.toFixed(0)},${c.y.toFixed(0)} bg=${c.bg.slice(0, 30)} bi=${c.bi ? 'yes' : 'no'} txt="${c.text}"`
  )

// Дедупликация по координатам (могут быть наложенные shape поверх друг друга)
const dedup = []
for (const c of cardsRaw) {
  const dup = dedup.find(
    (u) => Math.abs(u.x - c.x) < 3 && Math.abs(u.y - c.y) < 3 && Math.abs(u.w - c.w) < 3 && Math.abs(u.h - c.h) < 3
  )
  if (!dup) dedup.push(c)
}
console.log(`After dedup: ${dedup.length}`)

// Берём ячейки верхнего ряда (y ≈ 1044) и второго ряда (y ≈ 1334–1638)
// Фильтр: только в диапазоне Y bento-сетки
dedup.sort((a, b) => a.y - b.y || a.x - b.x)

// Найдём 6 ключевых карточек по координатам, известным заранее (стабильны на этом URL)
// Жёстко заданные координаты карточек bento (стабильны для этого URL).
// Teachers расширен до 461 чтобы захватить текст, который выступает за пределы shape.
const TARGETS = [
  { id: 'game-platform', x: 24, y: 1044, w: 907, h: 266 },
  { id: 'years', x: 955, y: 1044, w: 461, h: 266 },
  { id: 'support', x: 24, y: 1334, w: 461, h: 280 },
  { id: 'teachers', x: 509, y: 1334, w: 422, h: 280 },
  { id: 'license', x: 955, y: 1334, w: 461, h: 550 },
  { id: 'cartoon', x: 24, y: 1638, w: 907, h: 247 },
]

const assigned = {}
for (const t of TARGETS) {
  assigned[t.id] = t
}

for (const [id, c] of Object.entries(assigned)) {
  const left = Math.max(0, Math.round(c.x * DSF))
  const top = Math.max(0, Math.round(c.y * DSF))
  const width = Math.min(Math.round(c.w * DSF), meta.width - left)
  const height = Math.min(Math.round(c.h * DSF), meta.height - top)
  await sharp(fullBuf)
    .extract({ left, top, width, height })
    .png({ compressionLevel: 9 })
    .toFile(`public/why-cell-${id}.png`)
  console.log('saved', id, `${width}x${height}`)
}

await browser.close()
console.log('done')
