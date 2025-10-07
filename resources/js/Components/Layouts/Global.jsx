import { usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "../Parts/Header";

export default function Global({ title, children }) {
    const { flash, auth, appName, appurl } = usePage().props;

    // for flash message
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    // manage clipboard
    useEffect(() => {
        const handleCopy = (e) => {
            e.preventDefault();

            // user যেই text select করেছে সেটা নেওয়া
            const selectedText = window.getSelection().toString().trim();

            if (!selectedText) return; // কিছু select না করলে ignore

            // Default custom message (Bangla warning + website link)
            let customText = "";

            // Admin বা editor হলে original text allow করা
            if (auth && (auth.role === "admin" || auth.role === "editor")) {
                customText = selectedText;
            } else {
                customText = `দুঃখিত, এই লিখা কপি করা অনুমোদিত নেই। দয়া করে এই ওয়েবসাইট থেকে কন্টেন্ট দেখুন: ${appurl} - ${appName}`;
            }

            // Clipboard-এ set করা
            const setClipboard = async () => {
                try {
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        await navigator.clipboard.writeText(customText);
                    } else if (e.clipboardData) {
                        e.clipboardData.setData("text/plain", customText);
                    }
                    console.log("Copied text replaced with:", customText);

                    // Optional: user alert (comment/uncomment as needed)
                    // if (!(auth.role === "admin" || auth.role === "editor")) {
                    //     alert(customText);
                    // }
                } catch (err) {
                    console.error("Clipboard write failed:", err);
                }
            };

            setClipboard();
        };

        document.addEventListener("copy", handleCopy);

        return () => {
            document.removeEventListener("copy", handleCopy);
        };
    }, []);

    return (
        <div>
            <Header title={title} />
            {children}
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
}
