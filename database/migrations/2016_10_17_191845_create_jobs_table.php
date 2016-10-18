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
    		$table->integer('user_id');
    		$table->string('title', 40);
    		$table->float('salary');
    		$table->string('description', 300);
    		$table->date('date_of_hire');
    		$table->integer('number_of_vacancies');
    		$table->timestamps();
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
