<?php

namespace App\Http\Controllers\Shared\Questions;

use App\Http\Controllers\Controller;
use App\Models\GroupClass;
use App\Models\Lassion;
use App\Models\Subject;
use App\Models\QuestionPaper;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionsController extends Controller
{
    // index
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
            'lassion' => $lassion,
        ]);
    }

    // create new paper
    public function store_paper(Request $request)
    {
        $request->validate([
            'program_name' => 'required',
            'class_id' => 'required',
            'subjects' => 'required|array',
            'lassions' => 'required|array',
            'types' => 'required',
        ], [
            'program_name.required' => 'প্রোগ্রাম নাম প্রদান করুন',
            'class_id.required' => 'শ্রেনী বাছায় করুন',
            'subjects.required' => 'বিষয় বাছায় করুন',
            'lassions.required' => 'অধ্যায় বাছায় করুন',
            'types.required' => 'প্রশ্নের ধরন বাছায় করুন',
        ]);
        try {

            // create a new paper
            $q = new QuestionPaper();
            $q->created_id = Auth::id();

        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.'.env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }
}
