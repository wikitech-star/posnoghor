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
        Schema::create('q_uestion_paper_items', function (Blueprint $table) {
            $table->id();
            $table->string('sirial_number')->nullable();
            $table->unsignedBigInteger('question_paper_id');
            $table->unsignedBigInteger('question_id');

            $table->enum('type', ['mcq', 'cq', 'sq']);
            $table->enum('mcq_type', ['normal', 'hard']);

            $table->longText('body')->nullable();

            $table->string('image')->nullable();
            $table->string('image_align')->default('left');

            $table->json('options')->nullable();

            $table->timestamps();
            $table->foreign('question_paper_id')->references('id')->on('question_papers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('q_uestion_paper_items');
    }
};
