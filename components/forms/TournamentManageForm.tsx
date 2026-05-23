"use client";

import React, { useState } from "react";
import {
    SportsSoccer,
    Edit,
    Add,
} from "@mui/icons-material";

import Button from "../ui/Button";
import StandingsTable from "../table/StandingsTable";
import TournamentForm from "./TournamentForm";
import EditTournamentForm from "./EditTournamentForm";

import { AnimatePresence } from "framer-motion";

import useTournamentInfo, {
    Tournament,
} from "@/utils/logics/usetournamentinfo";

export default function TournamentManageForm() {

    const {
        tournaments,
        loading,
    } = useTournamentInfo();

    const [createTournament, setCreateTournament] =
        useState(false);

    const [openTournament, setOpenTournament] =
        useState(false);

    const [manageTournament, setManageTournament] =
        useState(false);

    const [selectedTournament, setSelectedTournament] =
        useState<Tournament | null>(null);

    // ---------------- CLEAN HELPERS (NO MATCH LOGIC) ----------------

    const getTournamentStatus = (_tournament: Tournament) => {
        return "Active";
    };

    const getTournamentStage = (tournament: Tournament) => {

        const teamCount = tournament.teams?.length || 0;

        if (teamCount === 0) return "No Teams";
        if (teamCount <= 4) return "Group Stage";
        if (teamCount <= 8) return "Knockout Stage";
        if (teamCount <= 16) return "Quarter Finals";

        return "Final Stage";
    };

    // ---------------- UI ----------------
    return (
        <div className="min-h-screen text-white space-y-6">

            {/* HEADER */}
            <div className="flex items-center justify-between gap-2">

                <h1 className="text-2xl font-semibold flex items-center gap-2">
                    Tournament Control
                </h1>

                <Button
                    variant="primary"
                    onClick={() =>
                        setCreateTournament(true)
                    }
                >
                    + Create
                </Button>
            </div>

            {/* OVERVIEW */}
            <section className="space-y-4 pt-6 border-t border-gray-800">

                {/* LOADING */}
                {loading && (
                    <div className="flex items-center justify-center py-10">
                        <p className="text-sm text-gray-400">
                            Loading tournaments...
                        </p>
                    </div>
                )}

                {/* LIST */}
                <div className="flex flex-col gap-4">

                    {!loading && tournaments.length > 0 ? (
                        tournaments.map((tournament) => {

                            const status = getTournamentStatus(tournament);
                            const stage = getTournamentStage(tournament);

                            return (
                                <div
                                    key={tournament.id}
                                    className="relative group bg-gradient-to-b from-[#111827] to-[#0B0F19] rounded-2xl p-6 border border-gray-800 hover:border-purple-400/40 transition overflow-hidden"
                                >

                                    {/* Glow */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-linear-to-r from-cyan-500/10 to-purple-500/10 blur-xl" />

                                    {/* TOP */}
                                    <div className="flex justify-between items-start relative z-10">

                                        <div className="flex items-center gap-3">

                                            <div className="p-2 rounded-lg bg-white/5 border border-gray-700">
                                                <SportsSoccer className="text-gray-300" />
                                            </div>

                                            <div>
                                                <span className="text-sm font-medium text-gray-200 block">
                                                    {tournament.name}
                                                </span>

                                                {tournament.location && (
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {tournament.location}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* STATUS */}
                                        <span className="px-3 py-1 text-xs rounded-full border bg-blue-400/10 text-blue-300 border-blue-400/20">
                                            {status}
                                        </span>
                                    </div>

                                    {/* DIVIDER */}
                                    <div className="my-4 h-[1px] bg-gray-800" />

                                    {/* BOTTOM */}
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 text-gray-400 text-sm">

                                        <div className="flex items-center gap-6 flex-wrap">

                                            <div>
                                                <p className="text-xs">Stage</p>
                                                <p className="text-white font-medium">
                                                    {stage}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs">Teams</p>
                                                <p className="text-white font-medium">
                                                    {tournament.teams?.length || 0}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs">Start Date</p>
                                                <p className="text-white font-medium">
                                                    {tournament.startDate || "--"}
                                                </p>
                                            </div>

                                        </div>

                                        {/* ACTIONS */}
                                        <div className="flex flex-wrap gap-2">

                                            <button
                                                className="group-hover:text-gray-300 transition text-xs cursor-pointer hover:underline flex items-center gap-1"
                                                onClick={() => {
                                                    setSelectedTournament(tournament);
                                                    setManageTournament(true);
                                                }}
                                            >
                                                Manage
                                                <Edit fontSize="small" />
                                            </button>

                                            <hr className="h-5 w-[0.5px] bg-gray-500" />

                                            <button
                                                className="group-hover:text-gray-300 transition text-xs cursor-pointer hover:underline"
                                                onClick={() => {
                                                    setSelectedTournament(tournament);
                                                    setOpenTournament(true);
                                                }}
                                            >
                                                View Details →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : !loading ? (

                        /* EMPTY STATE */
                        <div className="flex flex-col items-center justify-center text-center border border-dashed border-gray-700 rounded-xl p-10 bg-[#0F1115]">

                            <div className="p-3 rounded-full bg-white/5 border border-gray-700 mb-4">
                                <SportsSoccer className="text-gray-300" />
                            </div>

                            <h3 className="text-sm font-semibold text-gray-200 mb-1">
                                No tournaments yet
                            </h3>

                            <p className="text-xs text-gray-400 mb-4 max-w-xs">
                                You haven’t created any tournaments. Start by creating one to manage teams.
                            </p>

                            <Button
                                variant="secondary"
                                onClick={() => setCreateTournament(true)}
                                className="flex items-center gap-2"
                            >
                                <Add />
                                Create Tournament
                            </Button>
                        </div>
                    ) : null}
                </div>
            </section>

            {/* MODALS */}
            <AnimatePresence>

                {createTournament && (
                    <TournamentForm
                        onClose={() => setCreateTournament(false)}
                    />
                )}

                {openTournament && selectedTournament && (
                    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">

                        <div className="w-full max-w-lg">
                            <StandingsTable
                                teams={selectedTournament.teams || []}
                                onClose={() => setOpenTournament(false)}
                            />
                        </div>

                    </div>
                )}

                {manageTournament && selectedTournament && (
                    <div className="fixed  bg-black/60 z-50">

                        <div className="w-full">

                            <EditTournamentForm
                                tournament={selectedTournament}
                                onClose={() => setManageTournament(false)}
                            />

                        </div>
                    </div>
                )}

            </AnimatePresence>
        </div>
    );
}