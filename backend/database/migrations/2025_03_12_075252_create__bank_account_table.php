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
        Schema::create('BankAccount', function (Blueprint $table) {
            $table->ulid('bank_account_id')->primary();
            $table->text('name');
            $table->text('code');

            $table->text('clabe')->nullable();
            $table->text('account_number')->nullable();

            $table->text('icon')->nullable();
            $table->text('description')->nullable();

            $table->boolean('is_active');

            $table->ulid('bank_id');
            $table->foreign('bank_id')->references('bank_id')->on('Bank')->cascadeOnDelete();


            $table->timestamp('deleted_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('BankAccount');
    }
};
