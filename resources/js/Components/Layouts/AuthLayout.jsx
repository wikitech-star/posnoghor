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
            <div className="flex h-screen overflow-hidden">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                <div className="flex flex-col flex-1 bg-gray-100 w-full h-screen overflow-auto">
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />
                    <div className="p-5">{children}</div>
                </div>
            </div>
        </Global>
    );
}
