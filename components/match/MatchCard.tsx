"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RoomIcon from "@mui/icons-material/Room";
import { AnimatePresence } from "framer-motion";
import ManageMatches from "../table/ManageMatches";

type MatchCardProps = {
    id: string; // ✅ needed for routing
    teamA: string;
    teamB: string;
    scoreA: number;
    scoreB: number;
    status?: "live" | "finished" | "upcoming";
    date?: string;
    location?: string;
    onAdminClick?: (matchId: string) => void; // optional modal trigger
};

const MatchCard: React.FC<MatchCardProps> = ({
    id,
    teamA,
    teamB,
    scoreA,
    scoreB,
    status = "upcoming",
    date,
    location = "Unknown Venue",
    onAdminClick,
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const [manageMatches, setManageMatches] = useState(false)
    const isAdminRoute = pathname.startsWith("/admin/Match");

    const statusStyles = {
        live: "bg-green-500/10 text-green-400 border-green-500/30",
        finished: "bg-gray-500/10 text-gray-300 border-gray-500/30",
        upcoming: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    };
    const handleClick = () => {
        console.log("Clicked match:", id);

        if (isAdminRoute) {
            console.log("Admin route detected");

            if (onAdminClick) {
                onAdminClick(id);
            }
            setManageMatches(true);

        } else {
            console.log("Navigating to match page");
            router.push(`/Matches/${id}`);
        }
    };

    return (
        <>
            <div
                onClick={handleClick}
                className="cursor-pointer rounded-2xl border border-gray-800 bg-gradient-to-b from-[#111827] to-[#0B0F19] p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
            >
                <div className="flex justify-between items-center mb-3">
                    <span className="text-xs uppercase tracking-wider text-gray-400">
                        Match Status
                    </span>

                    <span
                        className={`text-xs px-3 py-1 rounded-full border ${statusStyles[status]} flex items-center gap-2`}
                    >
                        {status.toUpperCase()}
                    </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 text-left">
                        <p className="font-semibold text-gray-200 truncate">
                            {teamA}
                        </p>
                    </div>

                    <div className="flex flex-col items-center px-4 text-center">
                        <div className="text-2xl font-bold tracking-wider text-white">
                            {scoreA} : {scoreB}
                        </div>

                        <div className="text-xs text-gray-500 mt-1">
                            {status === "finished"
                                ? "FT"
                                : status === "live"
                                    ? "LIVE"
                                    : "VS"}
                        </div>
                    </div>

                    <div className="flex-1 text-right">
                        <p className="font-semibold text-gray-200 truncate">
                            {teamB}
                        </p>
                    </div>
                </div>

                <div className="mt-4 h-[2px] w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-50" />

                <section className="flex items-center justify-between gap-2 pt-2">
                    {date && (
                        <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-2">
                            <CalendarMonthIcon sx={{ fontSize: 14 }} />
                            {date}
                        </div>
                    )}

                    <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1">
                        <RoomIcon sx={{ fontSize: 14 }} />
                        {location}
                    </div>
                </section>


            </div>
            {/* Open MODAL */}
            <AnimatePresence>
                {manageMatches && (
                    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
                        <div className="w-full max-w-lg">
                            <ManageMatches
                                matchId={id}
                                onClose={() => setManageMatches(false)}
                            />
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MatchCard;