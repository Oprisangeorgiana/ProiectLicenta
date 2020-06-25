<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'name', 'deadline'
    ];

    protected $hidden = [];


    public function task()
    {
        return $this->hasMany(Task::class);
    }
}
