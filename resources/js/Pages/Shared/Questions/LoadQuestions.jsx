import React from "react";
import Header from "../../../Components/Parts/Header";
import LatexPreview from "../../../Components/Parts/LatexPreview";
import { BANGLA_INDEX, ENGLISH_TO_BANGLA } from "../../../Utils/Helper";
import { Eye, Save } from "lucide-react";

export default function LoadQuestions({ paper_data, data }) {
    return (
        <div className="flex flex-col md:flex-row gap-3">
            {/* all questions */}
            <div className="w-full md:w-[calc(100%-350px)] h-fit">
                {/* header */}
                <div className="flex items-center justify-between gap-3 bg-gray-50 p-3.5 rounded-box border border-gray-200">
                    <div className="flex items-center gap-2">
                        <span>
                            মোট প্রশ্ন: ০/
                            {ENGLISH_TO_BANGLA(data?.total || 0)}
                        </span>
                    </div>
                    <div>
                        <h1 className="text-sm font-semibold text-neutral">
                            {paper_data?.program_name}
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="btn btn-sm btn-soft">
                            <Eye size={13} /> প্রিভিউ
                        </button>
                        <button className="btn btn-primary btn-sm">
                            <Save size={13} /> সংরক্ষণ
                        </button>
                    </div>
                </div>

                <p className="bg-primary/10 text-neutral font-normal text-sm text-center py-3 rounded-box my-2 px-3">
                    প্রশ্নে ভুল পেলে রিপোর্ট করে প্রশ্নব্যাংক সমৃদ্ধ করুন ।
                </p>

                {/* view questions */}
                <div className="flex flex-col gap-1.5">
                    {data?.data?.map((question, index) => (
                        <div
                            key={index}
                            className="p-4 border border-gray-300 rounded-box duration-300 hover:border-l-8 hover:border-r-8 hover:border-primary hover:shadow-md"
                        >
                            {/* uddipok */}
                            {(question.type == "cq" ||
                                question.type == "mcq") && (
                                <div className="flex gap-2">
                                    <span>
                                        {ENGLISH_TO_BANGLA(index + 1)}.{" "}
                                    </span>
                                    <LatexPreview content={question?.body} />
                                </div>
                            )}

                            {/* questions */}
                            {/* mcq */}
                            {question?.type == "mcq" && (
                                <div className="grid grid-cols-2 gap-1 mt-1">
                                    {question?.options
                                        ?.filter((val) => val.type === "normal")
                                        .map((val, i) => (
                                            <div
                                                className="flex items-center gap-2 py-1.5 bg-gray-200 px-2 rounded-box"
                                                key={i}
                                            >
                                                <p
                                                    className={`rounded-full w-5 h-5 text-xs flex items-center justify-center ${
                                                        val?.is_correct
                                                            ? "bg-neutral text-white"
                                                            : "border border-gray-400"
                                                    }`}
                                                >
                                                    {BANGLA_INDEX(i)}
                                                </p>
                                                <LatexPreview
                                                    content={val?.option_text}
                                                />
                                            </div>
                                        ))}
                                </div>
                            )}
                            {/* mcq hard label */}
                            {question?.type === "mcq" &&
                                question?.mcq_type === "hard" && (
                                    <p className="text-gray-600 text-sm font-normal py-2">
                                        নিচের কোনটি সঠিক?
                                    </p>
                                )}
                            {question?.type === "mcq" &&
                                question?.mcq_type === "hard" && (
                                    <div className="grid grid-cols-2 gap-1">
                                        {question?.options
                                            ?.filter(
                                                (val) => val.type === "hard"
                                            )
                                            .map((val, i) => (
                                                <div
                                                    className="flex items-center gap-2 py-1.5 bg-gray-200 px-2 rounded-box"
                                                    key={i}
                                                >
                                                    <p
                                                        className={`rounded-full w-5 h-5 text-xs flex items-center justify-center ${
                                                            val?.is_correct
                                                                ? "bg-neutral text-white"
                                                                : "border border-gray-400"
                                                        }`}
                                                    >
                                                        {BANGLA_INDEX(i)}
                                                    </p>
                                                    <LatexPreview
                                                        content={
                                                            val?.option_text
                                                        }
                                                    />
                                                </div>
                                            ))}
                                    </div>
                                )}

                            {/* others */}
                            {question?.type !== "mcq" && (
                                <div className="mt-2">
                                    {question?.options?.map((val, i) => (
                                        <div
                                            className="flex items-center gap-2 py-0.5"
                                            key={i}
                                        >
                                            <p>{BANGLA_INDEX(i)}.</p>
                                            <LatexPreview
                                                content={val?.questions}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* filter */}
            <div className="w-full md:w-[350px] h-fit"></div>
            <Header title="প্রশ্ন বাছায়" />
        </div>
    );
}
