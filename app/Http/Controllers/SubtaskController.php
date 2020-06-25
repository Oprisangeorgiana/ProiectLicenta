<?php

namespace App\Http\Controllers;

use App\Subtask;
use Illuminate\Http\Request;

class SubtaskController extends Controller
{
    public function getAll()
    {
        return Subtask::all();
    }

    public function getOne(Request $request)
    {
        return Subtask::findOrFail($request->id);
    }

    public function create(Request $request)
    {
        return Subtask::create($request->all());
    }

    public function update(Request $request)
    {
        $project = Subtask::findOrFail($request->id);
        return $project->fill($request->all())->save();
    }

    public function delete(Request $request)
    {
        return Subtask::findOrFail($request->id)->delete();
    }
}