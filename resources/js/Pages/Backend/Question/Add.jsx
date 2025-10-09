import React, { useEffect, useState } from "react";
import MathEditor from "../../../Components/Parts/MathEditor";
import LatexPreview from "../../../Components/Parts/LatexPreview";
import { router, useForm } from "@inertiajs/react";
import Header from "../../../Components/Parts/Header";
import Select from "../../../Components/Parts/Select";
import FileInput from "../../../Components/Parts/FileInput";
import Input from "../../../Components/Parts/Input";
import DynamicMathEditor from "../../../Components/Parts/DynamicMathEditor";
import DynamicMathEditorBoth from "../../../Components/Parts/DynamicMathEditorBoth";
import { BANGLA_INDEX } from "../../../Utils/Helper";
import {
    BrushCleaning,
    Check,
    LoaderIcon,
    RefreshCcw,
} from "lucide-react";

export default function Add({ class_data, subject, lassion, question_type }) {
    const [schoolCollaps, setSchoolCollaps] = useState(true);
    const [mediaCollaps, setMediaCollaps] = useState(true);
    const [uddipokCollaps, setUddipokCollaps] = useState(true);
    const [cqsqCollaps, setCqSqCollaps] = useState(true);
    const [mcqCollAnsaps, setMcqAnsCollaps] = useState(true);
    const [mcqHCollAnsaps, setMcqHAnsCollaps] = useState(true);

    const qFrom = useForm({
        // required data
        question_type: "",
        question_label: "",
        class_id: "",
        subject_id: "",
        lassion_id: "",
        type_id: "",

        // media
        image: null,
        imagePosition: "center",
        videoUrl: "",

        // question
        searchTtitle: "",
        questionTtitle: "",

        // cq sq
        cqsqQuestion: [],

        // mcq
        mcqQuestion: [],
        mcqQuestionhard: [],
    });

    // create form submit
    const submitQuestion = (e) => {
        e.preventDefault();
        qFrom.post(route("ux.question.post"), {
            onSuccess: () => {
                qFrom.setData("image", null);
                qFrom.setData("videoUrl", "");
                qFrom.setData("searchTtitle", "");
                qFrom.setData("questionTtitle", "");
                qFrom.setData("cqsqQuestion", []);
                qFrom.setData("mcqQuestion", []);
                qFrom.setData("mcqQuestionhard", []);
            },
            preserveState: true,
            preserveScroll: true,
        });
    };

    // reset
    useEffect(() => {
        if (qFrom.data.question_type == "mcq") {
            qFrom.setData("cqsqQuestion", []);
        }
        if (qFrom.data.question_type !== "mcq") {
            qFrom.setData("question_label", "");
            qFrom.setData("cqsqQuestion", []);
            qFrom.setData("mcqQuestionhard", []);
            qFrom.setData("mcqQuestion", []);
        }
    }, [qFrom.data.question_type]);

    // search
    useEffect(() => {
        if (qFrom.data.class_id || qFrom.data.subject_id) {
            const delayDebounceFn = setTimeout(() => {
                router.get(
                    route("ux.question.add"),
                    {
                        class_id: qFrom.data.class_id,
                        subject_id: qFrom.data.subject_id,
                    },
                    {
                        preserveState: true,
                        replace: true,
                    }
                );
            }, 500);

            return () => clearTimeout(delayDebounceFn);
        }
    }, [qFrom.data.class_id, qFrom.data.subject_id]);

    return (
        <div className="bg-white p-6 rounded-box space-y-6">
            {/* page title */}
            <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-5">
                <div>
                    <h4 className="text-lg font-medium">নতুন প্রশ্ন তৈরী</h4>
                    <p className="text-sm text-gray-500">
                        নতুন প্রশ্ন তৈরী করুন, * চিহ্ন দেওয়া সকল ফিল্ড
                        বাধ্যামূল্যক।
                    </p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-3">
                {/* form */}
                <div className="space-y-3 w-full lg:w-[60%]">
                    <button
                        onClick={() => {
                            if (confirm("আপনি কি নিশ্চিত?")) {
                                qFrom.reset();
                                router.visit(route("ux.question.add"), {
                                    preserveScroll: true,
                                    preserveState: true,
                                });
                            }
                        }}
                        className="btn btn-xs btn-error float-end"
                    >
                        <RefreshCcw size={14} /> সব পরিষ্কার করুন
                    </button>

                    {/* required data */}
                    <div
                        tabIndex={0}
                        className={`collapse ${
                            schoolCollaps ? "collapse-open" : "collapse-close"
                        } collapse-plus bg-base-100 border-base-300 border`}
                    >
                        <div
                            className="collapse-title font-semibold text-sm bg-primary text-neutral"
                            onClick={() => setSchoolCollaps(!schoolCollaps)}
                        >
                            বাধ্যামূল্যক তথ্য*
                        </div>
                        <div
                            className={`collapse-content space-y-4 ${
                                schoolCollaps && "pt-3"
                            }`}
                        >
                            <Select
                                label="প্রশ্নের ধরন*"
                                options={{ mcq: "MCQ", cq: "CQ", sq: "SQ" }}
                                oldVal={qFrom.data.question_type}
                                onChange={(e) =>
                                    qFrom.setData(
                                        "question_type",
                                        e.target.value
                                    )
                                }
                                error={qFrom.errors.question_type}
                            />
                            {qFrom.data.question_type === "mcq" && (
                                <Select
                                    label="MCQ ধরন*"
                                    options={{
                                        normal: "সাধারন",
                                        hard: "উচ্চতার দক্ষতা",
                                    }}
                                    oldVal={qFrom.data.question_label}
                                    onChange={(e) =>
                                        qFrom.setData(
                                            "question_label",
                                            e.target.value
                                        )
                                    }
                                    error={qFrom.errors.question_label}
                                />
                            )}

                            <Select
                                label="শ্রেনী*"
                                name="class_id"
                                options={class_data || {}}
                                oldVal={qFrom.data.class_id}
                                onChange={(e) =>
                                    qFrom.setData("class_id", e.target.value)
                                }
                                error={qFrom.errors.class_id}
                            />
                            <Select
                                label="বিষয়*"
                                options={subject || {}}
                                disabled={subject == null}
                                oldVal={qFrom.data.subject_id}
                                onChange={(e) =>
                                    qFrom.setData("subject_id", e.target.value)
                                }
                                error={qFrom.errors.subject_id}
                            />
                            <Select
                                label="অধ্যায়*"
                                options={lassion || {}}
                                disabled={lassion == null}
                                oldVal={qFrom.data.lassion_id}
                                onChange={(e) =>
                                    qFrom.setData("lassion_id", e.target.value)
                                }
                                error={qFrom.errors.lassion_id}
                            />
                            <Select
                                label="টপিক*"
                                disabled={question_type == null}
                                options={question_type || {}}
                                oldVal={qFrom.data.type_id}
                                onChange={(e) =>
                                    qFrom.setData("type_id", e.target.value)
                                }
                                error={qFrom.errors.type_id}
                            />
                        </div>
                    </div>

                    {/* media */}
                    <div
                        tabIndex={0}
                        className={`collapse ${
                            mediaCollaps ? "collapse-open" : "collapse-close"
                        } collapse-plus bg-base-100 border-base-300 border`}
                    >
                        <div
                            className="collapse-title font-semibold text-sm bg-primary text-neutral"
                            onClick={() => setMediaCollaps(!mediaCollaps)}
                        >
                            মেডিয়া
                        </div>
                        <div
                            className={`collapse-content space-y-4 ${
                                mediaCollaps && "pt-3"
                            }`}
                        >
                            <FileInput
                                onChange={(f) => qFrom.setData("image", f)}
                                error={qFrom.errors.image}
                                accept="image/png,.jpg,.jpeg"
                            />
                            <Select
                                label="ইমাজে পজিশন"
                                oldVal={qFrom.data.imagePosition}
                                onChange={(e) =>
                                    qFrom.setData(
                                        "imagePosition",
                                        e.target.value
                                    )
                                }
                                options={{
                                    left: "বামে",
                                    center: "মাঝে",
                                    right: "ডানে",
                                }}
                            />
                            <Input
                                label="ভিডিও লিংক"
                                value={qFrom.data.videoUrl}
                                onChange={(e) =>
                                    qFrom.setData("videoUrl", e.target.value)
                                }
                                error={qFrom.errors.videoUrl}
                            />
                        </div>
                    </div>

                    {/* title */}
                    <div
                        tabIndex={0}
                        className={`collapse ${
                            uddipokCollaps ? "collapse-open" : "collapse-close"
                        } collapse-plus bg-base-100 border-base-300 border`}
                    >
                        <div
                            className="collapse-title font-semibold text-sm bg-primary text-neutral"
                            onClick={() => setUddipokCollaps(!uddipokCollaps)}
                        >
                            উদ্দিপক*
                        </div>
                        <div
                            className={`collapse-content space-y-4 ${
                                uddipokCollaps && "pt-3"
                            }`}
                        >
                            <Input
                                label="সার্স টাইটেল"
                                value={qFrom.data.searchTtitle}
                                error={qFrom.errors.searchTtitle}
                                onChange={(e) =>
                                    qFrom.setData(
                                        "searchTtitle",
                                        e.target.value
                                    )
                                }
                            />
                            {qFrom.data.question_type !== "sq" && (
                                <MathEditor
                                    value={qFrom.data.questionTtitle}
                                    onChange={(val) =>
                                        qFrom.setData("questionTtitle", val)
                                    }
                                    error={qFrom.errors.questionTtitle}
                                />
                            )}
                        </div>
                    </div>

                    {/* cq || sq */}
                    {(qFrom.data.question_type === "cq" ||
                        qFrom.data.question_type === "sq") && (
                        <div
                            tabIndex={0}
                            className={`collapse ${
                                cqsqCollaps ? "collapse-open" : "collapse-close"
                            } collapse-plus bg-base-100 border-base-300 border`}
                        >
                            <div
                                className="collapse-title font-semibold text-sm bg-primary text-neutral uppercase"
                                onClick={() => setCqSqCollaps(!cqsqCollaps)}
                            >
                                {qFrom.data.question_type} প্রশ্ন*
                            </div>
                            <div
                                className={`collapse-content space-y-4 ${
                                    cqsqCollaps && "pt-3"
                                }`}
                            >
                                <DynamicMathEditorBoth
                                    qFrom={qFrom}
                                    name="cqsqQuestion"
                                    defaultCount={1}
                                    defaultValues={qFrom.data.cqsqQuestion}
                                />
                            </div>
                        </div>
                    )}

                    {/* mcq */}
                    {qFrom.data.question_type === "mcq" &&
                        (qFrom.data.question_label === "normal" ||
                            qFrom.data.question_label === "hard") && (
                            <div
                                tabIndex={0}
                                className={`collapse ${
                                    mcqCollAnsaps
                                        ? "collapse-open"
                                        : "collapse-close"
                                } collapse-plus bg-base-100 border-base-300 border`}
                            >
                                <div
                                    className="collapse-title font-semibold text-sm bg-primary text-neutral uppercase"
                                    onClick={() =>
                                        setMcqAnsCollaps(!mcqCollAnsaps)
                                    }
                                >
                                    {qFrom.data.question_type} প্রশ্ন সাধারন*
                                </div>
                                <div
                                    className={`collapse-content space-y-4 ${
                                        mcqCollAnsaps && "pt-3"
                                    }`}
                                >
                                    <DynamicMathEditor
                                        qFrom={qFrom}
                                        name="mcqQuestion"
                                        defaultCount={1}
                                        type="normal"
                                        defaultValues={qFrom.data.mcqQuestion}
                                    />
                                </div>
                            </div>
                        )}

                    {qFrom.data.question_type === "mcq" &&
                        qFrom.data.question_label === "hard" && (
                            <div
                                tabIndex={0}
                                className={`collapse ${
                                    mcqHCollAnsaps
                                        ? "collapse-open"
                                        : "collapse-close"
                                } collapse-plus bg-base-100 border-base-300 border`}
                            >
                                <div
                                    className="collapse-title font-semibold text-sm bg-primary text-neutral uppercase"
                                    onClick={() =>
                                        setMcqHAnsCollaps(!mcqHCollAnsaps)
                                    }
                                >
                                    {qFrom.data.question_type} প্রশ্ন উচ্চতার
                                    দক্ষতা*
                                </div>
                                <div
                                    className={`collapse-content space-y-4 ${
                                        mcqHCollAnsaps && "pt-3"
                                    }`}
                                >
                                    <DynamicMathEditor
                                        qFrom={qFrom}
                                        name="mcqQuestionhard"
                                        defaultCount={1}
                                        type="hard"
                                        defaultValues={
                                            qFrom.data.mcqQuestionhard
                                        }
                                    />
                                </div>
                            </div>
                        )}

                    <button
                        onClick={submitQuestion}
                        disabled={qFrom.processing}
                        className="btn btn-primary btn-sm mt-2"
                    >
                        {qFrom.processing && (
                            <LoaderIcon size={13} className="animate-spin" />
                        )}{" "}
                        সেভ করুন
                    </button>
                </div>

                {/* preview */}
                <div className="border border-gray-300 rounded-box p-5 max-h-fit sticky top-25 w-full lg:w-[40%]">
                    {(qFrom.data.searchTtitle ||
                        qFrom.data.questionTtitle ||
                        qFrom.data?.cqsqQuestion.length > 0) && (
                        <h1 className="text-md font-bold mb-4 text-gray-500">
                            প্রশ্নের ডেমু
                        </h1>
                    )}

                    {/* search title */}
                    <h1 className="text-sm text-neutral">
                        {qFrom.data.searchTtitle}
                    </h1>

                    {/* uddipok */}
                    <LatexPreview content={qFrom.data.questionTtitle} />

                    {/* cq sq */}
                    {(qFrom.data.question_type === "cq" ||
                        qFrom.data.question_type === "sq") && (
                        <>
                            <div className="mt-3 pl-4">
                                {qFrom.data?.cqsqQuestion.map((val, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2"
                                    >
                                        <p>{BANGLA_INDEX(i)}.</p>
                                        <LatexPreview
                                            content={val["question"]}
                                        />
                                    </div>
                                ))}
                            </div>

                            {qFrom.data?.cqsqQuestion.length > 0 && (
                                <h1 className="text-xs font-bold mt-3 text-neutral">
                                    প্রশ্নের উত্তর
                                </h1>
                            )}
                            <div className="mt-1 pl-4">
                                {qFrom.data?.cqsqQuestion.map((val, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2"
                                    >
                                        <p>{BANGLA_INDEX(i)}.</p>
                                        <LatexPreview content={val["answer"]} />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* mcq */}
                    {qFrom.data.question_type === "mcq" && (
                        <div className="mt-3 pl-4">
                            {qFrom.data?.mcqQuestion.map((val, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2"
                                >
                                    <p>{BANGLA_INDEX(i)}.</p>
                                    <LatexPreview content={val["value"]} />
                                    {val["isRight"] && <Check size={10} />}
                                </div>
                            ))}
                        </div>
                    )}
                    {qFrom.data?.mcqQuestionhard.length > 0 &&
                        qFrom.data.question_label === "hard" && (
                            <h1 className="text-xs font-bold mt-3 text-neutral">
                                নিচের কোনটি সঠিক?
                            </h1>
                        )}
                    {qFrom.data.question_type === "mcq" &&
                        qFrom.data.question_label === "hard" && (
                            <div className="mt-3 pl-4">
                                {qFrom.data?.mcqQuestionhard.map((val, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2"
                                    >
                                        <p>{BANGLA_INDEX(i)}.</p>
                                        <LatexPreview content={val["value"]} />
                                        {val["isRight"] && <Check size={10} />}
                                    </div>
                                ))}
                            </div>
                        )}

                    {/* emoty */}
                    {(!qFrom.data.questionTtitle ||
                        qFrom.data?.cqsqQuestion.length < 0 ||
                        qFrom.data?.mcqQuestionhard.length < 0 ||
                        qFrom.data?.mcqQuestion.length < 0) && (
                        <div className="flex flex-col items-center p-10">
                            <BrushCleaning
                                size={20}
                                className="text-gray-400"
                            />
                            <p className="text-sm font-medium text-gray-400 mt-2">
                                কোন লেখা নেই!
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <Header title="নতুন প্রশ্ন তৈরী" />
        </div>
    );
}
