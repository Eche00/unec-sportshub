"use client";

import { useTheme } from "next-themes";
import { useColorTheme } from
    "@/components/providers/color-theme-provider";

export function AppearanceSettings() {
    const { theme, setTheme } = useTheme();

    const { colorTheme, setColorTheme } =
        useColorTheme();

    const themes = [
        { name: "Orange", value: "orange" },
        { name: "Blue", value: "blue" },
        { name: "Green", value: "green" },
        { name: "Purple", value: "purple" },
        { name: "Red", value: "red" },
    ] as const;

    return (
        <div className="space-y-6">

            <section>
                <h3>Appearance</h3>

                <select
                    value={theme ?? "system"}
                    onChange={(e) => setTheme(e.target.value)}
                >
                    {/* <option value="light">Light Mode</option> */}
                    <option value="dark">Dark Mode</option>
                    {/* <option value="system">System Default</option> */}
                </select>
            </section>

            <section>
                <h3>Color Theme</h3>

                <div className="flex gap-3 flex-wrap">
                    {themes.map((item) => (
                        <button
                            key={item.value}
                            onClick={() =>
                                setColorTheme(item.value)
                            }
                            className={`rounded-lg border p-3 ${colorTheme === item.value
                                ? "border-[var(--primary)]"
                                : "border-[var(--border)]"
                                }`}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </section>

        </div>
    );
}