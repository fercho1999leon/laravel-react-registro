<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;

class LoginMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $usuariosLogin = new User();
        if($request->session()->has('user') && $request->session()->has('pass')){

            $passSession = session('pass');
            $userSession = session('user');
            $pass = $usuariosLogin::select('passwordLogin')->where('id',$userSession)->first();
            if($pass!=null){
                if($pass->passwordLogin==$passSession){
                    return $next($request);
                }else{
                    return redirect('/');;
                }
            }
        }
        return redirect('/');
    }
}
