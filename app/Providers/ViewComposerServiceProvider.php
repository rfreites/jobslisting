<?php

namespace Jobs4Geeks\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\View\Factory;
use Jobs4Geeks\Http\Composers\CurrentUserComposer;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Auth;



class ViewComposerServiceProvider extends ServiceProvider
{

	/**
	public function boot(Factory $factory)
	{
		// "* es todas" también se puede en layouts y vistas determinadas
		$factory->composer('*', CurrentUserComposer::class);
	}
	*/
	
	public function boot(Guard $auth)
	{
		//dd($auth->user()); // null
	
		/**
		view()->composer('*', function(View $view) use ($auth){
			dd($auth);//->user()); // returns User object
			$view->with('currentUser', $auth->user());// does what you expect
		});
		*/
		
		view()->composer('*', function(View $view) use ($auth){
			//dd($auth);//->user()); // returns User object
			
			$currentUserSession = false;
			
			if(Auth::guard('company')->user())
			{
				$currentUserSession = Auth::guard('company')->user();
				
			}else if(Auth::guard('user')->user()){

				$currentUserSession = Auth::guard('user')->user();
				
			}
			
			$view->with('currentUser', $currentUserSession);// does what you expect
		});
	}
	
	
	public function register()
	{
		//
	}
}