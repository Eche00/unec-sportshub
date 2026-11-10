"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

type ColorTheme =
    | "orange"
    | "blue"
    | "green"
    | "purple"
    | "red";

interface ColorThemeContextType {
    colorTheme: ColorTheme;
    setColorTheme: (theme: ColorTheme) => void;
}

const ColorThemeContext =
    createContext<ColorThemeContextType | undefined>(
        undefined
    );

export function ColorThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [colorTheme, setColorTheme] =
        useState<ColorTheme>("orange");

    useEffect(() => {
        const saved = localStorage.getItem("color-theme");

        const validThemes: ColorTheme[] = [
            "orange", "blue", "green", "purple", "red",
        ];

        if (saved && validThemes.includes(saved as ColorTheme)) {
            setColorTheme(saved as ColorTheme);
        }
    }, []);

    useEffect(() => {
        document.documentElement.dataset.colorTheme =
            colorTheme;

        localStorage.setItem("color-theme", colorTheme);
    }, [colorTheme]);

    return (
        <ColorThemeContext.Provider
            value={{ colorTheme, setColorTheme }}
        >
            {children}
        </ColorThemeContext.Provider>
    );
}

export function useColorTheme() {
    const context = useContext(ColorThemeContext);

    if (!context) {
        throw new Error(
            "useColorTheme must be used within ColorThemeProvider"
        );
    }

    return context;
}