<?php

namespace Jobs4Devs\Http\Controllers;

use Illuminate\Http\Request;

use Jobs4Devs\Http\Requests;
use Jobs4Devs\Job;

class JobsController extends Controller
{
	
	public function show($slug)
	{
		
		$job = Job::where('slug','=', $slug)->firstOrFail();
	
		return view('./layouts/jobs/jobs', ['job' => $job]);
	}
}
