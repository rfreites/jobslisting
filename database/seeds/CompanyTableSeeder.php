<?php

use Illuminate\Database\Seeder;
use Jobs4Geeks\Company;
use Jobs4Geeks\Job;

class CompanyTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	factory(Company::class, 540)->create()->each(function($company){
    		$job = factory(Job::class)->make();
    		$company->jobs()->save($job);
    	});
    }
}
