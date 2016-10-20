<?php

namespace Jobs4Geeks\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfNotUser
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @param  string|null  $guard
	 * @return mixed
	 */
	public function handle($request, Closure $next, $guard = 'user')
	{
	    if (!Auth::guard($guard)->check()) {
	        return redirect()->route('auth_show_path');
	    }

	    return $next($request);
	}
}