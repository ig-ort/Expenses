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
        Schema::create('TimeLog', function (Blueprint $table) {
            $table->ulid('time_log_id')->primary(); // Identificador único del registro de tiempo
            $table->ulid('project_id')->nullable(); // Identificador del proyecto al que pertenece el registro de tiempo
            $table->foreign('project_id')->references('project_id')->on('Project')->onDelete('restrict');

            $table->unsignedBigInteger('user_id'); // Usuario que creó el registro de tiempo
            $table->foreign('user_id')->references('id')->on('users')->onDelete('restrict');
            
            $table->text('description')->nullable(); // Descripción del registro de tiempo

            $table->ulid('time_log_status_id'); // Identificador del estado del proyecto
            $table->foreign('time_log_status_id')->references('time_log_status_id')->on('TimeLogStatus')->onDelete('restrict');

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
        Schema::dropIfExists('TimeLog');
    }
};
