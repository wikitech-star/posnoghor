import React, { useState } from "react";
import Logo from "../Parts/Logo";
import { X } from "lucide-react";
import { usePage } from "@inertiajs/react";
import AdminMenu from "./AdminMenu";

export default function Sidebar({ sidebarOpen }) {
    const { auth } = usePage().props;

    return (
        <div
            className={`h-screen w-0 bg-neutral overflow-y-auto duration-300 ${
                sidebarOpen ? "w-[300px]" : "w-0"
            }`}
        >
            {/* header */}
            <div className="flex-between h-[70px] sticky top-0 bg-neutral px-5 border-b border-b-white/20">
                <Logo />
            </div>

            {/* menus */}
            {auth.role === "admin" && <AdminMenu />}
        </div>
    );
}
