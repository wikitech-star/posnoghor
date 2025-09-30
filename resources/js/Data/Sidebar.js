import { Book, BookOpenText, FileQuestionMark, Home, MailWarning, Settings, University } from "lucide-react";

const ADMIN_SIDEBAR = [
    {
        title: "সার্বিক চিত্র",
        isTitle: true,
    },
    {
        name: "ড্যাশবোর্ড",
        icon: Home,
        link: route("ux.dashboard"),
        active: ["ux.dashboard"],
    },
    {
        title: "স্কুল",
        isTitle: true,
    },
    {
        name: "শ্রেনী ম্যানেজমেন্ট",
        icon: University,
        link: route("ux.group.class"),
        active: ["ux.group.class"],
    },
    {
        name: "সকল বিষয়",
        icon: Book,
        link: route("ux.subjects"),
        active: ["ux.subjects"],
    },
    {
        name: "সকল অধ্যায়",
        icon: BookOpenText,
        link: route("ux.lassion"),
        active: ["ux.lassion"],
    },
    {
        name: "প্রশ্নের ধরন",
        icon: FileQuestionMark,
        link: route("ux.question.type"),
        active: ["ux.question.type"],
    },
    {
        title: "সেটিংস",
        isTitle: true,
    },
    {
        name: "সাইট সেটিংস",
        icon: Settings,
        link: route("ux.site.setting"),
        active: ["ux.site.setting"],
    },
    {
        name: "ইমেইল সেটিংস",
        icon: MailWarning,
        link: route("ux.mail.setting"),
        active: ["ux.mail.setting"],
    },
];

export { ADMIN_SIDEBAR };
