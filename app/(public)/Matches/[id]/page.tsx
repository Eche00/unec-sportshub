"use client";

import React from "react";
import { useParams } from "next/navigation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RoomIcon from "@mui/icons-material/Room";

export default function Page() {
    const params = useParams();
    const id = params?.id as string;

    // Mock data (replace later with API)
    const match = {
        id,
        teamA: "Team A",
        teamB: "Team B",
        scoreA: 2,
        scoreB: 1,
        status: "live" as "live" | "finished" | "upcoming",
        date: "2026-03-30 18:00",
        location: "Main Arena",
    };

    const statusStyles = {
        live: "bg-green-500/10 text-green-400 border-green-500/30",
        finished: "bg-gray-500/10 text-gray-300 border-gray-500/30",
        upcoming: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    };

    return (
        <main className="min-h-screen text-white px-4 py-8 mt-22">
            <div className="max-w-3xl mx-auto space-y-6">

                {/* HERO MATCH CARD */}
                <div className="rounded-3xl border border-gray-800 bg-gradient-to-b from-[#111827] to-[#0B0F19] p-8 shadow-xl">

                    {/* STATUS */}
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-xs uppercase tracking-wider text-gray-400">
                            Match Status
                        </span>

                        <span
                            className={`text-xs px-3 py-1 rounded-full border ${statusStyles[match.status]} flex items-center gap-2`}
                        >
                            {match.status === "live" && (
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                            )}
                            {match.status.toUpperCase()}
                        </span>
                    </div>

                    {/* TEAMS + SCORE */}
                    <div className="flex items-center justify-between gap-6">

                        {/* Team A */}
                        <div className="flex-1 text-left">
                            <p className="text-lg font-semibold text-gray-200">
                                {match.teamA}
                            </p>
                        </div>

                        {/* SCORE */}
                        <div className="flex flex-col items-center">
                            <div className="text-4xl font-bold tracking-wider">
                                {match.scoreA} : {match.scoreB}
                            </div>

                            <div className="text-xs text-gray-400 mt-2">
                                {match.status === "finished"
                                    ? "FULL TIME"
                                    : match.status === "live"
                                        ? "LIVE NOW"
                                        : "UPCOMING"}
                            </div>
                        </div>

                        {/* Team B */}
                        <div className="flex-1 text-right">
                            <p className="text-lg font-semibold text-gray-200">
                                {match.teamB}
                            </p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="mt-6 h-[2px] w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-50" />

                    {/* DATE + LOCATION */}
                    <div className="flex justify-between items-center mt-4 text-sm text-gray-400">

                        <div className="flex items-center gap-2">
                            <CalendarMonthIcon sx={{ fontSize: 18 }} />
                            {match.date}
                        </div>

                        <div className="flex items-center gap-2">
                            <RoomIcon sx={{ fontSize: 18 }} />
                            {match.location}
                        </div>
                    </div>
                </div>

                {/* ⚡ EXTRA SECTION (Future-ready) */}
                <div className="rounded-2xl border border-gray-800 bg-[#0B0F19] p-6">
                    <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-3">
                        Match Events
                    </h2>

                    <p className="text-gray-500 text-sm">
                        No events yet (goals, cards, substitutions will appear here)
                    </p>
                </div>

            </div>
        </main>
    );
}