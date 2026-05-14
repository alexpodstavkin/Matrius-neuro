<?php
/**
 * Диагностический endpoint. Доступ через ?key=matrius-diag
 * Цель — увидеть почему не уходят сделки в GetCourse.
 * После починки удалите этот файл из репо.
 */

declare(strict_types=1);
ini_set('display_errors', '0');
error_reporting(E_ALL);

if (($_GET['key'] ?? '') !== 'matrius-diag') {
    http_response_code(404);
    exit('Not Found');
}

header('Content-Type: text/plain; charset=utf-8');

echo "=== PHP runtime ===\n";
echo 'PHP version: ' . PHP_VERSION . "\n";
echo 'curl ext:    ' . (extension_loaded('curl') ? 'yes' : 'NO') . "\n";
echo 'json ext:    ' . (extension_loaded('json') ? 'yes' : 'NO') . "\n";
echo 'mbstring:    ' . (extension_loaded('mbstring') ? 'yes' : 'NO') . "\n";
echo "\n";

echo "=== Paths ===\n";
echo '__DIR__:                 ' . __DIR__ . "\n";
echo 'local .env path:         ' . __DIR__ . "/.env\n";
echo 'local .env exists:       ' . (is_file(__DIR__ . '/.env') ? 'yes' : 'NO') . "\n";
echo 'neighbour .env path:     ' . __DIR__ . "/../../skorochtenie-neuro/php/.env\n";
echo 'neighbour .env exists:   ' . (is_file(__DIR__ . '/../../skorochtenie-neuro/php/.env') ? 'yes' : 'NO') . "\n";
echo 'neighbour .env readable: ' . (is_readable(__DIR__ . '/../../skorochtenie-neuro/php/.env') ? 'yes' : 'NO') . "\n";
echo "\n";

// Загружаем env как submit.php
function loadDotEnv(string $path): bool {
    if (!is_file($path) || !is_readable($path)) return false;
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#')) continue;
        if (!str_contains($line, '=')) continue;
        [$k, $v] = explode('=', $line, 2);
        $k = trim($k); $v = trim($v);
        if ((str_starts_with($v, '"') && str_ends_with($v, '"')) ||
            (str_starts_with($v, "'") && str_ends_with($v, "'"))) {
            $v = substr($v, 1, -1);
        }
        if (getenv($k) === false) putenv("$k=$v");
    }
    return true;
}

$localLoaded     = loadDotEnv(__DIR__ . '/.env');
$neighbourLoaded = loadDotEnv(__DIR__ . '/../../skorochtenie-neuro/php/.env');

echo "=== .env loading ===\n";
echo 'local .env loaded:       ' . ($localLoaded ? 'yes' : 'no') . "\n";
echo 'neighbour .env loaded:   ' . ($neighbourLoaded ? 'yes' : 'no') . "\n";
echo "\n";

echo "=== Loaded env vars (values hidden for secrets) ===\n";
$account = getenv('GC_ACCOUNT') ?: '';
$key     = getenv('GC_SECRET_KEY') ?: '';
$offer   = getenv('GC_OFFER_CODE') ?: '';
$cors    = getenv('ALLOWED_ORIGINS') ?: '';
echo 'GC_ACCOUNT:       ' . ($account === '' ? '(empty)' : $account) . "\n";
echo 'GC_SECRET_KEY:    ' . ($key === '' ? '(empty)' : '*** length=' . strlen($key)) . "\n";
echo 'GC_OFFER_CODE:    ' . ($offer === '' ? '(empty)' : $offer) . "\n";
echo 'ALLOWED_ORIGINS:  ' . ($cors === '' ? '(empty)' : $cors) . "\n";
echo "\n";

echo "=== Logs dir ===\n";
$logDir = __DIR__ . '/logs';
echo 'logs path:           ' . $logDir . "\n";
echo 'logs exists:         ' . (is_dir($logDir) ? 'yes' : 'no') . "\n";
echo 'logs writable:       ' . (is_writable(__DIR__) ? 'yes (parent)' : 'no (parent)') . "\n";
if (is_dir($logDir) && is_file($logDir . '/leads.log')) {
    echo "--- last 20 lines of leads.log ---\n";
    $lines = file($logDir . '/leads.log');
    $tail  = array_slice($lines, -20);
    echo implode('', $tail);
}
echo "\n";

echo "=== Live GC test (gcCall to /pl/api/users with no addfields) ===\n";
if ($account === '' || $key === '') {
    echo "SKIP: GC_ACCOUNT or GC_SECRET_KEY empty\n";
} else {
    $host = strpos($account, '.') !== false ? $account : "{$account}.getcourse.ru";
    $url  = "https://{$host}/pl/api/users";
    $body = http_build_query([
        'action' => 'add',
        'key'    => $key,
        'params' => base64_encode(json_encode([
            'user'   => ['email' => 'diag+ssr@matrius.online'],
            'system' => ['refresh_if_exists' => 1],
        ], JSON_UNESCAPED_UNICODE)),
    ]);
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $body,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_CONNECTTIMEOUT => 5,
    ]);
    $raw  = curl_exec($ch);
    $err  = curl_error($ch);
    $code = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);
    echo "Target URL: $url\n";
    echo "HTTP code:  $code\n";
    echo "curl error: " . ($err ?: '(none)') . "\n";
    echo "Response body (first 500 bytes):\n";
    echo substr((string) $raw, 0, 500) . "\n";
}
