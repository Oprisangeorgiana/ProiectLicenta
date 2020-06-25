<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'task', 'task_type', 'employee', 'deadline', 'start_date', 'start_hour', 'end_hour', 'project', 'state'
    ];

    protected $hidden = [];

    protected $with = [];


    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
    public function subtask()
    {
        return $this->hasMany(Project::class);
    }
    public function user()
    {
        return $this->hasOne(Project::class);
    }



}
