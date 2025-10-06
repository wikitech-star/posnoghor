<?php

namespace App\Http\Controllers\Backend\Question;

use App\Http\Controllers\Controller;
use App\Models\GroupClass;
use App\Models\Lassion;
use App\Models\Question_type;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionController extends Controller
{
    // add =================
    public function add_view(Request $request)
    {
        $class_id = $request->query('class_id');
        $subject_id = $request->query('subject_id');
        if (isset($class_id) && !empty($class_id)) {
            $subject = Subject::where('class_id', $class_id)->pluck('name', 'id')->toArray();
        } else {
            $subject = null;
        }
        if ((isset($class_id) && !empty($class_id)) && (isset($subject_id) && !empty($subject_id))) {
            $lassion = Lassion::where('class_id', $class_id)->where('subject_id', $subject_id)->pluck('name', 'id')->toArray();
        } else {
            $lassion = null;
        }
        $questionTypes = Question_type::pluck('name', 'id')->toArray();

        return Inertia::render('Backend/Question/Add', [
            'class_data' => GroupClass::pluck('name', 'id')->toArray(),
            'question_type' => count($questionTypes) ? $questionTypes : null,
            'subject' => $subject,
            'lassion' => $lassion
        ]);
    }
}
