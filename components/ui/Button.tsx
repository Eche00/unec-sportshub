"use client";

import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "secondaryRed";
};

function Button({
    children,
    variant = "primary",
    type = "button",
    className = "",
    disabled,
    ...props
}: ButtonProps) {
    const base =
        "w-full px-5 py-3 rounded-xl text-[16px] font-medium transition-all duration-200 w-fit cursor-pointer text-nowrap";

    const variants = {
        primary:
            "bg-[var(--primary)] text-white border border-[var(--primary)] hover:opacity-90",

        secondary:
            "bg-transparent border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white",

        secondaryRed:
            "bg-red-600 border border-red-600 text-white hover:bg-red-700 hover:border-red-700",
    };

    const disabledStyles = disabled
        ? "opacity-50 cursor-not-allowed pointer-events-none"
        : "";

    return (
        <button
            type={type}
            disabled={disabled}
            {...props}
            className={`${base} ${variants[variant]} ${disabledStyles} ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;