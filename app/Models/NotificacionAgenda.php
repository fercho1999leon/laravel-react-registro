<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotificacionAgenda extends Model
{
    use HasFactory;
    protected $table = 'notificacion_agenda';
    public $timestamps = false;
    public function postulante()
    {
        return $this->belongsTo(Postulante::class);
    }
}
