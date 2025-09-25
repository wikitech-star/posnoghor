import { Home, University } from "lucide-react";

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
        name: "ক্লাস ম্যানেজমেন্ট",
        icon: University,
        link: route("ux.group.class"),
        active: ["ux.group.class"],
    },
];

export { ADMIN_SIDEBAR };
