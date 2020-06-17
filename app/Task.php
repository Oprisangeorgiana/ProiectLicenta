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
//    protected static function boot()
//    {
//        parent::boot();

//        switch (user.authorisations.id) {
//          case '1': {
//              $builder->where('employee.id', '=', user.authorisations.id);
//          }
//          case '2': {
//          verific daca task.employee.authorisation.id < user.authorisations.id si employee.id = user.authorisations.id
//          }
//          case '3': {
//              nu mai verific nimic ca le aduc pe toate si selectez tot ce e < user.authorisations.id si employee.id = user.authorisations.id
//          }
//          default:
//            break
//        }
//    }


}
