"use client";

import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RoomIcon from "@mui/icons-material/Room";

type Match = {
    id: string;
    teamA: string;
    teamB: string;
    scoreA?: number;
    scoreB?: number;
    date?: string;
    location?: string;
};

type Props = {
    matches: Match[];
    type?: "upcoming" | "past";
};

function MatchesTable({ matches, type = "past" }: Props) {
    const isPast = type === "past";

    const statusStyles = {
        finished: "bg-gray-500/10 text-gray-300 border-gray-500/30",
        upcoming: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    };

    return (
        <div className="bg-[#0F172A]">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold text-white">
                    {isPast ? "Past Matches" : "Upcoming Matches"}
                </h3>

                <span className="text-xs text-gray-500">
                    {matches.length} matches
                </span>
            </div>

            {/* Match Cards */}
            <div className="flex flex-col gap-4">
                {matches.map((match) => {
                    const status = isPast ? "finished" : "upcoming";

                    return (
                        <div
                            key={match.id}
                            className="cursor-pointer rounded-2xl border border-gray-800 bg-gradient-to-b from-[#111827] to-[#0B0F19] p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
                        >
                            {/* Status */}
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-xs uppercase tracking-wider text-gray-400">
                                    Match Status
                                </span>

                                <span
                                    className={`text-xs px-3 py-1 rounded-full border ${statusStyles[status]}`}
                                >
                                    {status.toUpperCase()}
                                </span>
                            </div>

                            {/* Teams + Score */}
                            <div className="flex items-center justify-between gap-4">
                                {/* Team A */}
                                <div className="flex-1 text-left">
                                    <p className="font-semibold text-gray-200 truncate">
                                        {match.teamA}
                                    </p>
                                </div>

                                {/* Score */}
                                <div className="flex flex-col items-center px-4 text-center">
                                    <div className="text-2xl font-bold tracking-wider text-white">
                                        {isPast
                                            ? `${match.scoreA ?? 0} : ${match.scoreB ?? 0}`
                                            : "VS"}
                                    </div>

                                    <div className="text-xs text-gray-500 mt-1">
                                        {isPast ? "FT" : "UPCOMING"}
                                    </div>
                                </div>

                                {/* Team B */}
                                <div className="flex-1 text-right">
                                    <p className="font-semibold text-gray-200 truncate">
                                        {match.teamB}
                                    </p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="mt-4 h-[2px] w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-50" />

                            {/* Bottom Info */}
                            <section className="flex items-center justify-between gap-2 pt-2">
                                {match.date && (
                                    <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-2">
                                        <CalendarMonthIcon sx={{ fontSize: 14 }} />
                                        {match.date}
                                    </div>
                                )}

                                <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1">
                                    <RoomIcon sx={{ fontSize: 14 }} />
                                    {match.location || "Unknown Venue"}
                                </div>
                            </section>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MatchesTable;