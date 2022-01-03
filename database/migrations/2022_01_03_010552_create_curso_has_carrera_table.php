<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCursoHasCarreraTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('curso_has_carrera', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('postulante_correo');
            $table->unsignedBigInteger('curso_idcurso')->default(null)->nullable(true);
            $table->unsignedBigInteger('carrera_idcarrera')->default(null)->nullable(true);
        });
        Schema::table('curso_has_carrera', function (Blueprint $table) {
            $table->foreign('postulante_correo')->references('correo')->on('postulante')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('curso_idcurso')->references('idcurso')->on('curso')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('carrera_idcarrera')->references('idcarrera')->on('carrera')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('curso_has_carrera');
    }
}
