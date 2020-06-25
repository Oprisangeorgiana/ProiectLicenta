<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class Employee extends Model
{

    use HasApiTokens, Notifiable;

    protected $fillable = [
        'CNP', 'first_name', 'last_name', 'birthday', 'sex', 'address',  'phone_number',
        'hire_date', 'mail', 'department_id', 'authorisation_id', 'task_id'
    ];




    protected $with = ['authorisations', 'department'];

    public function authorisations()
    {
        return $this->belongsTo(Authorisation::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
    public function task()
    {
        return $this->hasMany(Task::class);
    }
    public function user()
    {
        return $this->hasOne(User::class);
    }




}
