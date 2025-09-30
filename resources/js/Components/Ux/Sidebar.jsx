import React, { useState } from "react";
import Logo from "../Parts/Logo";
import { usePage } from "@inertiajs/react";
import AdminMenu from "./AdminMenu";
import { X } from "lucide-react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const { auth } = usePage().props;

    return (
        <div
            className={`h-screen w-0 bg-neutral fixed top-0 left-0 lg:static z-[100] overflow-y-auto duration-300 ${
                sidebarOpen ? "w-[300px]" : "w-0"
            }`}
        >
            {/* header */}
            <div className="flex-between h-[70px] sticky top-0 bg-neutral px-5 border-b border-b-white/20">
                <Logo />

                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="btn btn-sm btn-circle btn-error lg:hidden"
                >
                    <X size={13} />
                </button>
            </div>

            {/* menus */}
            {auth.role === "admin" && <AdminMenu />}
        </div>
    );
}
