<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('column_options', function (Blueprint $table) {
            $table->string('names')->nullable();  // Add the 'names' column, nullable to avoid immediate errors
        });
    }
    
    public function down()
    {
        Schema::table('column_options', function (Blueprint $table) {
            $table->dropColumn('names');  // In case you want to roll back the migration
        });
    }
};
