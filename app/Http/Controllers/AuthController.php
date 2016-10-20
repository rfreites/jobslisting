<?php

namespace Jobs4Geeks\Http\Controllers;

use Illuminate\Http\Request;

use Jobs4Geeks\Http\Requests;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function index()
    {
    	return view('layouts.auth.user.user_login');
    }
    
    public function store(Request $request)
    {
    	$this->validate($request, [
    		'username' => 'required',
    		'password' => 'required',
    	]);
    	
    	if (Auth::attempt(['username' => $request->username, 'password' => $request->password])) {
    	
    		return redirect()->route('jobs_list_path');
    	}
    	
    	elseif (Auth::attempt(['email'=> $request->username, 'password' => $request->password])) {
    	
    		return redirect()->route('jobs_list_path');
    	}
    	else {
    		
    		return redirect()->route('auth_show_path')->withErrors('El usuario no existe.');    	
    	} 	  	
    }
    
    public function destroy()
    {
    	auth()->logout();
    	
    	return redirect()->route('auth_show_path');
    }
}