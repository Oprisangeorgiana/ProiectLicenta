<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subtask extends Model
{
    protected $fillable = [
        'description', 'end_subtask_date', 'start_subtask_date', 'start_subtask_hour', 'end_subtask_hour', 'employee_id','task_id','subtask_state'
    ];

    protected $hidden = [];


    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
