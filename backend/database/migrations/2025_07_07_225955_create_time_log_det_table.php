<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('TimeLogDet', function (Blueprint $table) {
            $table->ulid('time_log_det_id')->primary(); // Identificador único del detalle del registro de tiempo
            $table->ulid('time_log_id'); // Identificador del registro de tiempo al que pertenece el detalle
            $table->foreign('time_log_id')->references('time_log_id')->on('TimeLog')->onDelete('restrict');

            $table->unsignedBigInteger('user_id'); // Usuario que creó el detalle
            $table->foreign('user_id')->references('id')->on('users')->onDelete('restrict');

            $table->string('description')->nullable(); // Descripción del detalle del registro de tiempo
            $table->dateTime('start_time'); // Hora de inicio del registro de tiempo
            $table->dateTime('end_time')->nullable(); // Hora de finalización del registro de tiempo

            $table->unsignedInteger('duration')->nullable(); // Duración del registro de tiempo en segundos

            $table->timestamp('created_at')->useCurrent(); // Marca de tiempo de creación
            $table->timestamp('updated_at')->useCurrent()->nullable(); // Marca de tiempo de actualización
            $table->timestamp('deleted_at')->nullable(); // Marca de tiempo para el borrado lógico
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('TimeLogDet');
    }
};
