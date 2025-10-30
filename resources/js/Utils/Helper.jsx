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
function ENGLISH_DATE_TO_BANGLA(dateString, fulldate = false) {
    if (!dateString) return "";

    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    const banglaMonthsFull = [
        "জানুয়ারি",
        "ফেব্রুয়ারি",
        "মার্চ",
        "এপ্রিল",
        "মে",
        "জুন",
        "জুলাই",
        "আগস্ট",
        "সেপ্টেম্বর",
        "অক্টোবর",
        "নভেম্বর",
        "ডিসেম্বর",
    ];

    try {
        // Laravel timestamp format handle করা
        const date = new Date(dateString);
        if (isNaN(date)) return "";

        const day = date.getDate();
        const month = banglaMonthsFull[date.getMonth()];
        const year = date.getFullYear();

        // Time চাইলে (fulldate = true)
        let formatted = `${day} ${month} ${year}`;
        if (fulldate) {
            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");
            formatted += `, ${hours}:${minutes}`;
        }

        // সংখ্যাগুলো বাংলায় রূপান্তর করা
        return formatted
            .split("")
            .map((char) =>
                /\d/.test(char) ? banglaDigits[parseInt(char, 10)] : char
            )
            .join("");
    } catch (e) {
        return "";
    }
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
