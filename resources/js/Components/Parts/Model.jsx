import { X } from "lucide-react";
import React from "react";

export default function Model({
    model,
    setModel,
    title,
    modelClassName,
    children,
}) {
    return (
        <dialog className="modal modal-bottom sm:modal-middle" open={model}>
            <div className={`modal-box ${modelClassName}`}>
                <div className="flex-between mb-4 border-b pb-4 border-base-content/10">
                    <h1 className="text-neutral font-semibold">{title}</h1>
                    <button
                        onClick={() => setModel(false)}
                        className="btn btn-circle btn-xs btn-error"
                    >
                        <X size={12} />
                    </button>
                </div>
                {children}
            </div>
        </dialog>
    );
}
