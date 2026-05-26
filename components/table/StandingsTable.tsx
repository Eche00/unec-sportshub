"use client";

import React, { useState } from "react";
import {
    Close,
    EmojiEvents,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { Tournament } from "@/utils/logics/usetournamentinfo";
import MatchCard from "../match/MatchCard";
import useMatchesInfo from "@/utils/logics/usematchesinfo";



type Props = {
    tournament: Tournament;
    onClose: () => void;
};

function StandingsTable({ tournament, onClose }: Props) {
    const [activeTab, setActiveTab] = useState<
        "standings" | "live" | "upcoming" | "past"
    >("standings");


    const {
        matches,
        statusStyles
    } = useMatchesInfo();
    const tournamentMatches = matches.filter(
        (m) => m.tournamentId === tournament?.id
    );
    const upcomingMatches = tournamentMatches.filter(
        (m) => m.status === "upcoming"
    );

    const liveMatches = tournamentMatches.filter(
        (m) => m.status === "live" || m.status === "halftime"
    );

    const pastMatches = tournamentMatches.filter(
        (m) => m.status === "finished"
    );
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
                        <span
                            className={`text-xs px-3 py-1 rounded-full border ${statusStyles[tournament.status]} flex items-center gap-2 uppercase`}
                        >
                            {tournament?.status === "live" && (
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                            )}
                            {tournament?.status}
                        </span>
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
                        { key: "upcoming", label: "Upcoming " },
                        { key: "past", label: "Past " },
                        { key: "live", label: "Live " },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as any)}
                            className={`px-3 py-1 rounded-lg transition cursor-pointer  ${activeTab === tab.key
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
                    {activeTab === "standings" ? (
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
                                    {[...tournament.teams]
                                        .sort((a, b) => {
                                            //  Points
                                            if ((b.points ?? 0) !== (a.points ?? 0)) {
                                                return (b.points ?? 0) - (a.points ?? 0);
                                            }

                                            //  Goal Difference
                                            const bGD = (b.goalsFor ?? 0) - (b.goalsAgainst ?? 0);
                                            const aGD = (a.goalsFor ?? 0) - (a.goalsAgainst ?? 0);

                                            if (bGD !== aGD) {
                                                return bGD - aGD;
                                            }

                                            //  Goals Scored
                                            if ((b.goalsFor ?? 0) !== (a.goalsFor ?? 0)) {
                                                return (b.goalsFor ?? 0) - (a.goalsFor ?? 0);
                                            }

                                            // alphabetical fallback (keeps UI stable)
                                            return a.name.localeCompare(b.name);
                                        })
                                        .map((team, index) => (
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
                    ) : (
                        <div className="flex flex-col gap-4">

                            {activeTab === "upcoming" && (
                                <div className="flex flex-col gap-4">
                                    {upcomingMatches.map((match) => (
                                        <MatchCard key={match.id} {...match} />
                                    ))}
                                </div>
                            )}

                            {activeTab === "past" && (
                                <div className="flex flex-col gap-4">
                                    {pastMatches.map((match) => (
                                        <MatchCard key={match.id} {...match} />
                                    ))}
                                </div>
                            )}
                            {activeTab === "live" && (
                                <div className="flex flex-col gap-4">
                                    {liveMatches.map((match) => (
                                        <MatchCard key={match.id} {...match} />
                                    ))}
                                </div>
                            )}

                        </div>
                    )}

                    {/*  UPCOMING MATCHES  */}

                </div>
            </motion.aside>


        </div>
    );
}

export default StandingsTable;