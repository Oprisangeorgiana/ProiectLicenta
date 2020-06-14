<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Authorisation extends Model
{
    protected $fillable = [
        'role'
    ];

    protected $hidden = [];
    public function employees()
    {
        return $this->hasMany(Employee::class);
    }

}
