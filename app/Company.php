<?php

namespace Jobs4Devs;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
	use Notifiable;
	
	protected $fillable = [
			'name',
			'description',
			'email',
			'password',
			'active',
			'country',
			'city',
			'address',
	];
	
	protected $hidden = [
			'password', 'remember_token',
	];
	
	public function jobs(){
		
		return $this->hasMany(Job::class, 'company_id');	
	}
}
