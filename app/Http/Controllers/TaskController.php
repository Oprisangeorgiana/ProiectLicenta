<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function getAll()
    {
        return Task::all();
    }

    public function getOne(Request $request)
    {
        return Task::findOrFail($request->id);
    }

    public function create(Request $request)
    {
        return Task::create($request->all());
    }

    public function update(Request $request)
    {
        $task = Task::findOrFail($request->id);
        return $task->fill($request->all())->save() ;
    }

    public function delete(Request $request)
    {
        return Task::findOrFail($request->id)->delete();
    }
}
