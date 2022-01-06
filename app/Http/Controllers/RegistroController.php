<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

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
        $urlJsonConfig = dirname(__DIR__).'\ConfigJson\configNav.json';
        $jsonString = file_get_contents($urlJsonConfig);
        $array = json_decode($jsonString, true);
        foreach($array['btnDate'] as $value ){
            if($value['rol']===$rol['rol']){
                $arrayExport[]=array('id'=>$value['id'],'name'=>$value['name']);
            }
        }
        session('__confNav',md5(json_encode($arrayExport)));
        return json_encode($arrayExport);
    }
}
