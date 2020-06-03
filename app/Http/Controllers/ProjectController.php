<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function getAll()
    {
        return Project::all();
    }

    public function getOne(Request $request)
    {
        return Project::findOrFail($request->id);
    }

    public function create(Request $request)
    {
        return Project::create($request->all());
    }

    public function update(Request $request)
    {
        $project = Project::findOrFail($request->id);
        return $project->fill($request->all());
    }

    public function delete(Request $request)
    {
        return Project::findOrFail($request->id)->delete();
    }
}
