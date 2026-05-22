"use client";

import React, { useEffect, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { motion } from "framer-motion";
import { Close } from "@mui/icons-material";
import useMatchesInfo, { CreateMatchFormProps } from "@/utils/logics/usematchesinfo";
import useTournamentInfo from "@/utils/logics/usetournamentinfo";



function CreateMatchForm({ onClose, tournamentId }: CreateMatchFormProps) {
    const { tournaments } = useTournamentInfo();

    const {
        loading,
        // form states
        teamA,
        setTeamA,

        teamB,
        setTeamB,

        location,
        setLocation,

        date,
        setDate,

        time,
        setTime,

        status,
        setStatus,

        useTournament,
        setUseTournament,
        selectedTournamentId,
        setSelectedTournamentId,
        // submit handler
        handleSubmit,


    } = useMatchesInfo(onClose);
    useEffect(() => {
        if (tournamentId) {
            setUseTournament(true);
            setSelectedTournamentId(tournamentId);
        }
    }, [tournamentId]);
    const isTournamentLocked = Boolean(selectedTournamentId);
    return (
        <form
            onSubmit={handleSubmit}
            className="fixed inset-0 top-16.5 bg-black/60 z-50 flex justify-end"
            onClick={() => {
                if (!loading) {
                    onClose();
                }
            }}
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
                <div className="mb-4 flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={useTournament}
                        onChange={(e) => setUseTournament(e.target.checked)}
                    />
                    <label className="text-sm text-gray-300">
                        Associate with tournament
                    </label>
                </div>

                {useTournament && (
                    <div className="mb-6">
                        <label className="text-sm text-gray-300 mb-1 block">
                            Tournament
                        </label>

                        <select
                            value={selectedTournamentId}
                            onChange={(e) =>
                                !isTournamentLocked && setSelectedTournamentId(e.target.value)
                            }
                            disabled={isTournamentLocked}
                            className={`w-full border rounded-lg p-2 text-sm bg-[#0F1115] ${isTournamentLocked
                                ? "border-gray-700 text-gray-400 cursor-not-allowed opacity-70"
                                : "border-gray-700 text-white"
                                }`}
                        >
                            <option value="">Select tournament</option>

                            {tournaments.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.name}
                                </option>
                            ))}
                        </select>

                        {isTournamentLocked && (
                            <p className="text-xs text-gray-500 mt-1">
                                Tournament is locked from prev selection
                            </p>
                        )}
                    </div>
                )}
                {/* FOOTER */}
                <div className="mt-auto flex gap-3 pt-4 border-t border-gray-800">
                    <Button type="button" variant="secondary" onClick={onClose}
                        disabled={loading}>
                        Cancel
                    </Button>

                    <Button type="submit" variant="primary" disabled={loading}>
                        {
                            loading
                                ? "Creating..."
                                : "Create Match"
                        }
                    </Button>
                </div>
            </motion.aside>
        </form>
    );
}

export default CreateMatchForm;