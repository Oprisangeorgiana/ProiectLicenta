<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class EmployeeAuthorisationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employee_authorisations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('employee_id');
            $table->integer('authorisation_id');
            $table->foreign('employee_id')->references('id')->on('employees');
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
        //
    }
}
