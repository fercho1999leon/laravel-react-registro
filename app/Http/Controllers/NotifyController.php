<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NotificacionAgenda;

class NotifyController extends Controller
{
    public function store(Request $request){
        $result = NotificacionAgenda::join('postulante','postulante.correo','=','notificacion_agenda.postulante_correo')
            ->select('postulante.correo','postulante.nombre','postulante.numero','postulante.observacion','notificacion_agenda.time_data')
            ->where('notificacion_agenda.time_data','LIKE','%'.$request->year.'-'.$request->month.'%')->get();
        return json_encode($result);
    }
}
