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
        Schema::create('DebtPayment', function (Blueprint $table) {
            $table->ulid('debt_payment_id')->primary(); // Identificador único del pago
            $table->ulid('debt_id'); // Deuda asociada
            $table->ulid('debt_installment_id')->nullable(); // Cuota asociada (si aplica)
            $table->decimal('amount', 15, 2); // Monto del pago
            $table->date('payment_date'); // Fecha del pago
            $table->text('notes')->nullable(); // Notas adicionales
            $table->timestamps(); // created_at y updated_at
            $table->softDeletes(); // deleted_at

            // Claves foráneas
            $table->foreign('debt_id')->references('debt_id')->on('Debt')->onDelete('cascade');
            $table->foreign('debt_installment_id')->references('debt_installment_id')->on('DebtInstallment')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('DebtPayment');
    }
};
