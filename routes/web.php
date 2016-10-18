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
 * Jobs
 */
Route::get('/jobs', 'JobsController@index' );

/**
 * Simple ruta
 */
Route::get('/simpleruta', function() {
    return 'Hola, soy una simple ruta.';
});

/**
 * Recibiendo parametros
 */
Route::get('users/{name}', function($name) {
    return 'Hola yo soy el usuario '.$name.'.';
});

/**
 * InicioController
 */
Route::get('/inicio', 'InicioController@inicio');

/**
 * Guardar usuario
 */

Route::get('/users', 'InicioController@guardarUsuario');

Route::get('/user/details/{user}', 'InicioController@verUsuario');















