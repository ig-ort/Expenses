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
        Schema::create('DebtInstallment', function (Blueprint $table) {
            $table->ulid('debt_installment_id')->primary(); // Identificador único de la cuota
            $table->ulid('debt_id'); // Deuda asociada
            $table->decimal('amount', 15, 2); // Monto de la cuota
            $table->decimal('paid_amount', 15, 2)->default(0); // Monto pagado de la cuota
            $table->date('due_date'); // Fecha de vencimiento de la cuota
            $table->boolean('is_paid')->default(false); // Indica si la cuota está pagada
            $table->timestamps(); // created_at y updated_at
            $table->softDeletes(); // deleted_at

            // Clave foránea
            $table->foreign('debt_id')->references('debt_id')->on('Debt')->onDelete('cascade');
        });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('DebtInstallment');
    }
};
