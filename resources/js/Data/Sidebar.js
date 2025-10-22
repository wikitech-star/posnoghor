import {
    BadgePlus,
    BadgeQuestionMark,
    Book,
    BookOpenText,
    FileQuestionMark,
    Home,
    Key,
    MailWarning,
    Plus,
    Settings,
    University,
} from "lucide-react";

const ADMIN_SIDEBAR = [
    // for all
    {
        title: "সার্বিক চিত্র",
        isTitle: true,
        role: ["admin", "editor", "support", "teacher"],
    },
    {
        name: "ড্যাশবোর্ড",
        icon: Home,
        link: route("ux.dashboard"),
        active: ["ux.dashboard"],
        role: ["admin", "editor", "support", "teacher"],
        pro: false,
    },

    // for amin
    {
        title: "স্কুল",
        isTitle: true,
        role: ["admin", "editor", "support"],
    },
    {
        name: "শ্রেনী ম্যানেজমেন্ট",
        icon: University,
        link: route("ux.group.class"),
        active: ["ux.group.class"],
        role: ["admin", "editor", "support"],
        pro: false,
        pro_link: route("home"),
    },
    {
        name: "সকল বিষয়",
        icon: Book,
        link: route("ux.subjects"),
        active: ["ux.subjects"],
        role: ["admin", "editor", "support"],
        pro: false,
    },
    {
        name: "সকল অধ্যায়",
        icon: BookOpenText,
        link: route("ux.lassion"),
        active: ["ux.lassion"],
        role: ["admin", "editor", "support"],
        pro: false,
    },
    {
        name: "প্রশ্নের ধরন",
        icon: FileQuestionMark,
        link: route("ux.question.type"),
        active: ["ux.question.type"],
        role: ["admin", "editor", "support"],
        pro: false,
    },
    {
        title: "ব্যাংক",
        isTitle: true,
        role: ["admin", "editor", "support"],
    },
    {
        name: "সকল প্রশ্ন",
        icon: BadgeQuestionMark,
        link: route("ux.question.all"),
        active: ["ux.question.all"],
        role: ["admin", "editor", "support"],
        pro: false,
    },
    {
        name: "নতুন প্রশ্ন",
        icon: BadgePlus,
        link: route("ux.question.add"),
        active: ["ux.question.add"],
        role: ["admin", "editor", "support"],
        pro: false,
    },
    {
        title: "সেটিংস",
        isTitle: true,
        role: ["admin"],
    },
    {
        name: "সাইট সেটিংস",
        icon: Settings,
        link: route("ux.site.setting"),
        active: ["ux.site.setting"],
        role: ["admin"],
        pro: false,
    },
    {
        name: "ইমেইল সেটিংস",
        icon: MailWarning,
        link: route("ux.mail.setting"),
        active: ["ux.mail.setting"],
        role: ["admin"],
        pro: false,
    },
    {
        name: "গুগল সেটিংস",
        icon: Key,
        link: route("ux.goolge.auth.setting"),
        active: ["ux.goolge.auth.setting"],
        role: ["admin"],
        pro: false,
    },

    // for teahcer
    {
        name: "১ ক্লিকে প্রশ্ন তৈরী",
        icon: Plus,
        link: route("g.create.new.questions"),
        active: ["g.create.new.questions", "g.load.questions"],
        role: ["teacher", "admin", "editor"],
        pro: false,
    },
];

export { ADMIN_SIDEBAR };
