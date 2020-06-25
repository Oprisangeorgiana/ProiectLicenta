<?php

namespace App\Http\Controllers;

use App\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function getAll()
    {
        return Department::all();
    }

    public function getOne(Request $request)
    {
        return Department::findOrFail($request->id);
    }

    public function create(Request $request)
    {
        return Department::create($request->all());
    }

    public function update(Request $request)
    {
        $department= Department::findOrFail($request->id);
        return $department->fill($request->all())->save();
    }

    public function delete(Request $request)
    {
        return Department::findOrFail($request->id)->delete();
    }
}
