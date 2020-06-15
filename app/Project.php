<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'name', 'deadline', 'department_id'
    ];

    protected $hidden = [];

    protected $with = ['department'];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
    public function task()
    {
        return $this->hasMany(Task::class);
    }
}
