<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CursoHasCarrera extends Model
{
    use HasFactory;
    protected $table = 'curso_has_carrera';
    public $timestamps = false;
}
