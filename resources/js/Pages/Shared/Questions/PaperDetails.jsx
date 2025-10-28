import {
    AlignCenter,
    CheckCircle,
    Circle,
    CircleSlash2,
    Columns2,
    Columns3,
    Download,
    Minus,
    Plus,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import EditableText from "../../../Components/Parts/EditableText";
import Select from "../../../Components/Parts/Select";
import LatexPreview from "../../../Components/Parts/LatexPreview";
import {
    BANGLA_INDEX,
    ENGLISH_DATE_TO_BANGLA,
    ENGLISH_TO_BANGLA,
} from "../../../Utils/Helper";

export default function PaperDetails({
    paper_data,
    class_name,
    subjects,
    lessons,
    data,
}) {
    // font
    const [newFont, setNewFont] = useState("font-base");

    // addons
    const [studentDetails, setStudentDetails] = useState(false);
    const [satCode, setSadCode] = useState(false);
    const [getMarks, setGetMarks] = useState(false);
    const [className, setClassName] = useState(true);
    const [subjectsShow, setSubjectSow] = useState(true);
    const [lassionShow, setLassionSow] = useState(true);
    const [programShow, setProgramShow] = useState(false);
    const [noticeShow, setNoticeShow] = useState(true);

    // style
    const [col, setCol] = useState(2);
    const [colDevider, setColDevider] = useState(true);
    const [optionStyle, setOptionStyle] = useState(2);
    const [fontSize, setFontSize] = useState(14);

    // branding
    const [copyright, setCopyright] = useState(false);
    const [copyrightText, setCopyrightText] = useState(
        paper_data?.program_name || ""
    );
    const [copyrightSize, setCopyrightSize] = useState(30);
    const [copyrightOpacity, setCopyrightOpacity] = useState(13);

    // data
    const [mcqQuestions, setMcqQuestions] = useState([]);
    const [cqQuestions, setCqQuestions] = useState([]);
    const [sqQuestions, setSqQuestions] = useState([]);
    useEffect(() => {
        const finalData = data?.data;
        const mcqs = finalData.filter((q) => q.type == "mcq");
        const cqs = finalData.filter((q) => q.type == "cq");
        const sqs = finalData.filter((q) => q.type == "sq");

        setMcqQuestions(mcqs);
        setCqQuestions(cqs);
        setSqQuestions(sqs);
    }, [data]);

    // col devider
    const ColumnDividers = ({ col = 3, containerWidth = 800 }) => {
        const dividers = [];

        for (let i = 1; i < col; i++) {
            dividers.push(
                <div
                    key={i}
                    className="absolute top-0 bottom-0 w-[0.1px] bg-gray-300"
                    style={{
                        left: `${(100 / col) * i}%`, // use percentage instead of px — responsive layout
                        transform: "translateX(-50%)", // perfectly center between columns
                    }}
                />
            );
        }

        return <>{dividers}</>;
    };

    return (
        <div className="flex gap-4 w-full justify-center text-[#000000]">
            {/* paper */}
            <div className="bg-white w-[800px] h-fit shadow-xs rounded-box px-8 py-10 sticky top-[70px]">
                {/* heade */}
                <div className="text-center mb-8 ">
                    {programShow && (
                        <EditableText
                            defaultStyle={{
                                textAlign: "center",
                                fontSize: "16px",
                            }}
                            className={`${newFont} text-xl font-semibold text-[#000000]`}
                            value={paper_data.program_name}
                        />
                    )}
                    {className && (
                        <EditableText
                            defaultStyle={{
                                textAlign: "center",
                                fontSize: "16px",
                            }}
                            className={`${newFont} text-md font-normal`}
                            value={class_name}
                        />
                    )}
                    {subjectsShow && (
                        <EditableText
                            defaultStyle={{
                                textAlign: "center",
                                fontSize: "16px",
                            }}
                            className={`${newFont} text-md font-normal`}
                            value={subjects.join(" - ")}
                        />
                    )}
                    {lassionShow && (
                        <EditableText
                            defaultStyle={{
                                textAlign: "center",
                                fontSize: "16px",
                            }}
                            className={`${newFont} text-md font-normal`}
                            value={lessons.join(" - ")}
                        />
                    )}
                </div>

                {/* student info */}
                {studentDetails && (
                    <div className="flex items-center justify-between gap-2 mt-3">
                        <EditableText
                            defaultStyle={{
                                textAlign: "left",
                                fontSize: "14px",
                            }}
                            className={`${newFont} min-w-fit`}
                            value="শিক্ষার্থীর নাম:................................................"
                        />
                        <EditableText
                            defaultStyle={{
                                textAlign: "left",
                                fontSize: "14px",
                            }}
                            className={`${newFont}`}
                            value="শাখা:................................................"
                        />
                        <EditableText
                            defaultStyle={{
                                textAlign: "left",
                                fontSize: "14px",
                            }}
                            className={`${newFont}`}
                            value="রোল:......................................."
                        />
                    </div>
                )}

                {/* set code and total marks */}
                {satCode && (
                    <div className="border rounded-box absolute right-10 top-12 flex items-center">
                        <div className="text-sm text-neutral font-bold px-2 py-1 border-r">
                            <EditableText
                                defaultStyle={{
                                    textAlign: "center",
                                    fontSize: "13px",
                                }}
                                fontSize={13}
                                className={`${newFont}`}
                                value="সেট"
                            />
                        </div>
                        <div className="text-sm text-neutral font-bold px-2 py-1 min-w-10">
                            <EditableText
                                defaultStyle={{
                                    textAlign: "center",
                                    fontSize: "13px",
                                }}
                                fontSize={13}
                                className={`${newFont}`}
                                value=""
                            />
                        </div>
                    </div>
                )}
                {getMarks && (
                    <div className="border rounded-box absolute right-10 top-20 flex items-center">
                        <div className="text-sm text-neutral font-bold px-2 border-r py-1">
                            <EditableText
                                defaultStyle={{
                                    textAlign: "center",
                                    fontSize: "13px",
                                }}
                                fontSize={13}
                                className={`${newFont}`}
                                value="প্রাপ্ত নম্বর"
                            />
                        </div>
                        <div className="text-sm text-neutral font-bold px-2 min-w-15 py-1">
                            <EditableText
                                defaultStyle={{
                                    textAlign: "center",
                                    fontSize: "13px",
                                }}
                                fontSize={13}
                                className={`${newFont}`}
                                value="  "
                            />
                        </div>
                    </div>
                )}

                {/* time / marks */}
                <div className="flex items-center justify-between mt-3 border-b border-gray-300">
                    <EditableText
                        defaultStyle={{
                            textAlign: "left",
                            fontSize: "16px",
                        }}
                        className={`${newFont}`}
                        value="সময়—১ ঘন্টা"
                    />
                    {(() => {
                        const totalMarks =
                            (mcqQuestions?.length || 0) * 1 +
                            (cqQuestions?.length || 0) * 10 +
                            (sqQuestions?.length || 0) * 1;

                        if (!totalMarks) {
                            return;
                        }

                        return (
                            <EditableText
                                defaultStyle={{
                                    textAlign: "right",
                                    fontSize: "16px",
                                }}
                                className={newFont}
                                value={`পূর্ণমান— ${ENGLISH_TO_BANGLA(
                                    totalMarks
                                )}`}
                            />
                        );
                    })()}
                </div>

                {/* notice */}
                {noticeShow && (
                    <h1 className="font-bold text-center text-base w-full">
                        <EditableText
                            defaultStyle={{
                                textAlign: "center",
                                fontSize: "5px",
                            }}
                            fontSize={14}
                            className={`${newFont} py-2`}
                            value="প্রশ্নপত্রে কোনো প্রকার দাগ/চিহ্ন দেয়া যাবেনা।"
                        />
                    </h1>
                )}

                {/* load all questions */}
                <div
                    className={`${col == 1 && "columns-1"} ${
                        col == 2 && "columns-2"
                    } ${
                        col == 3 && "columns-3"
                    } flex-1 gap-5 overflow-hidden relative [&>*]:break-inside-avoid`}
                >
                    {/* mcq */}
                    <div>
                        {mcqQuestions.length > 0 && (
                            <>
                                <div className="flex items-center justify-between">
                                    <EditableText
                                        value="বহুনির্বাচনি অংশ:"
                                        defaultStyle={{
                                            fontSize: "14px",
                                        }}
                                        onFontSizeChange={setFontSize}
                                        fontSize={fontSize}
                                        className={`font-bold ${newFont}`}
                                    />
                                    <EditableText
                                        value={`${ENGLISH_TO_BANGLA(
                                            mcqQuestions.length
                                        )} x ১ = ${ENGLISH_TO_BANGLA(
                                            mcqQuestions.length * 1
                                        )}`}
                                        defaultStyle={{
                                            fontSize: "14px",
                                        }}
                                        onFontSizeChange={setFontSize}
                                        fontSize={fontSize}
                                        className={`font-normal text-base ${newFont}`}
                                    />
                                </div>
                                {mcqQuestions.map((val, i) => (
                                    <div className="mt-2" key={i}>
                                        <div className="flex gap-2">
                                            <EditableText
                                                value={`${ENGLISH_TO_BANGLA(
                                                    i < 10
                                                        ? `0${i + 1}`
                                                        : `${i + 1}`
                                                )}.`}
                                                defaultStyle={{
                                                    fontSize: "14px",
                                                }}
                                                onFontSizeChange={setFontSize}
                                                fontSize={fontSize}
                                                className={`font-nromal text-base ${newFont}`}
                                            />
                                            <LatexPreview
                                                className={`text-sm ${newFont} mb-0.5`}
                                                style={{
                                                    fontSize: fontSize + "px",
                                                }}
                                                content={val.body}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            {val?.options.map((op, i) => (
                                                <div
                                                    key={i}
                                                    className={`flex gap-1 ml-6`}
                                                >
                                                    <p
                                                        className={`${newFont} ${
                                                            optionStyle == 1
                                                                ? "w-4.5 h-4.5 rounded-full border flex items-center justify-center border-neutral/50 pt-1 text-xs"
                                                                : "text-sm"
                                                        }`}
                                                        style={{
                                                            fontSize:
                                                                fontSize + "px",
                                                        }}
                                                    >
                                                        {optionStyle == 3 &&
                                                            "("}
                                                        {BANGLA_INDEX(i + 1)}
                                                        {optionStyle == 2 &&
                                                            "."}
                                                        {optionStyle == 3 &&
                                                            ")"}
                                                        {optionStyle == 4 &&
                                                            ")"}
                                                    </p>
                                                    <LatexPreview
                                                        className={`text-sm ${newFont}`}
                                                        style={{
                                                            fontSize:
                                                                fontSize + "px",
                                                        }}
                                                        content={op.option_text}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>

                    {/* cq */}
                    <div>
                        {cqQuestions.length > 0 && (
                            <div className="mt-1">
                                <div className="flex items-center justify-between">
                                    <EditableText
                                        value="সৃজনশীল অংশ:"
                                        defaultStyle={{
                                            fontSize: "14px",
                                        }}
                                        onFontSizeChange={setFontSize}
                                        fontSize={fontSize}
                                        className={`font-bold text-base ${newFont}`}
                                    />
                                    <EditableText
                                        value={`${ENGLISH_TO_BANGLA(
                                            cqQuestions.length
                                        )} x ১০ = ${ENGLISH_TO_BANGLA(
                                            cqQuestions.length * 10
                                        )}`}
                                        defaultStyle={{
                                            fontSize: "14px",
                                        }}
                                        onFontSizeChange={setFontSize}
                                        fontSize={fontSize}
                                        className={`font-normal text-base ${newFont}`}
                                    />
                                </div>
                                {cqQuestions.map((val, i) => (
                                    <div className="mt-2" key={i}>
                                        <div className="flex gap-2">
                                            <EditableText
                                                value={`${ENGLISH_TO_BANGLA(
                                                    i < 10
                                                        ? `0${i + 1}`
                                                        : `${i + 1}`
                                                )}.`}
                                                defaultStyle={{
                                                    fontSize: "14px",
                                                }}
                                                onFontSizeChange={setFontSize}
                                                fontSize={fontSize}
                                                className={`font-normal text-base ${newFont}`}
                                            />
                                            <LatexPreview
                                                className={`text-sm ${newFont} mb-1`}
                                                style={{
                                                    fontSize: fontSize + "px",
                                                }}
                                                content={val.body}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            {val?.options.map((op, i) => (
                                                <div
                                                    key={i}
                                                    className="flex justify-between"
                                                >
                                                    <div className="flex gap-1 ml-6">
                                                        <p
                                                            className={`${newFont} ${
                                                                optionStyle == 1
                                                                    ? "w-4.5 h-4.5 rounded-full border flex items-center justify-center border-neutral/50 pt-1 text-xs"
                                                                    : "text-sm"
                                                            }`}
                                                            style={{
                                                                fontSize:
                                                                    fontSize +
                                                                    "px",
                                                            }}
                                                        >
                                                            {optionStyle == 3 &&
                                                                "("}
                                                            {BANGLA_INDEX(
                                                                i + 1
                                                            )}
                                                            {optionStyle == 2 &&
                                                                "."}
                                                            {optionStyle == 3 &&
                                                                ")"}
                                                            {optionStyle == 4 &&
                                                                ")"}
                                                        </p>
                                                        <LatexPreview
                                                            className={`text-sm ${newFont}`}
                                                            style={{
                                                                fontSize:
                                                                    fontSize +
                                                                    "px",
                                                            }}
                                                            content={
                                                                op.questions
                                                            }
                                                        />
                                                    </div>
                                                    <div>
                                                        <EditableText
                                                            className={`font-normal ${newFont}`}
                                                            onFontSizeChange={
                                                                setFontSize
                                                            }
                                                            fontSize={fontSize}
                                                            value={ENGLISH_TO_BANGLA(
                                                                i + 1
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* sq */}
                    <div>
                        {sqQuestions.length > 0 && (
                            <div className="mt-1">
                                <div className="flex items-center justify-between">
                                    <EditableText
                                        value="সংক্ষিপ্ত প্রশ্ন:"
                                        defaultStyle={{
                                            fontSize: "14px",
                                        }}
                                        onFontSizeChange={setFontSize}
                                        fontSize={fontSize}
                                        className={`font-bold text-base ${newFont}`}
                                    />
                                    <EditableText
                                        value={`${ENGLISH_TO_BANGLA(
                                            sqQuestions.length
                                        )} x ১ = ${ENGLISH_TO_BANGLA(
                                            sqQuestions.length * 1
                                        )}`}
                                        defaultStyle={{
                                            fontSize: "14px",
                                        }}
                                        onFontSizeChange={setFontSize}
                                        fontSize={fontSize}
                                        className={`font-normal text-base ${newFont}`}
                                    />
                                </div>
                                {sqQuestions.map((val, i) => (
                                    <div className="mt-2" key={i}>
                                        {val?.options.map((op, oi) => (
                                            <div
                                                key={oi}
                                                className="flex gap-1 ml-3.5"
                                            >
                                                <EditableText
                                                    value={`${ENGLISH_TO_BANGLA(
                                                        i < 10
                                                            ? `0${i + 1}`
                                                            : `${i + 1}`
                                                    )}.`}
                                                    defaultStyle={{
                                                        fontSize: "14px",
                                                    }}
                                                    onFontSizeChange={
                                                        setFontSize
                                                    }
                                                    fontSize={fontSize}
                                                    className={`font-normal text-base ${newFont}`}
                                                />
                                                <LatexPreview
                                                    className={`text-sm ${newFont}`}
                                                    style={{
                                                        fontSize:
                                                            fontSize + "px",
                                                    }}
                                                    content={op.questions}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Dynamic dividers */}
                    {colDevider && (
                        <ColumnDividers col={col} containerWidth={800} />
                    )}

                    {/* copyright */}
                    {copyright && (
                        <h1
                            className="absolute top-1/2 left-1/2 -rotate-45 font-semibold -translate-1/2 -z-1"
                            style={{
                                fontSize: copyrightSize + "px",
                                opacity: copyrightOpacity + "%",
                            }}
                        >
                            {copyrightText}
                        </h1>
                    )}
                </div>
            </div>

            {/* settings */}
            <div className="bg-white p-3 rounded-box h-fit shadow-xs min-w-[300px] max-h-screen overflow-y-auto">
                <button className="btn btn-primary btn-sm w-full">
                    <Plus size={14} /> আরও প্রশ্ন যুক্ত করুন
                </button>
                <button className="btn bg-neutral text-white mt-1 btn-sm w-full">
                    <Download size={14} /> ডাউনলোড
                </button>

                {/* addons */}
                <ul className="mt-3 pt-3 border-t border-dashed border-gray-400 space-y-1">
                    <li className="bg-primary/30 rounded-box border-t border-primary py-2 px-3 text-sm text-center font-semibold">
                        প্রশ্নের যুক্ত করুন
                    </li>
                    <li className="bg-gray-200 rounded-box py-2.5 px-3 text-sm text-center font-semibold flex items-center justify-between">
                        <p>শীক্ষার্থির তথ্য</p>
                        <input
                            type="checkbox"
                            defaultChecked={studentDetails}
                            onChange={(e) =>
                                setStudentDetails(e.target.checked)
                            }
                            className="toggle"
                        />
                    </li>
                </ul>

                {/* header */}
                <ul className="mt-3 space-y-1">
                    <li className="bg-primary/30 rounded-box border-t border-primary py-2 px-3 text-sm text-center font-semibold">
                        প্রশ্নের মেটাডাটা (হেডার)
                    </li>
                    <li className="bg-gray-200 rounded-box py-2.5 px-3 text-sm text-center font-semibold flex items-center justify-between">
                        <p>সেট কোড</p>
                        <input
                            type="checkbox"
                            defaultChecked={satCode}
                            onChange={(e) => setSadCode(e.target.checked)}
                            className="toggle"
                        />
                    </li>
                    <li className="bg-gray-200 rounded-box py-2.5 px-3 text-sm text-center font-semibold flex items-center justify-between">
                        <p>প্রাপ্ত নম্বর ঘর </p>
                        <input
                            type="checkbox"
                            defaultChecked={getMarks}
                            onChange={(e) => setGetMarks(e.target.checked)}
                            className="toggle"
                        />
                    </li>
                    <li className="bg-gray-200 rounded-box py-2.5 px-3 text-sm text-center font-semibold flex items-center justify-between">
                        <p>শ্রেণির নাম</p>
                        <input
                            type="checkbox"
                            defaultChecked={className}
                            onChange={(e) => setClassName(e.target.checked)}
                            className="toggle"
                        />
                    </li>
                    <li className="bg-gray-200 rounded-box py-2.5 px-3 text-sm text-center font-semibold flex items-center justify-between">
                        <p>বিষয়ের নাম</p>
                        <input
                            type="checkbox"
                            defaultChecked={subjectsShow}
                            onChange={(e) => setSubjectSow(e.target.checked)}
                            className="toggle"
                        />
                    </li>
                    <li className="bg-gray-200 rounded-box py-2.5 px-3 text-sm text-center font-semibold flex items-center justify-between">
                        <p>অধ্যায় নাম</p>
                        <input
                            type="checkbox"
                            defaultChecked={lassionShow}
                            onChange={(e) => setLassionSow(e.target.checked)}
                            className="toggle"
                        />
                    </li>
                    <li className="bg-gray-200 rounded-box py-2.5 px-3 text-sm text-center font-semibold flex items-center justify-between">
                        <p>প্রোগ্রাম/পরিক্ষার নাম</p>
                        <input
                            type="checkbox"
                            defaultChecked={programShow}
                            onChange={(e) => setProgramShow(e.target.checked)}
                            className="toggle"
                        />
                    </li>
                    <li className="bg-gray-200 rounded-box py-2.5 px-3 text-sm text-center font-semibold flex items-center justify-between">
                        <p>নির্দেশনা</p>
                        <input
                            type="checkbox"
                            defaultChecked={noticeShow}
                            onChange={(e) => setNoticeShow(e.target.checked)}
                            className="toggle"
                        />
                    </li>
                </ul>

                {/* font */}
                <div className="bg-primary/30 rounded-box border-t border-primary py-2 mt-3 px-3 text-sm text-center font-semibold">
                    ফন্ট পছন্দ করুন
                </div>
                <Select
                    oldVal={newFont}
                    onChange={(e) => setNewFont(e.target.value)}
                    options={{
                        "font-base": "ডিফল্ট",
                        "font-noto_serif": "সেরিফ",
                        "font-noto_sans": "সান্স-সেরিফ",
                        "font-baloo": "বলু",
                        "font-tiro": "তিরো",
                        "font-roboto": "রোবোটো",
                    }}
                />
                <div className="bg-gray-200 rounded-box py-2.5 px-3 text-sm text-center font-semibold flex items-center justify-between">
                    <p>ফন্ট সাইজ</p>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                setFontSize(fontSize - 1);
                            }}
                            className="btn btn-xs rounded-box duration-300 hover:bg-primary"
                        >
                            <Plus size={10} />
                        </button>
                        <span className="text-sm font-normal">
                            {fontSize}px
                        </span>
                        <button
                            onClick={() => {
                                setFontSize(fontSize + 1);
                            }}
                            className="btn btn-xs rounded-box duration-300 hover:bg-primary"
                        >
                            <Minus size={10} />
                        </button>
                    </div>
                </div>
                <div className="bg-gray-200 rounded-box py-2.5 px-3 text-sm font-semibold mt-1">
                    <p>অপশন স্টাইল</p>
                    <div className="grid grid-cols-4 gap-1 mt-1">
                        <button
                            onClick={() => setOptionStyle(1)}
                            className={`btn w-full btn-sm border ${
                                optionStyle == 1
                                    ? "border-primary text-primary"
                                    : "border-gray-300 text-gray-500"
                            }`}
                        >
                            <Circle size={14} />
                        </button>
                        <button
                            onClick={() => setOptionStyle(2)}
                            className={`btn w-full btn-sm border ${
                                optionStyle == 2
                                    ? "border-primary text-primary"
                                    : "border-gray-300 text-gray-500"
                            }`}
                        >
                            .
                        </button>
                        <button
                            onClick={() => setOptionStyle(3)}
                            className={`btn w-full btn-sm border ${
                                optionStyle == 3
                                    ? "border-primary text-primary"
                                    : "border-gray-300 text-gray-500"
                            }`}
                        >
                            ( )
                        </button>
                        <button
                            onClick={() => setOptionStyle(4)}
                            className={`btn w-full btn-sm border ${
                                optionStyle == 4
                                    ? "border-primary text-primary"
                                    : "border-gray-300 text-gray-500"
                            }`}
                        >
                            )
                        </button>
                    </div>
                </div>

                {/* columns */}
                <div className="bg-primary/30 rounded-box border-t border-primary py-2 px-3 mt-3 text-sm text-center font-semibold my-1">
                    কলাম
                </div>
                <div className="grid grid-cols-3 gap-2 mt-1">
                    <button
                        onClick={() => setCol(1)}
                        className={`btn w-full btn-sm border ${
                            col == 1
                                ? "border-primary text-primary"
                                : "border-gray-200 text-gray-500"
                        }`}
                    >
                        <CircleSlash2 size={14} />
                    </button>
                    <button
                        onClick={() => setCol(2)}
                        className={`btn w-full btn-sm border ${
                            col == 2
                                ? "border-primary text-primary"
                                : "border-gray-200 text-gray-500"
                        }`}
                    >
                        <Columns2 size={14} />
                    </button>
                    <button
                        onClick={() => setCol(3)}
                        className={`btn w-full btn-sm border ${
                            col == 3
                                ? "border-primary text-primary"
                                : "border-gray-200 text-gray-500"
                        }`}
                    >
                        <Columns3 size={14} />
                    </button>
                </div>
                <div className="bg-gray-200 mt-1 rounded-box py-2.5 px-3 text-sm text-center font-semibold flex items-center justify-between">
                    <p>কলাম ডিভাইডার</p>
                    <input
                        type="checkbox"
                        defaultChecked={colDevider}
                        onChange={(e) => setColDevider(e.target.checked)}
                        className="toggle"
                    />
                </div>

                {/* branding */}
                <div className="bg-primary/30 rounded-box border-t border-primary py-2 px-3 mt-3 text-sm text-center font-semibold my-1">
                    ব্রান্ডিং
                </div>
                <div className="bg-gray-200 mt-1 rounded-box py-2.5 px-3 text-sm text-center font-semibold flex items-center justify-between">
                    <p>জলছাপ</p>
                    <input
                        type="checkbox"
                        defaultChecked={copyright}
                        onChange={(e) => setCopyright(e.target.checked)}
                        className="toggle"
                    />
                </div>
                {copyright && (
                    <div className="border border-dashed rounded-box p-3 mt-1">
                        <div>
                            <small>
                                স্বচ্ছতা ({" "}
                                {ENGLISH_DATE_TO_BANGLA(copyrightOpacity)}% )
                            </small>
                            <input
                                type="range"
                                min={0}
                                max="100"
                                value={copyrightOpacity}
                                onChange={(e) =>
                                    setCopyrightOpacity(e.target.value)
                                }
                                className="range range-sm"
                            />
                        </div>
                        <div>
                            <small>
                                সাইজ ( {ENGLISH_DATE_TO_BANGLA(copyrightSize)}px
                                )
                            </small>
                            <input
                                type="range"
                                min={0}
                                max="500"
                                value={copyrightSize}
                                onChange={(e) =>
                                    setCopyrightSize(e.target.value)
                                }
                                className="range range-sm"
                            />
                        </div>
                        <textarea
                            className="textarea mt-1"
                            onChange={(e) => setCopyrightText(e.target.value)}
                        >
                            {copyrightText}
                        </textarea>
                    </div>
                )}
            </div>
        </div>
    );
}
