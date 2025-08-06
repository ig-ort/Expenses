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
        Schema::create('Client', function (Blueprint $table) {
            $table->ulid('client_id')->primary(); // Identificador único del cliente
            $table->unsignedBigInteger('user_id'); // Usuario que creó el cliente
            $table->string('name'); // Nombre del cliente
            
            // Foreign key constraint to ensure user_id exists in the users table
            $table->foreign('user_id')->references('id')->on('users')->onDelete('restrict');

            $table->ulid('client_status_id'); // Identificador del estado del cliente
            $table->foreign('client_status_id')->references('client_status_id')->on('ClientStatus')->onDelete('restrict');
            
            $table->timestamp('created_at')->useCurrent(); // Marca de tiempo de creación
            $table->timestamp('updated_at')->useCurrent()->nullable(); // Marca de tiempo de actualización
            $table->timestamp('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Client');
    }
};
