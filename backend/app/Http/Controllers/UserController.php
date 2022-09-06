<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(){
        return response()->json(User::all());
    }

    public function register(Request $request)
    {
        // $response = (new UserService($request))->register();
        // return response()->json($response);
        try{
            $user = new User();
            $user->admin_secret_key = $request->admin_secret_key;
            $user->employee_id = 1;
            $user->username = $request->username;
            $user->password = Hash::make($request->password);
            $user->save();
    
            return response()->json(['message' => 'Successfully saved.']);
        }catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    public function login(Request $request){
        $user = User::where('email', $request->email)->get();
        return response()->json($user);
    }
}
