<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fillable = [
        'location'
    ];

//    public function departments()
//    {
//        return $this->hasMany(Department::class);
//    }

}
