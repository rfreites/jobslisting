<?php

namespace Jobs4Devs;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
	
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
			'user_id',
			'title',
			//'salary',
			//'description',
			//'date_of_hire',
			//'number_of_vacancies'
	];
	
	public function user()
	{
		return $this->belongsTo(User::class);
	}
	
}
