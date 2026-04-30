<?php
/**
 * Обработчик формы лендинга /skorochtenie-neuro/.
 * Принимает JSON от React-формы и создаёт сделку в GetCourse через
 * gcCreateDeal() из getcourse.php (snippet из скилла getcourse-api).
 *
 * Установка:
 *   1. Скопировать .env.example → .env, заполнить GC_*.
 *   2. Положить папку php/ в public_root рядом с лендингом.
 *      По умолчанию URL обработчика будет: /skorochtenie-neuro/php/submit.php
 *   3. На фронте VITE_GC_PROXY_URL = /skorochtenie-neuro/php/submit.php
 *      (или абсолютный URL).
 *
 * Безопасность:
 *   - .env лежит на диске, в репо не коммитится.
 *   - Запретите доступ к .env через nginx (см. README рядом).
 */

declare(strict_types=1);

ini_set('display_errors', '0');
error_reporting(E_ALL);

// ─────────────────────────────────────────────────────────────────────
// 1. Загрузка .env (рядом с этим файлом). Простой парсер, без зависимостей.
// ─────────────────────────────────────────────────────────────────────
function loadDotEnv(string $path): void {
    if (!is_file($path) || !is_readable($path)) return;
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#')) continue;
        if (!str_contains($line, '=')) continue;
        [$k, $v] = explode('=', $line, 2);
        $k = trim($k);
        $v = trim($v);
        // Снимаем кавычки, если есть
        if ((str_starts_with($v, '"') && str_ends_with($v, '"')) ||
            (str_starts_with($v, "'") && str_ends_with($v, "'"))) {
            $v = substr($v, 1, -1);
        }
        if (getenv($k) === false) {
            putenv("$k=$v");
            $_ENV[$k] = $v;
        }
    }
}
loadDotEnv(__DIR__ . '/.env');

require_once __DIR__ . '/getcourse.php';

// ─────────────────────────────────────────────────────────────────────
// 2. Логирование
// ─────────────────────────────────────────────────────────────────────
function leadLog(string $level, string $msg, array $ctx = []): void {
    $logDir  = __DIR__ . '/logs';
    if (!is_dir($logDir)) @mkdir($logDir, 0755, true);
    $logFile = $logDir . '/leads.log';
    $line = sprintf(
        "%s [%s] %s%s\n",
        date('c'),
        $level,
        $msg,
        $ctx ? ' ' . json_encode($ctx, JSON_UNESCAPED_UNICODE) : ''
    );
    @file_put_contents($logFile, $line, FILE_APPEND | LOCK_EX);
}

// ─────────────────────────────────────────────────────────────────────
// 3. CORS (если фронт раздаётся с другого origin)
// ─────────────────────────────────────────────────────────────────────
$allowedOrigins = array_filter(array_map('trim', explode(
    ',',
    getenv('ALLOWED_ORIGINS') ?: 'https://web.matrius.online'
)));
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin && in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Vary: Origin");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Max-Age: 86400");
}
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ─────────────────────────────────────────────────────────────────────
// 4. Чтение payload
// ─────────────────────────────────────────────────────────────────────
header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

$ct  = $_SERVER['CONTENT_TYPE'] ?? '';
$raw = file_get_contents('php://input') ?: '';
if (str_contains($ct, 'application/json')) {
    $payload = json_decode($raw, true);
    if (!is_array($payload)) $payload = [];
} else {
    // x-www-form-urlencoded или multipart
    $payload = $_POST;
}

// ─────────────────────────────────────────────────────────────────────
// 5. Валидация
// ─────────────────────────────────────────────────────────────────────
function field(array $a, string $k, int $max = 256): string {
    $v = $a[$k] ?? '';
    if (!is_string($v)) return '';
    return trim(mb_substr($v, 0, $max));
}

$name  = field($payload, 'name', 120);
$phone = field($payload, 'phone', 32);
$email = field($payload, 'email', 254);
$age   = field($payload, 'age', 64);
$child = field($payload, 'child', 120);

// Honeypot — если в payload есть `company`, считаем спамом и тихо отвечаем 202.
if (!empty(field($payload, 'company', 200))) {
    leadLog('WARN', 'honeypot', ['ip' => $_SERVER['REMOTE_ADDR'] ?? '?', 'email' => $email]);
    http_response_code(202);
    echo json_encode(['ok' => true, 'queued' => true]);
    exit;
}

if ($name === '' || $phone === '' || $age === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode([
        'ok'    => false,
        'error' => 'validation_failed',
        'fields' => [
            'name'  => $name  === '' ? 'required' : null,
            'phone' => $phone === '' ? 'required' : null,
            'email' => filter_var($email, FILTER_VALIDATE_EMAIL) ? null : 'invalid',
            'age'   => $age   === '' ? 'required' : null,
        ],
    ]);
    exit;
}

// ─────────────────────────────────────────────────────────────────────
// 6. Сборка GC payload
// ─────────────────────────────────────────────────────────────────────
$offer = getenv('GC_OFFER_CODE') ?: '';
if ($offer === '') {
    leadLog('ERROR', 'missing_env', ['env' => 'GC_OFFER_CODE']);
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'server_misconfigured']);
    exit;
}

$nameParts = preg_split('/\s+/', $name, 2);
$firstName = $nameParts[0] ?? $name;
$lastName  = $nameParts[1] ?? '';

$addfields = ['Возраст ребёнка' => $age];
if ($child !== '') {
    $addfields['Имя ребёнка'] = $child;
}

$dealComment = "Возраст ребёнка: $age";
if ($child !== '') {
    $dealComment .= "\nИмя ребёнка: $child";
}

$user = [
    'email'      => $email,
    'phone'      => $phone,
    'first_name' => $firstName,
    'last_name'  => $lastName,
    'addfields'  => $addfields,
];

$session = [];
foreach (['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'referer'] as $k) {
    $v = field($payload, $k, 256);
    if ($v !== '') $session[$k] = $v;
}
if (!isset($session['referer']) && !empty($_SERVER['HTTP_REFERER'])) {
    $session['referer'] = $_SERVER['HTTP_REFERER'];
}

// Идемпотентность: повторный submit того же email за минуту — один deal.
$dealNumber = 'web-' . substr(sha1(strtolower($email) . '|' . $offer . '|' . intdiv(time(), 60)), 0, 10);

$deal = [
    'offer_code'   => $offer,
    'deal_status'  => 'Новый',
    'deal_comment' => $dealComment,
    'deal_number'  => $dealNumber,
];

// ─────────────────────────────────────────────────────────────────────
// 7. Вызов GC + ответ
// ─────────────────────────────────────────────────────────────────────
leadLog('INFO', 'lead.accepted', [
    'ip'         => $_SERVER['REMOTE_ADDR'] ?? '?',
    'email'      => $email,
    'phone'      => $phone,
    'age'        => $age,
    'deal_number'=> $dealNumber,
    'utm_source' => $session['utm_source'] ?? null,
]);

try {
    $resp   = gcCreateDeal($user, $deal, [], $session);
    $result = $resp['result'] ?? [];
    leadLog('INFO', 'gc.ok', [
        'deal_number' => $dealNumber,
        'user_id'     => $result['user_id']  ?? null,
        'deal_id'     => $result['deal_id']  ?? null,
        'user_status' => $result['user_status'] ?? null,
    ]);
    http_response_code(202);
    echo json_encode([
        'ok'          => true,
        'deal_number' => $dealNumber,
    ]);
} catch (Throwable $e) {
    leadLog('ERROR', 'gc.fail', [
        'deal_number' => $dealNumber,
        'err'         => $e->getMessage(),
    ]);
    // 502 — нашa форма приняла, но GC не подтвердил.
    // Пользователю показываем дружелюбное сообщение, чтобы не пугать.
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'gc_unreachable']);
}
