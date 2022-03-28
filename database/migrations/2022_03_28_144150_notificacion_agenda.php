<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class NotificacionAgenda extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notificacion_agenda',function (Blueprint $table){
            $table->id()->autoIncrement()->nullable(false);
            $table->string('postulante_correo')->nullable(false);
            $table->dateTime('time_data')->nullable(false);
        });
        Schema::table('notificacion_agenda',function (Blueprint $table){
            $table->foreign('postulante_correo')->references('correo')->on('postulante')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notificacion_agenda');
    }
}
