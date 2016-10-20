<?php

namespace Jobs4Geeks\Http\Controllers;

use Illuminate\Http\Request;

use Jobs4Geeks\Http\Requests;
use Jobs4Geeks\Job;
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
