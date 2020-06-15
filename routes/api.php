<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/login', 'AuthController@login');
Route::post('/register', 'AuthController@register');
Route::middleware('auth:api')->post('/logout', 'AuthController@logout');


Route::get('/employees', 'EmployeeController@getAll');
Route::get('/employees/{id}', 'EmployeeController@getOne');
Route::post('/employees', 'EmployeeController@create');
Route::patch('/employees/{id}', 'EmployeeController@update');
Route::delete('/employees/{id}', 'EmployeeController@delete');

Route::get('/departments', 'DepartmentController@getAll');
Route::get('/departments/{id}', 'DepartmentController@getOne');
Route::post('/departments', 'DepartmentController@create');
Route::patch('/departments/{id}', 'DepartmentController@update');
Route::delete('/departments/{id}', 'DepartmentController@delete');

Route::get('/locations', 'LocationController@getAll');
Route::get('/locations/{id}', 'LocationController@getOne');
Route::post('/locations', 'LocationController@create');
Route::patch('/locations/{id}', 'LocationController@update');
Route::delete('/locations/{id}', 'LocationController@delete');

Route::get('/authorisations', 'AuthorisationController@getAll');
Route::get('/authorisations/{id}', 'AuthorisationController@getOne');
Route::post('/authorisations', 'AuthorisationController@create');
Route::patch('/authorisations/{id}', 'AuthorisationController@update');
Route::delete('/authorisations/{id}', 'AuthorisationController@delete');

Route::get('/projects', 'ProjectController@getAll');
Route::get('/projects/{id}', 'ProjectController@getOne');
Route::post('/projects', 'ProjectController@create');
Route::patch('/projects/{id}', 'ProjectController@update');
Route::delete('/projects/{id}', 'ProjectController@delete');

Route::get('/tasks', 'TaskController@getAll');
Route::get('/tasks/{id}', 'TaskController@getOne');
Route::post('/tasks', 'TaskController@create');
Route::patch('/tasks/{id}', 'TaskController@update');
Route::delete('/tasks/{id}', 'TaskController@delete');


