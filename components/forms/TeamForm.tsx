"use client";

import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

type TeamFormProps = {
    teamLimit?: number;
};

function TeamForm({ teamLimit = 32 }: TeamFormProps) {
    const [teams, setTeams] = useState<string[]>([]);
    const [current, setCurrent] = useState("");

    const addTeam = () => {
        const trimmed = current.trim();

        if (!trimmed) return;
        if (teams.includes(trimmed)) return;
        if (teams.length >= teamLimit) return;

        setTeams([...teams, trimmed]);
        setCurrent("");
    };

    const removeTeam = (index: number) => {
        setTeams(teams.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTeam();
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
                {teams.map((team, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F1115] border border-gray-700 text-sm"
                    >
                        <span className="text-gray-200">{team}</span>

                        <button
                            type="button"
                            onClick={() => removeTeam(index)}
                            className="text-gray-400 hover:text-red-400 transition text-xs"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            {/* Input Row */}
            <div className="flex gap-2 items-center">
                <Input
                    placeholder="Enter team name"
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <Button
                    type="button"
                    onClick={addTeam}
                    variant="secondary"
                    disabled={
                        !current.trim() || teams.length >= teamLimit
                    }
                >
                    Add
                </Button>
            </div>

            {/* Footer Info */}
            <p className="text-xs text-gray-500">
                {teams.length}/{teamLimit} teams added
            </p>
        </div>
    );
}

export default TeamForm;