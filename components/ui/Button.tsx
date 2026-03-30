"use client";

import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
};

function Button({
    children,
    variant = "primary",
    type = "button",
    className = "",
    ...props
}: ButtonProps) {
    const base =
        "px-5 py-2 rounded-2xl font-semibold transition w-fit cursor-pointer text-nowrap";

    const variants = {
        primary:
            "bg-[#3B82F6] text-black hover:opacity-90",
        secondary:
            "border border-gray-600 text-white hover:border-white",
    };

    const disabledStyles = props.disabled
        ? "opacity-50 cursor-not-allowed hover:opacity-50"
        : "";

    return (
        <button
            type={type}
            {...props}
            className={`${base} ${variants[variant]} ${disabledStyles} ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;