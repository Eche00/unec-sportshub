"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../ui/Button";
import Input from "../ui/Input";

type MatchStatus = "live" | "finished" | "upcoming";

type MatchEventType = "goal" | "yellow" | "red" | "commentary";

type MatchEvent = {
    id: string;
    minute?: number;
    type: MatchEventType;
    player?: string;
    team?: "A" | "B";
    text?: string;
};

type Match = {
    id: string;
    teamA: string;
    teamB: string;
    scoreA: number;
    scoreB: number;
    status: MatchStatus;
};

type ManageMatchesProps = {
    matchId: string;
    onClose: () => void;
};

export default function ManageMatches({ matchId, onClose }: ManageMatchesProps) {
    const [match, setMatch] = useState<Match>({
        id: matchId,
        teamA: "Team A",
        teamB: "Team B",
        scoreA: 2,
        scoreB: 1,
        status: "live",
    });

    const [events, setEvents] = useState<MatchEvent[]>([]);

    const [newEvent, setNewEvent] = useState<Partial<MatchEvent>>({
        type: "goal",
    });

    // ESC close
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    // Lock scroll
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleChange = <K extends keyof Match>(field: K, value: Match[K]) => {
        setMatch((prev) => ({ ...prev, [field]: value }));
    };

    // ✅ ADD EVENT
    const addEvent = () => {
        if (!newEvent.type) return;

        const event: MatchEvent = {
            id: Date.now().toString(),
            minute: newEvent.type === "commentary" ? undefined : newEvent.minute,
            type: newEvent.type,
            player: newEvent.player,
            team: newEvent.team,
            text: newEvent.text,
        };

        // 🔥 Auto update score
        if (event.type === "goal") {
            if (event.team === "A") {
                setMatch((prev) => ({ ...prev, scoreA: prev.scoreA + 1 }));
            }
            if (event.team === "B") {
                setMatch((prev) => ({ ...prev, scoreB: prev.scoreB + 1 }));
            }
        }

        setEvents((prev) => [event, ...prev]);

        // reset
        setNewEvent({ type: "goal" });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Match:", match);
        console.log("Events:", events);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-end" onClick={onClose}>
            <motion.aside
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0F172A] sm:w-[650px] mt-16 w-full h-full border-l border-gray-800 rounded-tl-2xl rounded-bl-2xl p-5 sm:p-6 overflow-y-auto flex flex-col"
            >
                {/* HEADER */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-lg font-semibold">Manage Match</h1>
                    <button onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>

                {/* TEAMS */}
                <div className="flex justify-between text-gray-300 mb-4">
                    <span>{match.teamA}</span>
                    <span>VS</span>
                    <span>{match.teamB}</span>
                </div>

                {/* SCORE */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <Input
                        type="number"
                        label={match.teamA}
                        value={match.scoreA}
                        onChange={(e) =>
                            handleChange("scoreA", Number(e.target.value))
                        }
                    />
                    <Input
                        type="number"
                        label={match.teamB}
                        value={match.scoreB}
                        onChange={(e) =>
                            handleChange("scoreB", Number(e.target.value))
                        }
                    />
                </div>

                {/* STATUS */}
                <select
                    value={match.status}
                    onChange={(e) =>
                        handleChange("status", e.target.value as MatchStatus)
                    }
                    className="p-2 bg-[#0B0F19] border border-gray-700 rounded mb-6"
                >
                    <option value="live">Live</option>
                    <option value="finished">Finished</option>
                    <option value="upcoming">Upcoming</option>
                </select>

                {/* ADD EVENT */}
                <div className="border-t border-gray-800 pt-4 mb-4">
                    <h2 className="text-sm mb-3 text-gray-400">Add Event</h2>

                    <div className="grid gap-3">
                        {/* TYPE */}
                        <select
                            value={newEvent.type}
                            onChange={(e) =>
                                setNewEvent((prev) => ({
                                    ...prev,
                                    type: e.target.value as MatchEventType,
                                }))
                            }
                            className="p-2 bg-[#0B0F19] border border-gray-700 rounded"
                        >
                            <option value="goal">Goal</option>
                            <option value="yellow">Yellow Card</option>
                            <option value="red">Red Card</option>
                            <option value="commentary">Commentary</option>
                        </select>

                        {/* MINUTE (not needed for commentary) */}
                        {newEvent.type !== "commentary" && (
                            <Input
                                type="number"
                                label="Minute"
                                placeholder="e.g 45"
                                onChange={(e) =>
                                    setNewEvent((prev) => ({
                                        ...prev,
                                        minute: Number(e.target.value),
                                    }))
                                }
                            />
                        )}

                        {/* TEAM */}
                        {newEvent.type !== "commentary" && (
                            <select
                                onChange={(e) =>
                                    setNewEvent((prev) => ({
                                        ...prev,
                                        team: e.target.value as "A" | "B",
                                    }))
                                }
                                className="p-2 bg-[#0B0F19] border border-gray-700 rounded"
                            >
                                <option value="">Select Team</option>
                                <option value="A">{match.teamA}</option>
                                <option value="B">{match.teamB}</option>
                            </select>
                        )}

                        {/* PLAYER */}
                        {(newEvent.type === "goal" ||
                            newEvent.type === "yellow" ||
                            newEvent.type === "red") && (
                                <Input
                                    label="Player"
                                    placeholder="Player Name"
                                    onChange={(e) =>
                                        setNewEvent((prev) => ({
                                            ...prev,
                                            player: e.target.value,
                                        }))
                                    }
                                />
                            )}

                        {/* COMMENTARY */}
                        {newEvent.type === "commentary" && (
                            <textarea
                                placeholder="Commentator says..."
                                onChange={(e) =>
                                    setNewEvent((prev) => ({
                                        ...prev,
                                        text: e.target.value,
                                    }))
                                }
                                className="p-2 bg-[#0B0F19] border border-gray-700 rounded"
                            />
                        )}

                        <Button onClick={addEvent}>
                            Add Event
                        </Button>
                    </div>
                </div>

                {/* EVENTS LIST */}
                <div className="flex flex-col gap-2 mb-6">
                    {events.map((e) => (
                        <div
                            key={e.id}
                            className="text-sm bg-[#0B0F19] p-3 rounded border border-gray-700"
                        >
                            {e.minute && <strong>{e.minute}'</strong>}{" "}
                            {e.type === "goal" &&
                                `⚽ ${e.player} (${e.team === "A" ? match.teamA : match.teamB})`}
                            {e.type === "yellow" && `🟨 ${e.player}`}
                            {e.type === "red" && `🟥 ${e.player}`}
                            {e.type === "commentary" && `💬 ${e.text}`}
                        </div>
                    ))}
                </div>

                {/* SAVE */}
                <div className="w-full flex items-end justify-end py-3 border-t-[0.1px] border-gray-400">
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Match
                    </Button>
                </div>

            </motion.aside>
        </div>
    );
}