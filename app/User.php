<?php

namespace Jobs4Geeks;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 
    	'last_name',
    	'email',
    	'password',
    	'active',
    	'birthdate',
    	'country',
    	'city',
    	'address',
    	'nationality',
    	'professional_branch',
    	'professional_title',
    	'professional_brief_description',
    	'job_status'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
    
}
