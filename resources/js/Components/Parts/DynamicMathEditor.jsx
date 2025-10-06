import React, { useEffect } from "react";
import MathEditor from "./MathEditor";
import { Plus, Trash } from "lucide-react";

export default function DynamicMathEditor({
    qFrom,
    name,
    defaultCount = 1,
    defaultValues = [],
}) {
    // Initialize default editors on mount
    useEffect(() => {
        if (!qFrom.data[name] || qFrom.data[name].length === 0) {
            const initial = defaultValues.length
                ? defaultValues
                : Array(defaultCount).fill(""); // defaultCount number of empty fields
            qFrom.setData(name, initial);
        }
    }, []);

    const editors = qFrom.data[name] || [];

    // Add new editor
    const handleAdd = () => {
        const newEditors = [...editors, ""];
        qFrom.setData(name, newEditors);
    };

    // Delete editor
    const handleDelete = (index) => {
        const newEditors = editors.filter((_, i) => i !== index);
        qFrom.setData(name, newEditors);
    };

    // Update editor value
    const handleChange = (index, value) => {
        const newEditors = [...editors];
        newEditors[index] = value;
        qFrom.setData(name, newEditors);
    };

    return (
        <div className="space-y-2">
            {editors.map((val, idx) => (
                <div key={idx} className="flex gap-2 relative mt-4">
                    <MathEditor
                        value={val}
                        onChange={(val) => handleChange(idx, val)}
                    />
                    <button
                        type="button"
                        onClick={() => handleDelete(idx)}
                        className="btn btn-sm btn-error btn-circle absolute top-0 right-0"
                    >
                        <Trash size={14} />
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={handleAdd}
                className="btn btn-sm btn-primary mt-2"
            >
                <Plus size={14}/> Add More
            </button>
        </div>
    );
}
