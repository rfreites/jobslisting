<?php

namespace Jobs4Devs\Http\Composers;
use \Illuminate\View\View;
use \Illuminate\Support\Facades\Auth;


class CurrentUserComposer
{

	public function compose(View $view)
	{
		$view->with('currentUser', Auth::user());
	}
}