<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'task', 'task_type','deadline','project'
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


}
