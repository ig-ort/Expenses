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
        Schema::create('Card', function (Blueprint $table) {
            $table->char('card_id', 26)->primary(); // Identificador único de la tarjeta

            $table->unsignedBigInteger('user_id'); // Usuario dueño de la tarjeta

            $table->ulid('bank_account_id'); // Cuenta bancaria asociada a la tarjeta

            $table->ulid('card_type_id'); // Cuenta bancaria asociada a la tarjeta

            $table->string('name'); // Nombre de la tarjeta

            $table->char('last_four_digits', 4); // Últimos 4 dígitos de la tarjeta

            $table->date('expiration_date')->nullable(); // Fecha de expiración

            $table->decimal('credit_limit', 15, 2)->nullable(); // Límite de crédito (solo para crédito)
            
            $table->tinyInteger('cutoff_day')->nullable(); // Día de corte (solo para crédito)
            $table->tinyInteger('payment_day')->nullable(); // Día de pago (solo para crédito)
            $table->tinyInteger('payment_due_days')->nullable(); // Días para pagar después del corte (solo para crédito)
            
            // Claves foráneas
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('bank_account_id')->references('bank_account_id')->on('BankAccount')->onDelete('cascade');
            $table->foreign('card_type_id')->references('card_type_id')->on('CardType')->onDelete('cascade');
            
            $table->softDeletes(); // deleted_at
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Card');
    }
};
