<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Postulante extends Model
{
    use HasFactory;
    protected $table = 'postulante';
    public function cursohascarrera()
    {
        return $this->belongsTo(CursoHasCarrera::class);
    }
}
