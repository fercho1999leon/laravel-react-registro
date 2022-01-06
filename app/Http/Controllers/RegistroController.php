<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\CursoHasCarrera;
use App\Models\Postulante;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class RegistroController extends Controller
{
    public function create(){
        setcookie("__token", csrf_token()); 
        return view('registro');
    }
    public function store(){
        $arrayExport = array();
        $ci = Auth::user()->getAuthIdentifier();
        $rol = User::select('rol')->where('id',$ci)->first();
        $urlJsonConfigNav = dirname(__DIR__).'\ConfigJson\configNav.json';
        $urlJsonConfig = dirname(__DIR__).'\ConfigJson\config.json';
        $jsonStringNav = file_get_contents($urlJsonConfigNav);
        $jsonString = file_get_contents($urlJsonConfig);
        $array = json_decode($jsonStringNav, true);
        foreach($array['btnDate'] as $value ){
            if($value['rol']<=$rol['rol']){
                $arrayExport[]=array('id'=>$value['id'],'name'=>$value['name']);
            }
        }
        session(['__rol' => $rol['rol']]);
        session(['__confNav' => md5(json_encode($arrayExport))]);
        return json_encode(array('configNav' =>$arrayExport,'config' => json_decode($jsonString)));
    }
    public function action(Request $request,$query){
        if(md5(json_encode($request->configSate))===$request->session()->get('__confNav')){  
            try { 
                /**Nota en un midlleware se puese confirmar el rol y la no manipulacion del json
                 * $this->findJson($request->configSate,1) en ves de 1 puede recivir el id el nav
                 * para comprobar si esta en el json y que esa menor o igual que el rol
                 */
                if($query=='insert' && ($this->findJson($request->configSate,1)<=$request->session()->get('__rol'))){
                    $correo = $request->correo;
                    /*Cuando el correo esta vacio*/
                    $tempCorreo = $correo==''?('randon'.(Postulante::all()->count()+1).'@hotmail.com'):($correo);
                    /*****************************/
                    $postulante = new Postulante();
                    $postulante->correo = $tempCorreo;
                    $postulante->nombre = $request->nombre;
                    $postulante->apellido = $request->apellido;
                    $postulante->numero = $request->numeroContacto;
                    $postulante->observacion = $request->observacion;
                    $postulante->estado_idestado = $request->estado;
                    $postulante->ciudad_idciudad = $request->ciudad;
                    $cursoHasCarrera = new CursoHasCarrera();
                    if($request->typeInteres==1){
                        if($request->interes==0){
                            $cursoHasCarrera->postulante_correo = $tempCorreo;
                        }else{
                            $cursoHasCarrera->postulante_correo = $tempCorreo;
                            $cursoHasCarrera->carrera_idcarrera = $request->interes;
                        }
                    }else if($request->typeInteres==2){
                        if($request->interes==0){
                            $cursoHasCarrera->postulante_correo = $tempCorreo;
                        }else{
                            $cursoHasCarrera->postulante_correo = $tempCorreo;
                            $cursoHasCarrera->curso_idcurso = $request->interes;
                        }
                    }
                    $postulante->save();
                    $cursoHasCarrera->save();
                    return json_encode(array('code'=>0));
                }
            } catch(QueryException $ex){ 
                return json_encode(array('code'=>1));
            }
        }
    }
    protected function findJson($json,$el){
        foreach($json as $value){
            if($value['id']==$el){
                return $value['id'];
            }
        }
        return null;
    }
}