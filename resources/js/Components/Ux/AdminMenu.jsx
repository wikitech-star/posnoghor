import React from "react";
import { ADMIN_SIDEBAR } from "../../Data/Sidebar";
import { Link, usePage } from "@inertiajs/react";

export default function AdminMenu() {
    const { currentRoute } = usePage().props;
    return (
        <div>
            {ADMIN_SIDEBAR.map((item, index) =>
                item.isTitle ? (
                    <h4
                        key={index}
                        className="py-1 px-5 mt-2 text-sm text-white/70 font-semibold"
                    >
                        {item.title}
                    </h4>
                ) : (
                    <Link
                        key={index}
                        href={item.link}
                        className={`flex px-5 items-center gap-3 py-3 hover:bg-white/10 text-white ${
                            item.active.includes(currentRoute)
                                ? "bg-white/10"
                                : ""
                        }`}
                    >
                        <div
                            className={`w-7 h-7 rounded-sm flex-center text-neutral text-sm ${
                                item.active.includes(currentRoute)
                                    ? "bg-primary"
                                    : "bg-white"
                            }`}
                        >
                            <item.icon size={14} />
                        </div>
                        {item.name}
                    </Link>
                )
            )}
        </div>
    );
}
