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

Route::get('/', 'HomeController@index');

/**
 * InicioController
 */
Route::get('/inicio', 'InicioController@inicio');

/**
 * Jobs Routes
 */

Route::get('jobs/{id}', [
    'as' => 'job_show_path', 
	'uses' => 'JobsController@show'
]);















