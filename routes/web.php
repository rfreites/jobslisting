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

Route::group(['middleware'=>'company'],function(){
	
	/**
	 * Jobs Routes
	 */
	
	Route::get('jobs/create', [
			'as' => 'jobs_create_path',
			'uses' => 'JobsController@create',
	]);
	
	Route::post('jobs/create', [
			'as' => 'jobs_store_path',
			'uses' => 'JobsController@store',
	]);
	
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


//Company Login
Route::get('empresa/login', [
		'as' => 'auth_empresa_show_path',
		'uses' => 'CompanyAuth\LoginController@showLoginForm',
]);

Route::post('empresa/login', [
		'as' => 'auth_empresa_login_path',
		'uses' => 'CompanyAuth\LoginController@login',
]);

Route::get('empresa/logout', [
		'as' => 'auth_empresa_logout_path',
		'uses' => 'CompanyAuth\LoginController@logout',
]);

//Company Register
Route::get('empresa/register', 'CompanyAuth\RegisterController@showRegistrationForm');
Route::post('empresa/register', 'CompanyAuth\RegisterController@register');

//Company Passwords
Route::post('empresa/password/email', 'CompanyAuth\ForgotPasswordController@sendResetLinkEmail');
Route::post('empresa/password/reset', 'CompanyAuth\ResetPasswordController@reset');
Route::get('empresa/password/reset', 'CompanyAuth\ForgotPasswordController@showLinkRequestForm');
Route::get('empresa/password/reset/{token}', 'CompanyAuth\ResetPasswordController@showResetForm');