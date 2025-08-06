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
        Schema::create('Installment', function (Blueprint $table) {
            $table->ulid('installment_id')->primary(); // Identificador único de la mensualidad
            $table->ulid('expense_id'); // Gasto asociado
            $table->decimal('amount', 15, 2); // Monto de la mensualidad
            $table->date('due_date'); // Fecha de pago de la mensualidad

            $table->unsignedTinyInteger('expense_status_id')->nullable(); // Estado de la mensualidad

            $table->boolean('is_paid')->default(false); // Indica si el gasto ha sido pagado en su totalidad
            
            $table->decimal('total_paid', 15, 2)->default(0); // Monto total pagado de la cuota

            $table->timestamps(); // created_at y updated_at
            $table->softDeletes(); // deleted_at

            // Clave foránea
            $table->foreign('expense_id')->references('expense_id')->on('Expense')->onDelete('cascade');
                        $table->foreign('expense_status_id')->references('expense_status_id')->on('ExpenseStatus');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Installment');
    }
};
