import { Head, usePage } from "@inertiajs/react";
import React, { use, useEffect, useState } from "react";
import Global from "./Global";
import Sidebar from "../Ux/Sidebar";
import Header from "../Ux/Header";

export default function AuthLayout({ title, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    useEffect(() => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false); // mobile এ ডিফল্ট বন্ধ
        }
    }, []);
    return (
        <Global title={title}>
            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                <div className="flex flex-col w-full bg-gray-100 h-[500px] overflow-y-hidden">
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />
                    <div className="p-5 overflow-y-auto h-full">{children}</div>
                </div>
            </div>
        </Global>
    );
}
