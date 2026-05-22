"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RoomIcon from "@mui/icons-material/Room";

import useMatchesInfo from "@/utils/logics/usematchesinfo";
import { Comment, SportsSoccer } from "@mui/icons-material";
import MatchesSkeleton from "@/components/ui/skeletons/MatchesSkeleton";

export default function Page() {

    const params = useParams();
    const id = params?.id as string;

    const {
        match,
        statusStyles,
        getMatchById,
    } = useMatchesInfo();

    /* FETCH MATCH ON LOAD */
    useEffect(() => {
        if (id) {
            getMatchById(id);
        }
    }, [id]);
    if (!match) {
        return <MatchesSkeleton />;
    }
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

                        <div className="flex-1 text-left">
                            <p className="text-lg font-semibold text-gray-200">
                                {match.teamA}
                            </p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="text-4xl font-bold tracking-wider">
                                {match.scoreA} : {match.scoreB}
                            </div>

                            <div className="text-xs text-gray-400 mt-2">
                                {match.status === "finished"
                                    ? "FULL TIME"
                                    : match.status === "live"
                                        ? "LIVE NOW"
                                        : match.status === "halftime"
                                            ? "HALFTIME"
                                            : "UPCOMING"}
                            </div>
                        </div>

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
                            {match.date} {match.time}
                        </div>

                        <div className="flex items-center gap-2">
                            <RoomIcon sx={{ fontSize: 18 }} />
                            {match.location}
                        </div>
                    </div>
                </div>

                {/* EVENTS SECTION */}
                <div className="rounded-2xl border border-gray-800 bg-[#0B0F19] p-6">
                    <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-3">
                        Match Events
                    </h2>

                    {match.events && match.events.length > 0 ? (
                        <div className="space-y-2">
                            {match.events
                                .slice()
                                .reverse()
                                .map((e: any) => (
                                    <div
                                        key={e.id}
                                        className="text-sm bg-[#0B0F19] p-3 rounded border border-gray-700"
                                    >
                                        {e.minute && (
                                            <strong className="text-gray-300">
                                                {e.minute}'
                                            </strong>
                                        )}{" "}

                                        {e.type === "goal" && (
                                            <span>
                                                <SportsSoccer fontSize="small" /> {e.player} (
                                                {e.team === "A"
                                                    ? match.teamA
                                                    : match.teamB}
                                                )
                                            </span>
                                        )}

                                        {e.type === "yellow" && (
                                            <span>🟨 {e.player}</span>
                                        )}

                                        {e.type === "red" && (
                                            <span>🟥 {e.player}</span>
                                        )}

                                        {e.type === "commentary" && (
                                            <span><Comment /> {e.text}</span>
                                        )}
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">
                            No events yet (goals, cards, substitutions will appear here)
                        </p>
                    )}
                </div>

            </div>
        </main>
    );
}