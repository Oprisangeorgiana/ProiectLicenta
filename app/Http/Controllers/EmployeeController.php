<?php

namespace App\Http\Controllers;

use App\Employee;
use Illuminate\Http\Request;





class EmployeeController extends Controller
{
    public function getAll()
    {
        return Employee::all();
    }

    public function getOne(Request $request)
    {
        return Employee::findOrFail($request->id);
    }

    public function create(Request $request)
    {
        $request->validate([
            'first_name' => 'required|max:50',
            'last_name' => 'required|max:50',

        ]);

        return Employee::create($request->all());
    }

    public function update(Request $request)
    {
        $employee = Employee::findOrFail($request->id);
        return $employee->fill($request->all())->save();
    }

    public function delete(Request $request)
    {
        return Employee::findOrFail($request->id)->delete();
    }






//    public $successStatus = 200;
//    /**
//     * login api
//     *
//     * @return \Illuminate\Http\JsonResponse
//     */
//    public function login(){
//        if(Auth::attempt(['intern_mail' => request('intern_mail'), 'password' => request('password')])){
//            $user = Auth::user();
//            $success['token'] =  $user->createToken('MyApp')-> accessToken;
//            return response()->json(['success' => $success], $this-> successStatus);
//        }
//        else{
//            return response()->json(['error'=>'Unauthorised'], 401);
//        }
//    }
//    /**
//     * Register api
//     *
//     * @return \Illuminate\Http\JsonResponse
//     */
//    public function register(Request $request)
//    {
//        $validator = Validator::make($request->all(), [
//            'name' => 'required',
//            'email' => 'required|email',
//            'password' => 'required',
//            'c_password' => 'required|same:password',
//        ]);
//        if ($validator->fails()) {
//            return response()->json(['error'=>$validator->errors()], 401);
//        }
//        $input = $request->all();
//        $input['password'] = bcrypt($input['password']);
//        $user = Employee::create($input);
//        $success['token'] =  $user->createToken('MyApp')-> accessToken;
//        $success['name'] =  $user->name;
//        return response()->json(['success'=>$success], $this-> successStatus);
//    }
//    /**
//     * details api
//     *
//     * @return \Illuminate\Http\JsonResponse
//     */
//    public function details()
//    {
//        $user = Auth::user();
//        return response()->json(['success' => $user], $this-> successStatus);
//    }
}
