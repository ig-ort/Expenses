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
        Schema::create('Expense', function (Blueprint $table) {
            $table->ulid('expense_id')->primary(); // Identificador único del gasto

            $table->unsignedBigInteger('user_id'); // Usuario que realizó el gasto

            $table->decimal('amount', 15, 2); // Monto del gasto
            $table->text('description')->nullable(); // Descripción del gasto
            $table->ulid('method_payment_id'); // Método de pago utilizado
            $table->ulid('card_id')->nullable(); // Tarjeta utilizada (si aplica)
            $table->ulid('bank_account_id')->nullable(); // Cuenta bancaria utilizada (si aplica)
            $table->date('expense_date'); // Fecha en que se realizó el gasto

            $table->unsignedTinyInteger('expense_status_id')->nullable(); // Fecha en que se realizó el gasto

            $table->boolean('is_installment')->default(false); // Indica si el gasto se divide en mensualidades
            $table->unsignedTinyInteger('installments_count')->nullable(); // Número de mensualidades

            $table->boolean('is_paid')->default(false); // Indica si el gasto ha sido pagado en su totalidad

            $table->decimal('total_paid', 15, 2)->default(0); // Monto total pagado

            $table->timestamps(); // created_at y updated_at
            $table->softDeletes(); // deleted_at

            // Claves foráneas
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('method_payment_id')->references('method_payment_id')->on('MethodPayment')->onDelete('cascade');
            $table->foreign('card_id')->references('card_id')->on('Card')->onDelete('set null');
            $table->foreign('bank_account_id')->references('bank_account_id')->on('BankAccount')->onDelete('set null');
            $table->foreign('expense_status_id')->references('expense_status_id')->on('ExpenseStatus');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Expense');
    }
};
