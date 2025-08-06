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
        Schema::create('Debtor', function (Blueprint $table) {
            $table->ulid('debtor_id')->primary(); // Identificador único del deudor
            $table->string('name', 255); // Nombre del deudor
            $table->string('email', 255)->nullable(); // Correo electrónico del deudor
            $table->string('phone', 20)->nullable(); // Teléfono del deudor
            $table->text('notes')->nullable(); // Notas adicionales
            $table->timestamps(); // created_at y updated_at
            $table->softDeletes(); // deleted_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Debtor');
    }
};
