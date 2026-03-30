"use client";

import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { motion } from "framer-motion";
import { Close } from "@mui/icons-material";

type CreateMatchFormProps = {
    onClose: () => void;
};

function CreateMatchForm({ onClose }: CreateMatchFormProps) {
    const [teamA, setTeamA] = useState("");
    const [teamB, setTeamB] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [status, setStatus] = useState<"live" | "finished" | "upcoming">("upcoming");
    const [scoreA, setScoreA] = useState(0);
    const [scoreB, setScoreB] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const matchData = {
            teamA,
            teamB,
            location,
            date: `${date} ${time}`,
            status,
            scoreA,
            scoreB,
        };

        console.log("New Match:", matchData);

        onClose();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="fixed inset-0 top-16.5 bg-black/60 z-50 flex justify-end"
            onClick={onClose}
        >
            <motion.aside
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 200, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0F172A] sm:w-[540px] w-full h-full border-l border-gray-800 rounded-tl-2xl rounded-bl-2xl p-6 overflow-y-auto flex flex-col"
            >
                {/* HEADER */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold flex items-center justify-between">
                        Create Match

                        <button
                            onClick={onClose}
                            type="button"
                            className="p-2 rounded-lg hover:bg-white/5 transition"
                        >
                            <Close />
                        </button>
                    </h2>

                    <p className="text-sm text-gray-400 mt-1">
                        Set up match details, teams, and schedule.
                    </p>
                </div>

                {/* TEAMS */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <Input
                        label="Team A"
                        placeholder="Enter Team A"
                        value={teamA}
                        onChange={(e) => setTeamA(e.target.value)}
                    />

                    <Input
                        label="Team B"
                        placeholder="Enter Team B"
                        value={teamB}
                        onChange={(e) => setTeamB(e.target.value)}
                    />
                </div>

                {/* LOCATION */}
                <div className="mb-6">
                    <Input
                        label="Match Location"
                        placeholder="e.g. UNEC Stadium"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                {/* DATE & TIME */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <Input
                        label="Match Date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <Input
                        label="Kick-off Time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>

                {/* STATUS */}
                <div className="mb-6">
                    <label className="text-sm text-gray-300 mb-1 block">
                        Match Status
                    </label>
                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value as "live" | "finished" | "upcoming")
                        }
                        className="w-full bg-[#0F1115] border border-gray-700 rounded-lg p-2 text-sm"
                    >
                        <option value="upcoming">Upcoming</option>
                        <option value="live">Live</option>
                        <option value="finished">Finished</option>
                    </select>
                </div>

                {/* SCORES */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <Input
                        label={`${teamA || "Team A"} Score`}
                        type="number"
                        value={scoreA}
                        onChange={(e) => setScoreA(Number(e.target.value))}
                    />

                    <Input
                        label={`${teamB || "Team B"} Score`}
                        type="number"
                        value={scoreB}
                        onChange={(e) => setScoreB(Number(e.target.value))}
                    />
                </div>

                {/* FOOTER */}
                <div className="mt-auto flex gap-3 pt-4 border-t border-gray-800">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button type="submit" variant="primary">
                        Create Match
                    </Button>
                </div>
            </motion.aside>
        </form>
    );
}

export default CreateMatchForm;