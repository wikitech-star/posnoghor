import { Link } from "@inertiajs/react";
import { Download, Eye, Folder, Trash } from "lucide-react";
import React from "react";

export default function AllPapers({ tree }) {
    return (
        <div>
            <div className="bg-primary text-neutral text-xl font-bold p-3 flex items-center justify-center gap-2 rounded-box">
                <Download size={20} />{" "}
                <span>ক্লাউড থেকে প্রশ্নপত্র লোড করুন</span>
            </div>

            {/* tree */}
            <ul className="menu menu-md bg-white border border-dashed border-primary/50 rounded-box mt-4 w-full">
                {tree.map((classItem, i) => (
                    <li
                        key={i}
                        className="duration-300 hover:bg-white border-b border-gray-200 py-1 last:border-b-0"
                    >
                        <details>
                            <summary>
                                <Folder size={14} />
                                {classItem?.name}
                            </summary>
                            <ul>
                                {classItem.subjects.map((subject, i) => (
                                    <li key={i}>
                                        <details>
                                            <summary>
                                                <Folder size={14} />
                                                {subject.name}
                                            </summary>
                                            <ul>
                                                {subject.lessons.map(
                                                    (lesson, i) => (
                                                        <li key={i}>
                                                            <details>
                                                                <summary>
                                                                    <Folder
                                                                        size={
                                                                            14
                                                                        }
                                                                    />
                                                                    {
                                                                        lesson.name
                                                                    }
                                                                </summary>
                                                                <ul>
                                                                    {lesson.papers.map(
                                                                        (
                                                                            paper,
                                                                            i
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    i
                                                                                }
                                                                                className="border-b py-1 border-gray-200"
                                                                            >
                                                                                <div className="flex items-center justify-between gap-3">
                                                                                    <div className="flex items-center gap-2">
                                                                                        <Folder
                                                                                            size={
                                                                                                14
                                                                                            }
                                                                                        />
                                                                                        {
                                                                                            paper?.name
                                                                                        }
                                                                                    </div>

                                                                                    <div className="flex items-center gap-1">
                                                                                        <Link
                                                                                            href={route(
                                                                                                "g.questions.papper.details",
                                                                                                {
                                                                                                    id: paper?.id,
                                                                                                }
                                                                                            )}
                                                                                            className="btn btn-xs btn-info"
                                                                                        >
                                                                                            <Eye
                                                                                                size={
                                                                                                    12
                                                                                                }
                                                                                            />
                                                                                            দেখুন
                                                                                        </Link>
                                                                                        <Link
                                                                                            href={route(
                                                                                                "g.all.questions.papper.delete",
                                                                                                {
                                                                                                    id: paper?.id,
                                                                                                }
                                                                                            )}
                                                                                            preserveScroll
                                                                                            preserveState
                                                                                            onClick={(
                                                                                                e
                                                                                            ) => {
                                                                                                if (
                                                                                                    !confirm(
                                                                                                        "আপনি কি নিশ্চিত যে এই প্রশ্নপত্রটি মুছে ফেলতে চান?"
                                                                                                    )
                                                                                                ) {
                                                                                                    e.preventDefault();
                                                                                                }
                                                                                            }}
                                                                                            className="btn btn-xs btn-error"
                                                                                        >
                                                                                            <Trash
                                                                                                size={
                                                                                                    12
                                                                                                }
                                                                                            />
                                                                                            ডিলেট
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ul>
                                                            </details>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </details>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </li>
                ))}
            </ul>
        </div>
    );
}
