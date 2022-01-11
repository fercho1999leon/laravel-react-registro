<?php

namespace App\Http\Controllers;

use App\Models\Carrera;
use App\Models\Curso;
use App\Models\User;
use App\Models\CursoHasCarrera;
use App\Models\Postulante;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Hash;

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
                $arrayExport[]=array('id'=>$value['id'],'name'=>$value['name'],'rol'=>$value['rol']);
            }
        }
        session(['__rol' => $rol['rol']]);
        session(['__confNav' => md5(json_encode($arrayExport))]);
        return json_encode(array('configNav' =>$arrayExport,'config' => json_decode($jsonString)));
    }
    public function action(Request $request,$query){
        if($query==='insert'){
            return $this->insertRegistro($request);
        }else if($query==='shearch'){
            return $this->shearchRegistro($request);
        }else if($query==='updata'){
            return $this->upDataRegistro($request);
        }else if($query==='filter'){
            return $this->filterRegistro($request);
        }else if($query==='delect'){
            return $this->deleteRegistro($request);
        }else if($query==='download'){
            return $this->downloadRegister($request);
        }else if($query==='addTyC'){
            return $this->addTyC($request);
        }else if($query==='addNewUser'){
            return $this->addNewUser($request);
        }
    }
    protected function insertRegistro($request){
        try { 
            $correo = $request->correo;
                //Cuando el correo esta vacio
                $tempCorreo = $correo==''?('randon'.(Postulante::all()->count()+1).'@hotmail.com'):($correo);
                //--------------------------
                $postulante = new Postulante();
                $postulante->correo = $tempCorreo;
                $postulante->nombre = $request->nombre.' '.$request->apellido;
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
        } catch(QueryException $ex){ 
            return json_encode(array('code'=>1));
        }
    }
    protected function shearchRegistro($request){
        $parametro = $request->parametro;
        try{
            if($parametro==0){
                $result = Postulante::join("curso_has_carrera","curso_has_carrera.postulante_correo", "=", "postulante.correo")->select("postulante.updated_at","postulante.nombre","postulante.correo","postulante.numero",
                "postulante.observacion","postulante.estado_idestado","postulante.ciudad_idciudad","curso_has_carrera.curso_idcurso",
                "curso_has_carrera.carrera_idcarrera")->orderBy('postulante.updated_at')->get();
                return json_encode($result);
            }else{
                $result = Postulante::join("curso_has_carrera","curso_has_carrera.postulante_correo", "=", "postulante.correo")->select("postulante.updated_at","postulante.nombre","postulante.correo","postulante.numero",
                "postulante.observacion","postulante.estado_idestado","postulante.ciudad_idciudad","curso_has_carrera.curso_idcurso",
                "curso_has_carrera.carrera_idcarrera")->where('postulante.nombre','LIKE','%'.$parametro.'%')->orderBy('postulante.updated_at')->get();
                return json_encode($result);
            }

        }catch(QueryException $ex){
            return $ex;
        }
    }
    protected function upDataRegistro($request){
        try{
                Postulante::where('correo',$request->correo)->update([
                    'correo'=>$request->correo,
                    'nombre'=>$request->nombre,
                    'numero'=>$request->numeroContacto,
                    'observacion'=>$request->observacion,
                    'estado_idestado'=>$request->estado,
                    'ciudad_idciudad'=>$request->ciudad
                ]);
                if($request->typeInteres==1){
                    if($request->interes!=0){
                        CursoHasCarrera::where('postulante_correo',$request->correo)->update([
                            'carrera_idcarrera'=>$request->interes
                        ]);
                    }else{
                        CursoHasCarrera::where('postulante_correo',$request->correo)->update([
                            'carrera_idcarrera'=>null
                        ]);
                    }
                }else if($request->typeInteres==2){
                    if($request->interes!=0){
                        CursoHasCarrera::where('postulante_correo',$request->correo)->update([
                            'curso_idcurso'=>$request->interes
                        ]);
                    }else{
                        CursoHasCarrera::where('postulante_correo',$request->correo)->update([
                            'curso_idcurso'=>null
                        ]);
                    }
                }
            return json_encode(array('status'=>0));
        }catch(QueryException $ex){
            return json_encode(array('status'=>1));
        }
    }
    protected function filterRegistro($request){
        $result = Postulante::join("curso_has_carrera","curso_has_carrera.postulante_correo", "=", "postulante.correo")->select("postulante.updated_at","postulante.nombre","postulante.correo","postulante.numero",
                "postulante.observacion","postulante.estado_idestado","postulante.ciudad_idciudad","curso_has_carrera.curso_idcurso",
                "curso_has_carrera.carrera_idcarrera")->where('postulante.estado_idestado',$request->parametro)->orderBy('postulante.correo')->get();
        return json_encode($result);
    }
    protected function deleteRegistro($request){
        foreach($request->parametro as $value){
            Postulante::where('correo',$value)->delete();
        }
        return json_encode(array('status'=>true));
    }
    protected function downloadRegister($request){
        if($request->typeInteres==1){
            $result = $request->correoValido==0?Postulante::join("curso_has_carrera","curso_has_carrera.postulante_correo", "=", "postulante.correo")->select("postulante.nombre","postulante.correo","postulante.numero")
            ->where('curso_has_carrera.carrera_idcarrera',$request->interes)
            ->get()
            :
            Postulante::join("curso_has_carrera","curso_has_carrera.postulante_correo", "=", "postulante.correo")->select("postulante.nombre","postulante.correo","postulante.numero")
            ->where([['curso_has_carrera.carrera_idcarrera','=',$request->interes],['postulante.correo','NOT LIKE','%randon%']])
            ->get();
            return json_encode($result);
        }else if($request->typeInteres==2){
            $result = $request->correoValido==0?Postulante::join("curso_has_carrera","curso_has_carrera.postulante_correo", "=", "postulante.correo")->select("postulante.nombre","postulante.correo","postulante.numero")
            ->where('curso_has_carrera.curso_idcurso',$request->interes)
            ->get()
            :
            Postulante::join("curso_has_carrera","curso_has_carrera.postulante_correo", "=", "postulante.correo")->select("postulante.nombre","postulante.correo","postulante.numero")
            ->where([['curso_has_carrera.curso_idcurso','=',$request->interes],['postulante.correo','NOT LIKE','%randon%']])
            ->get();
            return json_encode($result);
        }
    }
    protected function addTyC($request){
        $urlJson = strtoupper(substr(PHP_OS, 0, 3))==='WIN'?dirname(__DIR__).'\ConfigJson\config.json':dirname(__DIR__).'/ConfigJson/config.json';
        $jsonString = file_get_contents($urlJson);
        $data = json_decode($jsonString, true);
        if($request->typeInteres==1){
            $temp = sizeof($data['listInteresC'])+1;
            array_push($data['listInteresC'],array('id'=>$temp,'name'=>$request->name));
            $carrera = new Carrera();
            $carrera->idcarrera = $temp;
            $carrera->nombre = $request->name;
            $carrera->save();
        }else if($request->typeInteres==2){
            $temp = sizeof($data['listInteresT'])+1;
            array_push($data['listInteresT'],array('id'=>$temp,'name'=>$request->name));
            $curso = new Curso();
            $curso->idcurso = $temp;
            $curso->nombre = $request->name;
            $curso->save();
        }
        $newJsonString = json_encode($data);
        file_put_contents($urlJson, $newJsonString);
        return json_encode($data);
    }
    protected function addNewUser($request){
        $user = new User();
        $user->ci = $request->cedula;
        $user->name = $request->nombre;
        $user->email = $request->correo;
        $user->active = 1;
        $user->rol = $request->rol;
        $user->password = Hash::make($request->contrasena);
        $user->save();
        return json_encode(array('status'=>true));
    }
}
