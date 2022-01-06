<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function create(){
        setcookie("__token", csrf_token()); 
        return view('login');
    }
    public function store(Request $request){
        $user = $request->user;
        $pass = $request->pass;
        if (Auth::attempt(['ci' => $user, 'password' => $pass,'active' => 1])) {
            $request->session()->regenerate();
            return redirect()->intended(route('ViewRegistro'));
        }
        return redirect()->intended(route('ViewLogin'));
    }
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect(route('ViewLogin'));
    }
    //
}
