<?php

namespace App\Http\Controllers;

use App\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function getAll()
    {
        return Location::all();
    }

    public function getOne(Request $request)
    {
        return Location::findOrFail($request->id);
    }

    public function create(Request $request)
    {
        return Location::create($request->all());
    }

    public function update(Request $request)
    {
        $location = Location::findOrFail($request->id);
        return $location->fill($request->all())->save();
    }

    public function delete(Request $request)
    {
        return Location::findOrFail($request->id)->delete();
    }
}
