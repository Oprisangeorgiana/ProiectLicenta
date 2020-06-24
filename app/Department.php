<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    protected $fillable = [
        'department_name', 'location_id'
    ];

    protected $hidden = [];

//    protected $with = ['locations'];

    public function locations()
    {
        return $this->belongsTo(Location::class);
    }
    public function employees()
    {
        return $this->hasMany(Employee::class);
    }
    public function project()
    {
        return $this->hasMany(Project::class);
    }


}
