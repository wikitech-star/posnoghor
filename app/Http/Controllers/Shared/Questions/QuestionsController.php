<?php

namespace App\Http\Controllers\Shared\Questions;

use App\Http\Controllers\Controller;
use App\Models\GroupClass;
use App\Models\Lassion;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionsController extends Controller
{
    public function index()
    {
        // class
        $group_class = GroupClass::pluck('name', 'id')->toArray();
        $group_class_ides = array_keys($group_class);

        // subjects
        $subjects = Subject::whereIn('class_id', $group_class_ides)->select('name', 'class_id', 'id')->get();
        $subjects_ides = Subject::whereIn('class_id', $group_class_ides)
            ->pluck('id')
            ->toArray();

        // lession
        $lassion = Lassion::whereIn('class_id', $group_class_ides)
            ->whereIn('subject_id', $subjects_ides)
            ->select('name', 'class_id', 'subject_id', 'id')->get();

        return Inertia::render('Shared/Questions/Index', [
            'group_class' => $group_class,
            'subjects' => $subjects,
            'lassion' => $lassion
        ]);
    }
}
