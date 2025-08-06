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
        Schema::create('Payment', function (Blueprint $table) {

            $table->ulid('payment_id')->primary(); // Identificador único del abono
            $table->ulid('expense_id'); // Gasto asociado
            $table->ulid('installment_id')->nullable(); // Cuota asociada (si aplica)
            $table->decimal('amount', 15, 2); // Monto del abono
            $table->date('payment_date'); // Fecha del abono
            $table->text('notes')->nullable(); // Notas adicionales
            
            $table->timestamps(); // created_at y updated_at
            $table->softDeletes(); // deleted_at

            // Claves foráneas
            $table->foreign('expense_id')->references('expense_id')->on('Expense')->onDelete('cascade');
            $table->foreign('installment_id')->references('installment_id')->on('Installment')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Payment');
    }
};
