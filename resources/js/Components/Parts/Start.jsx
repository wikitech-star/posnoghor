import { Star } from "lucide-react";
import React from "react";

export default function Start({ start = 0, max = 5, hidden = true }) {
    const visibleStars = hidden ? start : max;

    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: visibleStars }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-box w-6 h-6 flex justify-center items-center bg-neutral text-primary"
                >
                    <Star size={13} />
                </div>
            ))}
        </div>
    );
}
