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
    ...props
}: ButtonProps) {
    const base =
        "px-5 py-1.5 rounded-md text-sm font-semibold transition w-fit cursor-pointer text-nowrap";

    const variants = {
        primary:
            "bg-[#FB831C] text-white hover:opacity-90",
        secondary:
            "border border-gray-600 text-white hover:border-white",
        secondaryRed:
            "border border-gray-600 bg-red-600 text-white hover:bg-red-500",
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