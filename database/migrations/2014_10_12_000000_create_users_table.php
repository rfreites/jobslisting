<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('username');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('password');
            $table->integer('active');
            $table->date('birthdate');
            $table->string('country');
            $table->string('city');
            $table->string('address');
            $table->string('nationality');
            $table->string('professional_branch');
            $table->string('professional_title');
            $table->string('professional_brief_description');
            $table->string('professional_website');
            $table->string('job_status');
            $table->string('flag');
            $table->rememberToken();
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
        Schema::drop('users');
    }
}
