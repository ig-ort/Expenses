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
        Schema::table('ClientProjectNote', function (Blueprint $table) {
            $table->ulid('parent_note_id')->nullable()->after('client_id'); // Aseguramos que el ID sea único y primario
            $table->foreign('parent_note_id')->references('client_project_note_id')->on('ClientProjectNote')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ClientProjectNote', function (Blueprint $table) {
            $table->dropForeign(['parent_note_id']);
            $table->dropColumn('parent_note_id');
        });
    }
};
