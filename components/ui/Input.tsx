"use client";

import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
};

function Input({
    label,
    className = "",
    id,
    ...props
}: InputProps) {
    const inputId = id || props.name;

    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className="text-sm font-medium text-[var(--foreground)]"
                >
                    {label}
                </label>
            )}

            <input
                {...props}
                id={inputId}
                className={`
                    w-full
                    bg-[#141414]
                    border border-[var(--border)]
                    rounded-xl
                    px-3 py-[10px]
                    text-sm
                    text-[var(--foreground)]
                    placeholder:text-[var(--muted)]
                    outline-none
                    transition-all duration-200
                    focus:border-[var(--primary)]
                    focus:ring-2 focus:ring-[var(--primary)]/15
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    ${className}
                `}
            />
        </div>
    );
}

export default Input;