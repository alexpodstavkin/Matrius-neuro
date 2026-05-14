<?php
/**
 * GetCourse API — минимальный клиент для встраивания в обработчики форм.
 * Скопирован из anthropic-skill `getcourse-api` (snippets/getcourse.php).
 *
 * Требуется: PHP 7.0+, ext-curl, ext-json.
 * Env: GC_ACCOUNT (поддомен или кастомный домен), GC_SECRET_KEY, GC_OFFER_CODE.
 *
 * Документация: https://getcourse.ru/help/api
 */

/**
 * Низкоуровневый вызов. Возвращает распарсенный JSON-ответ GC.
 * Кидает RuntimeException при сетевой ошибке / не-JSON / success=false.
 */
function gcCall(string $path, array $params): array {
    $account = getenv('GC_ACCOUNT') ?: '';
    $key     = getenv('GC_SECRET_KEY') ?: '';
    if ($account === '' || $key === '') {
        throw new RuntimeException('GC_ACCOUNT и GC_SECRET_KEY не заданы в env');
    }

    // GC_ACCOUNT может быть поддоменом ("matrius") или полным доменом ("school-genius.club")
    $host = strpos($account, '.') !== false ? $account : "{$account}.getcourse.ru";
    $url  = "https://{$host}/pl/api/{$path}";
    $json = json_encode($params, JSON_UNESCAPED_UNICODE);
    $body = http_build_query([
        'action' => 'add',
        'key'    => $key,
        'params' => base64_encode($json),
    ]);

    // По чеклисту скилла: ретрай 5xx и сетевых таймаутов до 3 раз
    // с экспоненциальным back-off (0.5s → 1s → 2s). 4xx — НЕ ретраим.
    $maxAttempts = 3;
    $attempt = 0;
    $raw = false;
    $lastCode = 0;
    $lastErr = '';

    while ($attempt < $maxAttempts) {
        $attempt++;
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST           => true,
            CURLOPT_POSTFIELDS     => $body,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 30,
            CURLOPT_CONNECTTIMEOUT => 10,
            CURLOPT_HTTPHEADER     => ['Accept: application/json; q=1.0, */*; q=0.1'],
        ]);
        $raw      = curl_exec($ch);
        $err      = curl_error($ch);
        $errno    = curl_errno($ch);
        $lastCode = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        curl_close($ch);

        $isNetwork = ($raw === false);
        $is5xx     = ($lastCode >= 500 && $lastCode < 600);

        if (!$isNetwork && !$is5xx) {
            // Получили ответ и это не 5xx — выходим из retry-цикла
            break;
        }

        $lastErr = $isNetwork ? "network($errno): $err" : "http_$lastCode";

        if ($attempt < $maxAttempts) {
            // Экспоненциальный back-off: 500ms → 1000ms → 2000ms
            usleep((int) (500000 * pow(2, $attempt - 1)));
            continue;
        }

        // Исчерпали попытки + сетевая ошибка → 502/таймаут наверх
        if ($isNetwork) {
            throw new RuntimeException("GC network error after $attempt attempts: $lastErr");
        }
    }

    $data = json_decode((string) $raw, true);
    if (!is_array($data)) {
        throw new RuntimeException("GC non-JSON ($lastCode): " . substr((string) $raw, 0, 500));
    }
    if (empty($data['success'])) {
        $msg = $data['result']['error_message'] ?? 'unknown';
        throw new RuntimeException("GC error: $msg");
    }
    return $data;
}

/** Создать заказ (сделку). */
function gcCreateDeal(array $user, array $deal, array $system = [], array $session = []): array {
    if (empty($user['email'])) {
        throw new InvalidArgumentException('user.email обязателен');
    }
    if (empty($deal['offer_code']) && empty($deal['product_title'])) {
        throw new InvalidArgumentException('deal: нужен offer_code или product_title');
    }
    return gcCall('deals', [
        'user'    => $user,
        'system'  => array_merge([
            'refresh_if_exists'   => 1,
            'return_payment_link' => 1,
            'return_deal_number'  => 1,
        ], $system),
        'session' => $session,
        'deal'    => $deal,
    ]);
}

/** Создать или обновить пользователя. */
function gcUpdateUser(string $email, array $addfields = [], array $groups = [], array $extra = []): array {
    $user = array_merge(['email' => $email], $extra);
    if (!empty($addfields)) {
        $user['addfields'] = $addfields;
    }
    if (!empty($groups)) {
        $user['group_name'] = array_values($groups);
    }
    return gcCall('users', [
        'user'   => $user,
        'system' => ['refresh_if_exists' => 1],
    ]);
}

/** Добавить пользователя в одну или несколько групп. */
function gcAddUserToGroups(string $email, array $groups): array {
    if (empty($groups)) {
        throw new InvalidArgumentException('groups пустой');
    }
    return gcUpdateUser($email, [], $groups);
}
