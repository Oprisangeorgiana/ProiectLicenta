<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Employee;
use App\Project;
use App\Task;
use Faker\Generator as Faker;

$factory->define(Task::class, function (Faker $faker) {
    return [
        'task'=>$faker->text($maxNbChars = 100),
        'task_type'=>'task',
        'deadline'=>$faker->date(),
        'start_date'=>$faker->date(),
        'start_hour'=>$faker->time(),
        'end_hour'=>$faker->time('H:i'),
        'employee'=>factory(Employee::class)->create()->id,
        'project'=>factory(Project::class)->create()->id,

    ];
});
