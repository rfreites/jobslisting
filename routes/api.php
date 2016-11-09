<?php

use Illuminate\Http\Request;
use Jobs4Geeks\User;
use Jobs4Geeks\Job;
use Jobs4Geeks\Company;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/user/{id}', function ($id){
	$user = User::find($id);
	return $user;
});//->middleware('auth:api');

Route::get('/users', function (){
	$users = User::all();
	return $users;
});//->middleware('auth:api');

Route::get('/jobs', function (){
	$jobs = Job::all();
	return $jobs;
});//->middleware('auth:api');

Route::get('/companies/', function (){
	$companies = Company::all();
	return $companies;
});//->middleware('auth:api');