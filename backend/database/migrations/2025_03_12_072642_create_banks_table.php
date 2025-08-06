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
        Schema::create('Bank', function (Blueprint $table) {
            $table->ulid('bank_id')->primary();
            $table->text('name');
            $table->text('code');
            $table->text('icon')->nullable();
            $table->text('description')->nullable();

            $table->boolean('is_active');

            $table->unsignedBigInteger('user_id'); 
            $table->foreign('user_id')->references('id')->on('users');

            // $table->unsignedBigInteger('bank_status_id'); 
            // $table->foreign('bank_status_id')->references('id')->on('BankStatus');
            
            $table->timestamp('deleted_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Bank');
    }
};
