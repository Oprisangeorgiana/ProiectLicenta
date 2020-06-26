<?php

namespace App\Http\Controllers;

use App\Employee;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $http = new \GuzzleHttp\Client;

        try {
            $response = $http->post(config('services.passport.login_endpoint'), [
                'form_params' => [
                    'grant_type' => 'password',
                    'client_id' => config('services.passport.client_id'),
                    'client_secret' => config('services.passport.client_secret'),
                    'username' => $request->username,
                    'password' => $request->password,
                ]
            ]);
            return $response->getBody();
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            if ($e->getCode() === 400) {
                return response()->json('Invalid Request. Please enter a username or a password.', $e->getCode());
            } else if ($e->getCode() === 401) {
                return response()->json('Your credentials are incorrect. Please try again', $e->getCode());
            }

            return response()->json('Something went wrong on the server.', $e->getCode());
        }
    }

    public function register(Request $request)
    {

        $request->validate([
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',

            'CNP' => 'required',
            'first_name' => 'required',
            'last_name' => 'required',
            'birthday' => 'required',
            'phone_number' => 'required',
            'hire_date' => 'required',
            'authorisation' => 'required',
            'department' => 'required',
            'sex' => 'required',
        ]);


        $user = null;
        DB::transaction(function () use (&$user, $request) {
            $employee = Employee::create([
                'CNP' => $request->CNP,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'birthday' => $request->birthday,
                'phone_number' => $request->phone_number,
                'hire_date' => $request->hire_date,
                'authorisation_id' => $request->authorisation,
                'department_id' => $request->department,
                'sex' => $request->sex,
                'address' => "WTF",
                'mail' => $request->personal_email
            ]);

            $user = User::create([
                'intern_email' => $request->email,
                'password' => Hash::make($request->password),
                'employee_id' => $employee->id
            ]);
        });

        return $user;
    }

    public function update(Request $request)
    {
        $request->validate([
            'intern_email' => 'required|string|email|max:255',
            'password' => 'sometimes|string|min:6',
        ]);

        $user = auth()->guard('api')->user();

        $input = $request->only(['name', 'intern_email']);
        if ($request->password) {
            $input['password'] = Hash::make($request->password);
        }
        $user->update($input);
        return $user;
    }

    public function logout()
    {
        auth()->user()->tokens->each(function ($token, $key) {
            $token->delete();
        });

        return response()->json('Logged out successfully', 200);
    }
}