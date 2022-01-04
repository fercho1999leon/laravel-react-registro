<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class RouteController extends Controller
{
    public function Login(Request $request){
        if($request->session()->has('user') && $request->session()->has('pass')){
            return redirect('/registro');
        }
        setcookie("__token", csrf_token()); 
        return view('login');
    }
    public function AuthLogin(Request $request){
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
    }
    public function Registro(){
        return "Registro";
    }
}
