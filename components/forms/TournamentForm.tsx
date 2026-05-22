"use client";

import React from "react";

import Input from "../ui/Input";
import Button from "../ui/Button";

import { motion } from "framer-motion";

import TeamForm from "./TeamForm";

import { Close } from "@mui/icons-material";

import useTournamentInfo from "@/utils/logics/usetournamentinfo";

function TournamentForm({
    onClose,
}: {
    onClose: () => void;
}) {

    const {

        createTournament,
        creating,

        name,
        setName,

        location,
        setLocation,

        format,
        setFormat,

        teamCount,
        setTeamCount,

        autoMatchups,
        setAutoMatchups,

        startDate,
        setStartDate,

        endDate,
        setEndDate,

        teams,
        addTeam,
        removeTeam,
    } = useTournamentInfo();

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        const res =
            await createTournament();

        if (res) {
            onClose();
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="fixed inset-0 top-16.5 bg-black/60 z-50 flex justify-end"
            onClick={() => {
                if (!creating) {
                    onClose();
                }
            }}
        >
            <motion.aside
                initial={{
                    x: 200,
                    opacity: 0,
                }}
                animate={{
                    x: 0,
                    opacity: 1,
                }}
                exit={{
                    x: 200,
                    opacity: 0,
                }}
                transition={{
                    duration: 0.3,
                }}
                onClick={(e) =>
                    e.stopPropagation()
                }
                className="bg-[#0F172A] sm:w-[540px] w-[100%] h-full border-l border-gray-800 rounded-tl-2xl rounded-bl-2xl p-6 overflow-y-auto flex flex-col"
            >

                {/* Header */}
                <div className="mb-6">

                    <h2 className="text-2xl font-semibold flex items-center justify-between">

                        Create Tournament

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={creating}
                            className="p-2 rounded-lg hover:bg-white/5 transition cursor-pointer disabled:opacity-50"
                        >
                            <Close />
                        </button>
                    </h2>

                    <p className="text-sm text-gray-400 mt-1">
                        Set up your tournament details, format, and teams.
                    </p>
                </div>

                {/* Basic Info */}
                <div className="space-y-4 mb-6">

                    <Input
                        label="Tournament Name"
                        placeholder="e.g. UNEC Football League"
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                    />

                    <Input
                        label="Location"
                        placeholder="e.g. Enugu Campus Field"
                        value={location}
                        onChange={(e) =>
                            setLocation(
                                e.target.value
                            )
                        }
                    />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4 mb-6">

                    <Input
                        label="Start Date"
                        type="date"
                        value={startDate}
                        onChange={(e) =>
                            setStartDate(
                                e.target.value
                            )
                        }
                    />

                    <Input
                        label="End Date"
                        type="date"
                        value={endDate}
                        onChange={(e) =>
                            setEndDate(
                                e.target.value
                            )
                        }
                    />
                </div>

                {/* Format & Teams */}
                <div className="mb-6 space-y-4">

                    <div>

                        <label className="text-sm text-gray-300 mb-1 block">
                            Tournament Format
                        </label>

                        <select
                            value={format}
                            onChange={(e) =>
                                setFormat(
                                    e.target.value
                                )
                            }
                            className="w-full bg-[#0F1115] border border-gray-700 rounded-lg p-2 text-sm"
                        >
                            <option value="knockout">
                                Knockout
                            </option>

                            <option value="league">
                                League
                            </option>

                            <option value="group">
                                Group + Knockout
                            </option>
                        </select>
                    </div>

                    <div>

                        <label className="text-sm text-gray-300 mb-1 block">
                            Number of Teams
                        </label>

                        <select
                            value={teamCount}
                            onChange={(e) =>
                                setTeamCount(
                                    Number(
                                        e.target
                                            .value
                                    )
                                )
                            }
                            className="w-full bg-[#0F1115] border border-gray-700 rounded-lg p-2 text-sm"
                        >
                            {[4, 8, 16, 32].map(
                                (num) => (
                                    <option
                                        key={num}
                                        value={num}
                                    >
                                        {num} Teams
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                </div>

                {/* Match Setup */}
                <div className="mb-6">

                    <label className="text-sm text-gray-300 mb-2 block">
                        Match Setup
                    </label>

                    <div className="flex gap-3">

                        <button
                            type="button"
                            onClick={() =>
                                setAutoMatchups(
                                    true
                                )
                            }
                            className={`flex-1 p-3 rounded-lg border transition ${autoMatchups
                                ? "border-blue-500 bg-blue-500/10"
                                : "border-gray-700"
                                }`}
                        >

                            <p className="text-sm font-medium">
                                Auto Generate
                            </p>

                            <p className="text-xs text-gray-400">
                                System creates fixtures automatically
                            </p>
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setAutoMatchups(
                                    false
                                )
                            }
                            className={`flex-1 p-3 rounded-lg border transition ${!autoMatchups
                                ? "border-blue-500 bg-blue-500/10"
                                : "border-gray-700"
                                }`}
                        >

                            <p className="text-sm font-medium">
                                Manual Setup
                            </p>

                            <p className="text-xs text-gray-400">
                                You control all match pairings
                            </p>
                        </button>
                    </div>
                </div>

                {/* Teams */}
                <div className="mb-6">

                    <h3 className="mb-2 text-sm text-gray-300">
                        Teams
                    </h3>
                    <TeamForm
                        teams={teams}
                        addTeam={addTeam}
                        removeTeam={removeTeam}
                        teamCount={teamCount}
                    />
                </div>

                {/* Footer */}
                <div className="mt-auto flex gap-3 pt-4 border-t border-gray-800">

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        disabled={creating}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        variant="primary"
                        disabled={
                            creating ||
                            !name ||
                            !location ||
                            teams.length === 0
                        }
                    >
                        {
                            creating
                                ? "Creating..."
                                : "Create "
                        }
                    </Button>
                </div>
            </motion.aside>
        </form>
    );
}

export default TournamentForm;