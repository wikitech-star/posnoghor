<?php

namespace App\Http\Controllers\Shared\Questions;

use App\Http\Controllers\Controller;
use App\Models\GroupClass;
use App\Models\Lassion;
use App\Models\Subject;
use App\Models\QuestionPaper;
use App\Models\Questions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            $q->program_name = $request->program_name;
            $q->class_id = $request->class_id;
            $q->subjects = json_encode($request->subjects);
            $q->lession = json_encode($request->lassions);
            $q->type = $request->types;
            $q->save();

            return redirect()->route('g.load.questions', ['id' => $q->id]);
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }

    // load questions
    public function load_questions(Request $request, $id)
    {
        // query
        $query = $request->only('type', 'search', 'taqs');

        // paper data
        $paperData =  QuestionPaper::findOrFail($id);

        // make type
        // Determine question types
        $newTypes = $paperData->type === 'all'
            ? ['mcq', 'cq', 'sq']
            : [$paperData->type];

        // question
        $dataquery = Questions::query()
            ->whereIn('type', $newTypes)
            ->where('class_id', $paperData->class_id)
            ->whereIn('subject_id', json_decode($paperData->subjects, true))
            ->whereIn('lesson_id', json_decode($paperData->lession, true));

        // optional filters
        if (isset($query['type']) && in_array($query['type'], ['mcq', 'cq', 'sq'])) {
            $dataquery->where('type', $query['type']);
        }
        if (!empty($query['search'])) {
            $dataquery->where('body', 'like', '%' . $query['search'] . '%');
        }
        if (!empty($query['taqs'])) {
            $dataquery->whereJsonContains('meta->taq', $query['taqs']);
        }

        // 1️⃣ প্রথমে full collection (no pagination) → unique taq বের করার জন্য
        $allItems = $dataquery->with(['group_class', 'subject', 'lession', 'topics', 'createdby', 'updatedby'])
            ->get()
            ->map(function ($q) {
                if ($q->type === 'mcq') {
                    $q->setRelation('options', $q->mcqOptions);
                } elseif (in_array($q->type, ['cq', 'sq'])) {
                    $q->setRelation('options', $q->cqsqOptions);
                }
                return $q;
            });

        // 2️⃣ unique taq বের করা
        $uniqueTaqs = $allItems
            ->map(function ($item) {
                $meta = is_string($item->meta) ? json_decode($item->meta, true) : $item->meta;
                return $meta['taq'] ?? [];
            })
            ->flatten()
            ->unique()
            ->values();

        // 3️⃣ paginate করা ডেটা (main list)
        $data = $allItems->forPage(request('page', 1), 30)->values();
        $paginated = new \Illuminate\Pagination\LengthAwarePaginator(
            $data,
            $allItems->count(),
            30,
            request('page', 1),
            ['path' => request()->url(), 'query' => request()->query()]
        );

        return Inertia::render('Shared/Questions/LoadQuestions', [
            'paper_data' => $paperData,
            'data' => $paginated,
            'taqs' => $uniqueTaqs,
            'filters' => $query,
        ]);
    }
}
