<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;
use Illuminate\Support\Facades\Log;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        //
    ];

    protected function tokensMatch($request)
{
    $tokenMatch = parent::tokensMatch($request);
    Log::debug('🛡 CSRF check result', [
        'passed' => $tokenMatch,
        'token_in_request' => $request->header('X-XSRF-TOKEN'),
        'token_in_session' => $request->session()->token(),
        'session_id' => session()->getId()
    ]);

    return $tokenMatch;
}

}
