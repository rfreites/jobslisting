<?php

namespace Jobs4Devs\Http\Controllers;

use Illuminate\Http\Request;

use Jobs4Devs\Http\Requests;
use Jobs4Devs\Job;

class HomeController extends Controller
{
    public function index()
    {
    	$jobs = Job::with('company')->get();
    	
    	$total_results = $jobs->count();
    	
    	return view('home', ['jobs' => $jobs, 'total_results' => $total_results]);
    }
}
