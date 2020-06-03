<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->increments('id');
            $table->string('CNP',13)->unique();
            $table->string('first_name');
            $table->string('last_name');
            $table->date('birthday');
            $table->string('sex');
            $table->text('address');
            $table->string('mail')->unique();
            $table->text('phone_number');
            $table->date('hire_date');
            $table->integer('salary');
            $table->string('intern_mail')->unique();
            $table->timestamps();
            $table->integer('department_id');
            $table->integer('authorisation_id');
            $table->foreign('department_id')->references('id')->on('departments');
            $table->foreign('authorisation_id')->references('id')->on('authorisations');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employees');
    }
}
