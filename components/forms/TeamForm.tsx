"use client";

import React, { useState } from "react";

import Input from "../ui/Input";
import Button from "../ui/Button";

import { Team } from "@/utils/logics/usetournamentinfo";

type TeamFormProps = {
    teams: Team[];

    addTeam: (
        name: string
    ) => void;

    removeTeam: (
        index: number
    ) => void;

    teamCount: number;
};

function TeamForm({
    teams,
    addTeam,
    removeTeam,
    teamCount,
}: TeamFormProps) {

    const [current, setCurrent] =
        useState("");

    // ---------------- ADD TEAM ----------------
    const handleAddTeam = () => {

        addTeam(current);

        setCurrent("");
    };

    // ---------------- KEYDOWN ----------------
    const handleKeyDown = (
        e: React.KeyboardEvent
    ) => {

        if (e.key === "Enter") {

            e.preventDefault();

            handleAddTeam();
        }
    };

    return (
        <div className="flex flex-col gap-4">

            {/* TEAMS */}
            <div className="flex flex-wrap gap-2">

                {
                    teams.map(
                        (
                            team,
                            index
                        ) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F1115] border border-gray-700 text-sm"
                            >

                                <span className="text-gray-200">
                                    {
                                        team.name
                                    }
                                </span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        removeTeam(
                                            index
                                        )
                                    }
                                    className="text-gray-400 hover:text-red-400 transition text-xs"
                                >
                                    ✕
                                </button>
                            </div>
                        )
                    )
                }
            </div>

            {/* INPUT */}
            <div className="flex gap-2 items-center">

                <Input
                    placeholder="Enter team name"
                    value={current}
                    onChange={(e) =>
                        setCurrent(
                            e.target.value
                        )
                    }
                    onKeyDown={
                        handleKeyDown
                    }
                />

                <Button
                    type="button"
                    onClick={
                        handleAddTeam
                    }
                    variant="secondary"
                    disabled={
                        !current.trim() ||
                        teams.length >=
                        teamCount
                    }
                >
                    Add
                </Button>
            </div>

            {/* FOOTER */}
            <p className="text-xs text-gray-500">

                {
                    teams.length
                }
                /
                {
                    teamCount
                } teams added
            </p>
        </div>
    );
}

export default TeamForm;