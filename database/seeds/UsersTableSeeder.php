<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	/**
    	DB::table('users')->insert([
    		'username'=>'ronnyf89',
    		'first_name'=>'Ronny',
    		'last_name'=>'Freites',
    		'email'=>'ronnyangelo@gmail.com',
    		'password'=>bcrypt('secret'),
    		'active'=> 1,
    		'birthdate'=>date('1989/09/13'),
    		'country'=>'Costa Rica',
    		'city'=>'San José',
    		'address'=>'Sabanilla de Montes de Oca',
    		'nationality'=>'Venezolano',
    		'professional_branch'=>'FullStack',
    		'professional_title'=>'Web Applications Developer',
    		'professional_brief_description'=>'Quote inspire...!',
    		'job_status'=>'Full-time'
    	]);
    	*/
    	
    	factory(Jobs4Devs\User::class, 1000)->create();
    }
}
