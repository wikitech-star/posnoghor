import { Book, Home, University } from "lucide-react";

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
];

export { ADMIN_SIDEBAR };
