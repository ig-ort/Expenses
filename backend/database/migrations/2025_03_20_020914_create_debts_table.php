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
        Schema::create('Debt', function (Blueprint $table) {

            $table->ulid('debt_id')->primary(); // Identificador único de la deuda
            $table->ulid('debtor_id'); // Deudor asociado
            $table->decimal('total_amount', 15, 2); // Monto total de la deuda
            $table->decimal('total_paid', 15, 2)->default(0); // Monto total pagado
            $table->text('description')->nullable(); // Descripción de la deuda
            $table->date('due_date')->nullable(); // Fecha de vencimiento de la deuda
            $table->boolean('is_installment')->default(false); // Indica si la deuda se divide en cuotas
            $table->unsignedTinyInteger('installments_count')->nullable(); // Número de cuotas
            $table->boolean('is_paid')->default(false); // Indica si la deuda está pagada
            $table->timestamps(); // created_at y updated_at
            $table->softDeletes(); // deleted_at

            // Clave foránea
            $table->foreign('debtor_id')->references('debtor_id')->on('Debtor')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Debt');
    }
};
