import { usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "../Parts/Header";

export default function Global({ title, children }) {
    const { flash } = usePage().props;
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);
    return (
        <div>
            <Header title={title} />
            {children}
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
}
