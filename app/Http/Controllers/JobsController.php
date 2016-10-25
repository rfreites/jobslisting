<?php

namespace Jobs4Geeks\Http\Controllers;

use Illuminate\Http\Request;
use Jobs4Geeks\Job;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

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
	 
	public function store(Request $request)
	{
		$validator = Validator::make($request->all(), [
					'title' => 'required',
					'description' => 'required',
					'salary' => 'required',
					'number_of_vacancies' => 'required',
					'hire_date' => 'required'
				]);
		
		if ($validator->fails())
		{
			return redirect()
				->route('jobs_create_path')
				->withErrors($validator)
				->withInput();
		}
		
		$job = new Job;
		
		$job->title = $request->get('title');
		$job->description = $request->get('description');
		$job->salary = $request->get('salary');
		$job->number_of_vacancies = $request->get('number_of_vacancies');
		$job->hire_date = $request->get('hire_date');
		$job->slug = (string)(str_replace(" ", "-", $request->get('title')).'-'.random_int($min = 100000, $max = 999999));
		$job->company_id = Auth::guard('company')->user()->id;
		
		$job->save();
		
		return redirect()->route('job_show_path', $job->slug);
		
	}
	
	public function edit($slug)
	{
		$job = Job::where('slug','=', $slug)->firstOrFail();
		
		return view('layouts.jobs.edit', ['job' => $job]);
	}

	public function update(Request $request, $slug)
	{

		$validator = Validator::make($request->all(), [
					'title' => 'required',
					'description' => 'required',
					'salary' => 'required',
					'number_of_vacancies' => 'required',
					'hire_date' => 'required'
				]);
		
		if ($validator->fails())
		{
			return redirect()
				->route('jobs_edit_path', ['slug' => $slug])
				->withErrors($validator)
				->withInput();
		}

		$job = Job::where('slug','=', $slug)->firstOrFail();

		$job->title = $request->get('title');
		$job->description = $request->get('description');
		$job->salary = $request->get('salary');
		$job->number_of_vacancies = $request->get('number_of_vacancies');
		$job->hire_date = $request->get('hire_date');
		$job->slug = (string)(str_replace(" ", "-", $request->get('title')).'-'.random_int($min = 100000, $max = 999999));
		$job->company_id = Auth::guard('company')->user()->id;
		
		$job->save();
		
		return redirect()->route('job_show_path', ['slug' => $job->slug]);
	}

	public function destroy(Request $request, $slug)
	{
		$job = Job::where('slug','=', $slug)->firstOrFail()->delete();

		return redirect()->route('jobs_list_path');
	}
}















