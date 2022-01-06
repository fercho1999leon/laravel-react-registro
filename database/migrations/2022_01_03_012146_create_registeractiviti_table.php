<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegisteractivitiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('registeractiviti', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->unsignedBigInteger('activiti_idactiviti');
            $table->string('users_ci');
            $table->string('postulante_correo');
            $table->timestamps();
        });
        Schema::table('registeractiviti', function (Blueprint $table) {
            $table->foreign('activiti_idactiviti')->references('idactiviti')->on('activiti');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('registeractiviti');
    }
}
