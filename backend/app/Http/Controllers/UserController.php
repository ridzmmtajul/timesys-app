<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index(){
        return response()->json(User::all());
    }

    public function register(Request $request)
    {
        $response = (new UserService($request))->register();
        return response()->json($response);
    }

    public function login(Request $request){
        $user = User::where('email', $request->email)->get();
        return response()->json($user);
    }
}
