"use client";

import React, { useState } from "react";
import {
    Close,
    EmojiEvents,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import MatchesTable from "./MatchesTable";

type Team = {
    name: string;
    played: number;
    won?: number;
    drawn?: number;
    lost?: number;
    goalsFor?: number;
    goalsAgainst?: number;
    points: number;
};

type Match = {
    home: string;
    away: string;
    score?: string;
    date?: string;
    status: "upcoming" | "past";
};

type Props = {
    teams: Team[];
    onClose: () => void;
};

function StandingsTable({ teams, onClose }: Props) {
    const [manageTournament, setManageTournament] = useState(false)
    const [activeTab, setActiveTab] = useState<
        "standings" | "upcoming" | "past"
    >("standings");

    const sortedTeams = [...teams].sort((a, b) => b.points - a.points);

    // Dummy matches (replace with real data later)
    const matches: Match[] = [
        { home: "Team A", away: "Team B", date: "Today 4:00 PM", status: "upcoming" },
        { home: "Team C", away: "Team D", date: "Tomorrow 2:00 PM", status: "upcoming" },
        { home: "Team A", away: "Team C", score: "2 - 1", status: "past" },
        { home: "Team B", away: "Team D", score: "0 - 3", status: "past" },
    ];

    const upcomingMatches = matches.filter(m => m.status === "upcoming");
    const pastMatches = matches.filter(m => m.status === "past");

    return (
        <div
            className="fixed inset-0 top-16.5 bg-black/60 z-50 flex justify-end"
            onClick={onClose}
        >
            <motion.aside
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 200, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0F172A] sm:w-[650px] w-full h-full border-l border-gray-800 rounded-tl-2xl rounded-bl-2xl p-4 sm:p-6 overflow-y-auto flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <EmojiEvents className="text-[#3B82F6]" />
                        <h3 className="text-lg font-semibold">
                            Tournament Details
                        </h3>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/5 transition"
                    >
                        <Close />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-gray-800 pb-2 text-sm">
                    {[
                        { key: "standings", label: "Standings" },
                        { key: "upcoming", label: "Upcoming" },
                        { key: "past", label: "Past Matches" },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as any)}
                            className={`px-3 py-1 rounded-lg transition ${activeTab === tab.key
                                ? "bg-white/10 text-white"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* CONTENT */}
                <div className="flex-1 overflow-y-auto">

                    {/*  STANDINGS  */}
                    {activeTab === "standings" && (
                        <div className="rounded-xl border border-gray-800 overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-[#0F1115] text-gray-400 text-xs uppercase">
                                    <tr>
                                        <th className="p-3">#</th>
                                        <th className="p-3">Team</th>
                                        <th className="p-3">MP</th>
                                        <th className="p-3">W</th>
                                        <th className="p-3">D</th>
                                        <th className="p-3">L</th>
                                        <th className="p-3">GF</th>
                                        <th className="p-3">GA</th>
                                        <th className="p-3">Pts</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {sortedTeams.map((team, index) => (
                                        <tr
                                            key={index}
                                            className="border-t border-gray-800 hover:bg-white/5"
                                        >
                                            <td className="p-3">{index + 1}</td>
                                            <td className="p-3 text-gray-200">{team.name}</td>
                                            <td className="p-3">{team.played}</td>
                                            <td className="p-3">{team.won ?? "-"}</td>
                                            <td className="p-3">{team.drawn ?? "-"}</td>
                                            <td className="p-3">{team.lost ?? "-"}</td>
                                            <td className="p-3">{team.goalsFor ?? "-"}</td>
                                            <td className="p-3">{team.goalsAgainst ?? "-"}</td>
                                            <td className="p-3 font-bold">{team.points}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/*  UPCOMING MATCHES  */}
                    {activeTab === "upcoming" && (
                        <MatchesTable
                            type="upcoming"
                            matches={upcomingMatches.map((m, i) => ({
                                id: `upcoming-${i}`,
                                teamA: m.home,
                                teamB: m.away,
                                date: m.date,
                            }))}
                        />
                    )}

                    {/*  PAST MATCHES  */}
                    {activeTab === "past" && (
                        <MatchesTable
                            type="past"
                            matches={pastMatches.map((m, i) => ({
                                id: `past-${i}`,
                                teamA: m.home,
                                teamB: m.away,
                                scoreA: Number(m.score?.split("-")[0]) || 0,
                                scoreB: Number(m.score?.split("-")[1]) || 0,
                            }))}
                        />
                    )}
                </div>
            </motion.aside>


        </div>
    );
}

export default StandingsTable;