<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Department;
use App\Location;
use Faker\Generator as Faker;

$factory->define(Department::class, function (Faker $faker) {
    return [
        'department_name'=>$faker->company,
        'location_id'=>factory(Location::class)->create()->id,

    ];
});
