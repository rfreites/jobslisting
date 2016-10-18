<?php

namespace Jobs4Devs\Http\Controllers;

use Illuminate\Http\Request;

use Jobs4Devs\Http\Requests;

class HomeController extends Controller
{
    public function index()
    {
    	return view('home');
    }
}
