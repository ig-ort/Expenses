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
        Schema::create('Project', function (Blueprint $table) {
            $table->ulid('project_id')->primary(); // Identificador único del gasto
            $table->unsignedBigInteger('user_id'); // Usuario que creó el proyecto
            $table->string('name'); // Nombre del proyecto
            $table->text('description')->nullable(); // Descripción del proyecto
            $table->date('start_date'); // Fecha de inicio del proyecto
            $table->date('end_date')->nullable(); // Fecha de finalización del proyecto

            $table->ulid('client_id'); // Identificador del cliente asociado al proyecto
            $table->foreign('client_id')->references('client_id')->on('Client')->onDelete('cascade');
            
            $table->ulid('project_status_id'); // Identificador del estado del proyecto
            $table->foreign('project_status_id')->references('project_status_id')->on('ProjectStatus')->onDelete('restrict');

            $table->foreign('user_id')->references('id')->on('users')->onDelete('restrict'); // Foreign key constraint to ensure user_id exists in the users table            
            
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
        Schema::dropIfExists('Project');
    }
};
