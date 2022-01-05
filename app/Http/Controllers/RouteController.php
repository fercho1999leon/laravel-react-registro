<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RouteController extends Controller
{
    public function Login(Request $request){
        /*if($request->session()->has('user') && $request->session()->has('pass')){
            return redirect('/registro');
        }*/
        setcookie("__token", csrf_token()); 
        return view('login');
    }
    /*public function AuthLogin(Request $request){
        $request->pass=(md5($request->pass));
        return $this->Auth($request);
    }
    private function Auth($request){
        $usuariosLogin = new User();
        $resulJson = array();
        $pass = $usuariosLogin::select('passwordLogin')->where('id',$request->user)->first();
        if($pass!=null){
            if($pass->passwordLogin==$request->pass){
                $resulJson['state']=true;
                session(['user' => $request->user]);
                session(['pass' => $pass->passwordLogin]);
                return $resulJson;
            }else{
                $resulJson['state']=false;
                $request->session()->forget(['user', 'pass']);
                return $resulJson;
            }
        }
        else{
            $resulJson['state']=false;
            $request->session()->forget(['user', 'pass']);
            return $resulJson;
        }
    }*/
    public function AuthLogin(Request $request){
        $user = $request->user;
        $pass = $request->pass;
        $resul = Auth::attempt(['email' => $user, 'password' => $pass]);
        if (Auth::attempt(['email' => $user, 'password' => $pass])) {
            // Authentication was successful...
            $request->session()->regenerate();
            return redirect()->intended('/registro');
        }
        return $resul?'true':'false';
        //$request->pass=(md5($request->pass));
    }
    public function Registro(){
        return view('registro');
    }
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
