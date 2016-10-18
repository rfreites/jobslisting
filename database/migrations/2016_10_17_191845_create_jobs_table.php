<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
    	Schema::create('jobs', function (Blueprint $table) {
    		$table->increments('id');
    		$table->integer('company_id');
    		$table->string('title');
    		$table->integer('salary');
    		$table->string('description');
    		$table->date('hire_date');
    		$table->integer('number_of_vacancies');
    		$table->timestamps();
    		$table->string('slug')->unique();
    	});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jobs');
    }
}
