<?php

namespace App\Http\Controllers;

use App\Authorisation;
use Illuminate\Http\Request;

class AuthorisationController extends Controller
{
    public function getAll()
    {
        return Authorisation::all();
    }

    public function getOne(Request $request)
    {
        return Authorisation::findOrFail($request->id);
    }

    public function create(Request $request)
    {
        return Authorisation::create($request->all());
    }

    public function update(Request $request)
    {
        $authorisation = Authorisation::findOrFail($request->id);
        return $authorisation->fill($request->all());
    }

    public function delete(Request $request)
    {
        return Authorisation::findOrFail($request->id)->delete();
    }
}
