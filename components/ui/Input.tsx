"use client";

import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
};

function Input({ label, className = "", ...props }: InputProps) {
    return (
        <div className="flex flex-col gap-1 w-full">
            {label && (
                <label className="text-sm text-gray-300">
                    {label}
                </label>
            )}

            <input
                {...props}
                className={`w-full bg-[#0F1115] border border-gray-700 rounded-lg p-2 text-sm outline-none focus:border-blue-500 transition ${className}`}
            />
        </div>
    );
}

export default Input;