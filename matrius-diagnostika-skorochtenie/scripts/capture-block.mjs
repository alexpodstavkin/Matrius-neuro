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

// Прокрутка для lazy load
await page.evaluate(async () => {
  const total = document.body.scrollHeight
  for (let y = 0; y <= total; y += 600) {
    window.scrollTo(0, y)
    await new Promise((r) => setTimeout(r, 200))
  }
  window.scrollTo(0, 0)
})
await page.waitForTimeout(1500)

// Находим record сетки bento — через первую ячейку «Игровая платформа»
const firstCell = page.locator('text=Игровая платформа').first()
await firstCell.scrollIntoViewIfNeeded()
await page.waitForTimeout(500)

const recordHandle = await firstCell.evaluateHandle((el) => el.closest('.r') || el.closest('[data-record-type]'))
const record = recordHandle.asElement()
if (!record) throw new Error('Bento record not found')

const box = await record.boundingBox()
const sectionAbsTopCss = await record.evaluate((el) => el.getBoundingClientRect().top + window.scrollY)
console.log('bento record box:', box, 'absTop:', sectionAbsTopCss)

const sectionBuf = await record.screenshot({ type: 'png' })
const meta = await sharp(sectionBuf).metadata()
console.log('section img:', meta.width, 'x', meta.height)

// Получаем Y относительно секции через locator (не через manual поиск)
const heading = page.locator('text=Почему нас выбирают родители и дети').first()
const cta = page.locator('text=Записаться на пробный урок').first()

// Фиксированная обрезка — убираем верхний заголовок Tilda и нижнюю CTA-кнопку.
// При DSF=2: 1px css = 2px реальных. Высота заголовка с воздухом ~120px css, CTA-кнопка с воздухом ~120px css.
const cropTopCss = 205
const cropBottomCssFromBottom = 100

const topPx = Math.round(cropTopCss * DSF)
const heightPx = meta.height - topPx - Math.round(cropBottomCssFromBottom * DSF)

await sharp(sectionBuf)
  .extract({ left: 0, top: topPx, width: meta.width, height: heightPx })
  .png({ compressionLevel: 9 })
  .toFile('public/why-parents-block.png')

console.log('OK cropped:', { topPx, heightPx, w: meta.width })
await browser.close()
