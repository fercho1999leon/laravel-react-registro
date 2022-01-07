<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleRegisterMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next,)
    {
        if(md5(json_encode($request->configSate))===$request->session()->get('__confNav')){  
            if($this->findJson($request->configSate,$request->id)<=$request->session()->get('__rol')){
                return $next($request);
            }
        }
        return redirect(route('logout'));
    }
    protected function findJson($json,$el){
        foreach($json as $value){
            if($value['id']==$el){
                return $value['rol'];
            }
        }
        return 1000;
    }
}
