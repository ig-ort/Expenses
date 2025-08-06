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
        Schema::create('ExpenseStatus', function (Blueprint $table) {
            $table->tinyIncrements('expense_status_id');

            $table->text('name');
            $table->text('description')->nullable(); // Descripción del gasto
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ExpenseStatus');
    }
};
