<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('task');
            $table->string('task_type');
            $table->integer('employee');
            $table->foreign('employee')->references('id')->on('employees')->onDelete('cascade');
            $table->date('deadline');
            $table->date('start_date');
            $table->integer('start_hour');
            $table->integer('end_hour');
            $table->integer('project');
            $table->foreign('project')->references('id')->on('projects')->onDelete('cascade');


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
