"use client";

import StandingsTable from "@/components/table/StandingsTable";
import { Search, SportsSoccer } from "@mui/icons-material";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

const tournaments = [
    { id: "1", name: "UNEC Champions League", stage: "Round 1", teams: 8, matches: 4, status: "Live" },
    { id: "2", name: "Campus Cup", stage: "Round 2", teams: 16, matches: 8, status: "Upcoming" },
    { id: "3", name: "Vc's Cup", stage: "Round 2", teams: 32, matches: 68, status: "Live" },
];

export default function Page() {
    const [openTournament, setOpenTournament] = useState(false);

    return (
        <div className="min-h-screen sm:p-6 mt-22">
            <div className="max-w-[90%] mx-auto space-y-6">
                {/*  Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search teams..."
                        // value={search}
                        // onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1F2933] border border-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>
                {/* Tournament List */}
                <div className="flex flex-col gap-4">
                    {tournaments.length > 0 ? (
                        tournaments.map((t) => {
                            const isLive = t.status === "Live";
                            return (
                                <div
                                    key={t.id}
                                    onClick={() => setOpenTournament(true)}
                                    className="relative group bg-gradient-to-b from-[#111827] to-[#0B0F19]  rounded-2xl p-6 border border-gray-800 hover:border-purple-400/40 transition cursor-pointer overflow-hidden"
                                >
                                    {/* Glow Layer */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition 
                                    bg-linear-to-r from-cyan-500/10 to-purple-500/10 blur-xl" />

                                    {/* Top Row */}
                                    <div className="flex justify-between items-start relative z-10">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-white/5 border border-gray-700">
                                                <SportsSoccer className="text-gray-300" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-200">{t.name}</span>
                                        </div>

                                        {/* Status Badge */}
                                        <span
                                            className={`px-3 py-1 text-xs rounded-full border 
                                        ${isLive
                                                    ? "bg-green-400/10 text-green-400 border-green-400/20"
                                                    : "bg-yellow-400/10 text-yellow-400 border-yellow-400/20"
                                                }`}
                                        >
                                            {t.status}
                                        </span>
                                    </div>

                                    {/* Divider */}
                                    <div className="my-4 h-[1px] bg-gray-800" />

                                    {/* Bottom Row */}
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 text-gray-400 text-sm">
                                        <div className="flex items-center gap-6">
                                            <div>
                                                <p className="text-xs">Stage</p>
                                                <p className="text-white font-medium">{t.stage}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs">Teams</p>
                                                <p className="text-white font-medium">{t.teams}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs">Matches</p>
                                                <p className="text-white font-medium">{t.matches} Active</p>
                                            </div>
                                        </div>

                                        <span className="group-hover:text-gray-300 transition text-xs">
                                            View Details →
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        /* EMPTY STATE */
                        <div className="flex flex-col items-center justify-center text-center border border-dashed border-gray-700 rounded-xl p-10 bg-[#0F1115]">
                            <div className="p-3 rounded-full bg-white/5 border border-gray-700 mb-4">
                                <SportsSoccer className="text-gray-300" />
                            </div>

                            <h3 className="text-sm font-semibold text-gray-200 mb-1">
                                No tournaments yet
                            </h3>

                            <p className="text-xs text-gray-400 mb-4 max-w-xs">
                                No tournaments has been created at the moment. Kindly Come back later for more..
                            </p>


                        </div>
                    )}
                </div>

                {/* Open MODAL */}
                <AnimatePresence>
                    {openTournament && (
                        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
                            <div className="w-full max-w-lg">
                                <StandingsTable
                                    teams={[
                                        { name: "Team A", played: 3, points: 7 },
                                        { name: "Team B", played: 3, points: 5 },
                                        { name: "Team C", played: 3, points: 9 },
                                    ]}
                                    onClose={() => setOpenTournament(false)}
                                />
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}