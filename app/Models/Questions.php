<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Questions extends Model
{
    // fillable
    protected $fillable = ['class_id', 'subject_id', 'lesson_id', 'q_type_id', 'type', 'title', 'body', 'image', 'image_align', 'youtube_url', 'meta', 'requested_by', 'created_by', 'updated_by'];
}
