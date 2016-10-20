<?php

use Illuminate\Database\Seeder;

class CompanyTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	factory(Jobs4Devs\Company::class, 540)->create()->each(function($company){
    		$job = factory(Jobs4Devs\Job::class)->make();
    		$company->jobs()->save($job);
    	});
    }
}
