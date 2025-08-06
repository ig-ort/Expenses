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
        Schema::create('ClientProjectNote', function (Blueprint $table) {
            $table->ulid('client_project_note_id')->primary(); // Identificador único de la nota del proyecto
            $table->ulid('project_id')->nullable(); // Identificador del proyecto al que pertenece la nota
            $table->foreign('project_id')->references('project_id')->on('Project')->onDelete('restrict');

            $table->ulid('client_id')->nullable(); // Identificador del cliente al que pertenece la nota
            $table->foreign('client_id')->references('client_id')->on('Client')->onDelete('restrict');

            $table->unsignedBigInteger('user_id'); // Usuario que creó la nota
            $table->foreign('user_id')->references('id')->on('users')->onDelete('restrict');

            $table->text('content'); // Contenido de la nota
            
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
        Schema::dropIfExists('ClientProjectNote');
    }
};
