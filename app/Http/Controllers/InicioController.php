<?php

namespace Jobs4Devs\Http\Controllers;

use Illuminate\Http\Request;

use Jobs4Devs\Http\Requests;

use Jobs4Devs\User;

class InicioController extends Controller
{
    public function inicio()
    {
    	return "Hola soy Ronny.";
    }

    public function guardarUsuario()
    {
    	$user = User::create([
    			'first_name' => 'Ronny',
    			'last_name' => 'Freites',
    			'email' => 'ronny@gmail.com',
    			'password' => 'otrosecret'
    		]);

    	$user->save();

    	return $user;
    }
    
    public function verUsuario($user_name){
    	$user = User::where('first_name', $user_name)->get();
    	return $user;
    }
}
