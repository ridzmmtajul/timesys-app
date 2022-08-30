<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $response = (new UserService($request))->register();
        return response()->json($response);
    }

    public function login(Request $request){

    }
}
