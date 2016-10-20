<?php

namespace Jobs4Geeks\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\View\Factory;
use Jobs4Geeks\Http\Composers\CurrentUserComposer;



class ViewComposerServiceProvider extends ServiceProvider
{
	public function boot(Factory $factory)
	{
		// "* es todas" también se puede en layouts y vistas determinadas
		$factory->composer('*', CurrentUserComposer::class);
	}
	
	public function register()
	{
		//
	}
}