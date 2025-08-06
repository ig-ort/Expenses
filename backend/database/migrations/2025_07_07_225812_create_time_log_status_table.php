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
        Schema::create('TimeLogStatus', function (Blueprint $table) {
            $table->ulid('time_log_status_id')->primary(); // Identificador único del estado del registro de tiempo
            $table->string('name'); // Nombre del estado del registro de tiempo
            $table->text('description')->nullable(); // Descripción del estado del registro de tiempo
            $table->boolean('is_active')->default(true); // Indica si el estado está activo
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
        Schema::dropIfExists('TimeLogStatus');
    }
};
