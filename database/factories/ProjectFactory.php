<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Department;
use App\Model;
use Faker\Generator as Faker;

$factory->define(\App\Project::class, function (Faker $faker) {
    return [
        'name'=>$faker->userName,
        'deadline'=>$faker->date(),
        'department_id'=>Department::first(),
    ];
});
