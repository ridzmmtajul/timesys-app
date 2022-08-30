<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
 
class UserService{
    public $name, $email, $password, $device_name;

    public function __construct($request)
    {
        $this->name = $request->name;        
        $this->email = $request->email;        
        $this->password = $request->password;        
        $this->device_name = $request->device_name;        
    }

    public function validateInput()
    {
        $validator = Validator::make(['email' => $this->email, 'password' => $this->password],[
            'name' => ['required', 'string'],
            'email' => ['required', 'email:rfc,dns', 'unique:users'],
            'password' => ['required', 'string', Password::min(8)]
        ]);

        if($validator->fails())
        {
            return ['status' => false, 'message' => $validator->messages()];
        }else{
            return ['status' => true];
        }
    }

    public function register()
    {
        $validate = $this->validateInput();

        if($validate['status'] = false){
            return $validate;
        }else{
            $user = User::create([
                'name' => $this->name, 
                'email' => $this->email, 
                'password' => Hash::make($this->password)
            ]);
            $token = $user->createToken($this->device_name)->plainTextToken;
            
            return ['status' => true, 'token' => $token, 'user' => $user];
        }
    }
}