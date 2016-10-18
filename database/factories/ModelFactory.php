<?php

use function Faker\randomElement;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(Jobs4Devs\User::class, function (Faker\Generator $faker) {
    static $password;
    
    return [
    	'username' => $faker->userName(),
        'first_name' => $faker->name,
    	'last_name' => $faker->lastName,
        'email' => $faker->unique()->safeEmail,
        'password' => bcrypt('secret'),
    	'active' => 1,
    	'birthdate' => $faker->dateTimeBetween('-45 years', '-18 years'),
    	'country' => $faker->country(),
    	'city' => $faker->city(),
    	'address' => $faker->address(),
    	'nationality' => 'my nationality',
    	'professional_branch' => $faker->randomElement($array = array (
    																'Front-End',
    																'Back-End',
    																'FullStack',
    																'Marketing & Digital Strategy',
    																'Servers Administration',
    																'Databases',
    																'Google Stack',
    																'Apple Stack', 
    																'Audio Visual Production',
    																'IU/UX Desing'
    																)),
    	'professional_title' => $faker->jobTitle(),
    	'professional_brief_description' => $faker->bs(),
    	'professional_website' => $faker->domainName(),
    	'job_status' => $faker->randomElement($array = array('Full-time', 'Part-time', 'Freelance', 'Estoy trabajando actualmente', 'No busco trabajo, pero estoy dispuesto a escuchar ofertas.','No estoy interesado en escuchar ofertas.')),
        'remember_token' => str_random(10),
    ];
});

$factory->define(Jobs4Devs\Company::class, function (Faker\Generator $faker)
{
	static $password;
	
	return [
		'name' => $faker->domainWord(),
		'description' => $faker->catchPhrase(),
		'email' => $faker->companyEmail(),
		'password' => $password ?: $password = bcrypt('secret'),
		'active' => 1,
		'country' => $faker->country(),
		'city' => $faker->city(),
		'address' => $faker->address(),
		'remember_token' => str_random(10),
	];
});

$factory->define(Jobs4Devs\Job::class, function (Faker\Generator $faker)
{
	$jobTitle = $faker->jobTitle();
	return [
			'title' => $jobTitle,
			'salary' => random_int($min = 900, $max = 2500),
			'description' => $faker->sentence(random_int($min = 12, $max = 20), $variableNbWords = true),
			'hire_date' => $faker->dateTime(),
			'number_of_vacancies' => random_int($min = 1, $max = 10),
			'slug'  => (string)(str_replace(" ", "-", $jobTitle).'-'.$faker->numberBetween($min = 100000, $max = 999999))
	];
});
		
		
		
		
		
		
		
		
		