<?php

use Jobs4Devs\Http\Controllers\HomeController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', [
		'as' => 'jobs_list_path',
		'uses' => 'HomeController@index'
]);

Route::group(['middleware'=>'auth'],function(){
	
	/**
	 * Jobs Routes
	 */
	
	Route::get('jobs/{id}', [
			'as' => 'job_show_path',
			'uses' => 'JobsController@show'
	]);
});

/**
 * Auth Routes
 */

Route::get('login', [
    'as' => 'auth_show_path', 
	'uses' => 'AuthController@index'
]);

Route::post('login', [
		'as' => 'auth_store_path',
		'uses' => 'AuthController@store'
]);

Route::get('logout', [
		'as' => 'auth_destroy_path',
		'uses' => 'AuthController@destroy'
]);














