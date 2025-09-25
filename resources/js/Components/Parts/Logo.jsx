import { Link, usePage } from "@inertiajs/react";
import React from "react";

export default function Logo({ className }) {
    const { appName } = usePage().props;
    return (
        <Link href="/">
            <img
                src="/uploads/logo.svg"
                className={`h-[30px] w-auto ${className}`}
                alt={`${appName} - Logo`}
            />
        </Link>
    );
}
