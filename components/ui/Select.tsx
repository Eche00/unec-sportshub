
"use client";

import React from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    options: {
        label: string;
        value: string;
    }[];
    placeholder?: string;
};

function Select({
    label,
    options,
    placeholder = "Select an option",
    className = "",
    id,
    ...props
}: SelectProps) {
    const selectId = id || props.name;

    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label
                    htmlFor={selectId}
                    className="text-sm font-medium text-[var(--foreground)]"
                >
                    {label}
                </label>
            )}

            <div className="relative w-full">
                <select
                    {...props}
                    id={selectId}
                    className={`
                        w-full
                        appearance-none
                        bg-[#141414]
                        border border-[var(--border)]
                        rounded-xl
                        px-3 py-[10px] pr-10
                        text-sm
                        text-[var(--foreground)]
                        outline-none
                        transition-all duration-200
                        focus:border-[var(--primary)]
                        focus:ring-2 focus:ring-[var(--primary)]/15
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                        ${className}
                    `}
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>

                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            className="bg-[#141414] text-white"
                        >
                            {option.label}
                        </option>
                    ))}
                </select>

                <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--muted)]"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </div>
        </div>
    );
}

export default Select;
