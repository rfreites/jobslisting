<?php

namespace Jobs4Geeks\Http\Controllers;

use Illuminate\Http\Request;

use Jobs4Geeks\Http\Requests;
use Jobs4Geeks\Job;

class JobsController extends Controller
{
	
	public function show($slug)
	{
		
		$job = Job::where('slug','=', $slug)->firstOrFail();
	
		return view('layouts.jobs.jobs', ['job' => $job]);
	}
	
	public function create()
	{
		return view('layouts.jobs.create');
	}
}
