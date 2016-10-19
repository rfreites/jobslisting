<?php

namespace Jobs4Devs\Http\Controllers;

use Illuminate\Http\Request;

use Jobs4Devs\Http\Requests;
use Jobs4Devs\Job;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
    {
    	
    	$jobs = Job::with('company')->paginate(20);
    	
    	$total_results = Job::with('company')->count();
    	
    	return view('home', ['jobs' => $jobs, 'total_results' => $total_results]);
    }
}
