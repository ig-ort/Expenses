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
        Schema::create('MethodPayment', function (Blueprint $table) {
            $table->ulid('method_payment_id')->primary();
            $table->string('name');
            $table->text('description')->nullable();
            $table->boolean('isActive');
            $table->string('image')->nullable();
            $table->string('icon')->nullable();
            $table->tinyInteger('order');

            $table->unsignedBigInteger('payment_logic_id');
            $table->foreign('payment_logic_id')->references('payment_logic_id')->on('PaymentLogic')->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('MethodPayment');
    }
};
