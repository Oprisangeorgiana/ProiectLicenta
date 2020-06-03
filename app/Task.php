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


}
