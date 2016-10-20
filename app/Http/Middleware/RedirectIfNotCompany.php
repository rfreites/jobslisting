<?php

namespace Jobs4Geeks\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfNotCompany
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @param  string|null  $guard
	 * @return mixed
	 */
	public function handle($request, Closure $next, $guard = 'company')
	{
	    if (!Auth::guard($guard)->check()) {
	        return redirect()->route('auth_empresa_show_path');
	    }

	    return $next($request);
	}
}