import React from "react";
import Navbar from "../Ui/Navbar";
import { Head, usePage } from "@inertiajs/react";
import Global from "./Global";

export default function GuestLayout({ title, children }) {
    return (
        <Global title={title}>
            <div>
                <Navbar />
                {children}
            </div>
        </Global>
    );
}
