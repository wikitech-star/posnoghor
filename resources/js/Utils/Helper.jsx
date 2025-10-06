// Utility function to convert English digits to Bangla digits
function ENGLISH_TO_BANGLA(number) {
    if (number === null || number === undefined) return number;
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return number
        .toString()
        .split("")
        .map((digit) =>
            /\d/.test(digit) ? banglaDigits[parseInt(digit, 10)] : digit
        )
        .join("");
}

// english date to bangla date
function ENGLISH_DATE_TO_BANGLA(dateString) {
    if (!dateString) return "";

    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    const banglaMonths = {
        Jan: "জানু",
        Feb: "ফেব",
        Mar: "মার্চ",
        Apr: "এপ্রিল",
        May: "মে",
        Jun: "জুন",
        Jul: "জুলাই",
        Aug: "আগ",
        Sep: "সেপ্টে",
        Oct: "অক্টো",
        Nov: "নভে",
        Dec: "ডিসে",
    };

    return dateString
        .toString()
        .split("")
        .map((char) =>
            /\d/.test(char) ? banglaDigits[parseInt(char, 10)] : char
        )
        .join("")
        .replace(
            /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/g,
            (m) => banglaMonths[m]
        );
}

function BANGLA_INDEX(index) {
    const banglaLetters = [
        "ক",
        "খ",
        "গ",
        "ঘ",
        "ঙ",
        "চ",
        "ছ",
        "জ",
        "ঝ",
        "ঞ",
        "ট",
        "ঠ",
        "ড",
        "ঢ",
        "ণ",
        "ত",
        "থ",
        "দ",
        "ধ",
        "ন",
        "প",
        "ফ",
        "ব",
        "ভ",
        "ম",
        "য",
        "র",
        "ল",
        "শ",
        "ষ",
        "স",
        "হ",
    ];

    const totalLetters = banglaLetters.length;

    if (index < totalLetters) {
        return banglaLetters[index];
    } else {
        const quotient = Math.floor(index / totalLetters); // 1,2,3...
        const remainder = index % totalLetters;
        return `${quotient}${banglaLetters[remainder]}`;
    }
}

export { ENGLISH_TO_BANGLA, ENGLISH_DATE_TO_BANGLA, BANGLA_INDEX };
