<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostulanteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('postulante', function (Blueprint $table) {
            $table->string('correo');
            $table->string('nombre')->default(null)->nullable(true);
            $table->string('apellido')->default(null)->nullable(true);
            $table->string('numero')->default(null)->nullable(true);
            $table->text('observacion')->default(null)->nullable(true);
            $table->unsignedBigInteger('estado_idestado');
            $table->unsignedBigInteger('ciudad_idciudad');
            $table->timestamps();
            $table->primary('correo');
        });
        Schema::table('postulante', function (Blueprint $table) {
            $table->foreign('estado_idestado')->references('idestado')->on('estado')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('ciudad_idciudad')->references('idciudad')->on('ciudad')->onUpdate('cascade')->onDelete('cascade');
        });
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('postulante');
    }
}
