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

	Route::get('jobs/create', [
			'as' => 'jobs_create_path',
			'uses' => 'JobsController@create',
	]);

	Route::post('jobs/create', [
			'as' => 'jobs_store_path',
			'uses' => 'JobsController@store',
	]);

});

Route::group(['middleware'=>'user'], function(){
	Route::get('jobs/{id}', [
			'as' => 'job_show_path',
			'uses' => 'JobsController@show'
	]);
});

//User Login
Route::get('user/login', [
    'as' => 'auth_show_path', 
	'uses' => 'UserAuth\LoginController@showLoginForm'
]);

Route::post('user/login', [
    'as' => 'auth_store_path', 
	'uses' => 'UserAuth\LoginController@login'
]);

Route::get('user/logout', 'UserAuth\LoginController@logout');

//User Register
Route::get('user/register', 'UserAuth\RegisterController@showRegistrationForm');
Route::post('user/register', 'UserAuth\RegisterController@register');

//User Passwords
Route::post('user/password/email', 'UserAuth\ForgotPasswordController@sendResetLinkEmail');
Route::post('user/password/reset', 'UserAuth\ResetPasswordController@reset');
Route::get('user/password/reset', 'UserAuth\ForgotPasswordController@showLinkRequestForm');
Route::get('user/password/reset/{token}', 'UserAuth\ResetPasswordController@showResetForm');


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

