<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Department;
use App\Employee;
use Faker\Generator as Faker;

$factory->define(Employee::class, function (Faker $faker) {
    return [
        'CNP'=>$faker->lexify(str_repeat('?', 13)),
        'first_name'=>$faker->firstName(),
        'last_name'=> $faker->lastName,
        'birthday'=>$faker->date(),
        'sex'=>'M',
        'address'=>$faker->address,
        'phone_number'=>$faker->phoneNumber,
        'hire_date'=>$faker->date(),
        'mail'=>$faker->safeEmail,
        'department_id'=>factory(Department::class)->create()->id,




    ];
});
