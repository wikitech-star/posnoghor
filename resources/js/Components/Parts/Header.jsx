import { Head, usePage } from "@inertiajs/react";
import React from "react";

export default function Header({ title }) {
    const { appName } = usePage().props;

    const pageTitle = (title ?? "পেজ টাইটেল") + " - " + appName;
    return (
        <Head>
            <title>{pageTitle}</title>
        </Head>
    );
}
