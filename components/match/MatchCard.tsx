"use client";

import React, { useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RoomIcon from "@mui/icons-material/Room";

import { AnimatePresence } from "framer-motion";

import ManageMatches from "../table/ManageMatches";

import { Matches } from "@/utils/logics/usematchesinfo";

type MatchCardProps = Matches & {
    onAdminClick?: (id: string) => void;
};

const MatchCard: React.FC<MatchCardProps> = ({

    id,

    teamA,
    teamB,

    scoreA,
    scoreB,

    status,

    date,
    location,

    currentHalf,

    isHalftime,

}) => {

    const router = useRouter();

    const pathname = usePathname();

    const [manageMatches, setManageMatches] =
        useState(false);

    const isAdmin =
        pathname?.startsWith("/admin");

    /* STATUS LABEL */
    const statusLabel = useMemo(() => {

        if (status === "live") {

            return (
                <span className="text-green-400">
                    LIVE
                </span>
            );
        }

        if (
            status === "halftime" ||
            isHalftime
        ) {

            return (
                <span className="text-yellow-400">
                    HALFTIME
                </span>
            );
        }

        if (status === "finished") {

            return (
                <span className="text-red-400">
                    FULL TIME
                </span>
            );
        }

        return (
            <span className="text-gray-400">
                UPCOMING
            </span>
        );

    }, [
        status,
        isHalftime,
    ]);
    const statusStyles = {
        live: "bg-green-500/10 text-green-400 border-green-500/30",
        finished: "bg-gray-500/10 text-gray-300 border-gray-500/30",
        upcoming: "bg-blue-500/10 text-blue-400 border-blue-500/30",
        halftime: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    };
    /* CARD CLICK */
    const handleClick = () => {

        if (isAdmin) {

            setManageMatches(true);

        } else {

            router.push(`/Matches/${id}`);
        }
    };

    return (
        <>
            <div
                onClick={handleClick}
                className="cursor-pointer rounded-2xl border border-gray-800 bg-gradient-to-b from-[#111827] to-[#0B0F19] p-5 transition-all duration-300 hover:border-gray-700"
            >

                {/* TOP */}
                <div className="flex justify-between mb-3 text-xs text-gray-400">

                    <span
                        className={`text-xs px-3 py-1 rounded-full border ${statusStyles[status]} flex items-center gap-2`}
                    >
                        {status === "live" && (
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                        )}
                        {status.toUpperCase()}
                    </span>

                    {/* HALF INFO */}
                    {(status === "live" ||
                        status === "halftime") && (
                            <div className=" text-[11px] text-gray-500">

                                {currentHalf === 1 &&
                                    "First Half"}

                                {currentHalf === 2 &&
                                    "Second Half"}

                                {status === "halftime" &&
                                    " • Waiting for restart"}
                            </div>
                        )}
                </div>

                {/* SCORE */}
                <div className="flex justify-between items-center">

                    <span className="font-medium">
                        {teamA}
                    </span>

                    <div className="text-xl font-bold">

                        {scoreA} : {scoreB}
                    </div>

                    <span className="font-medium">
                        {teamB}
                    </span>
                </div>

                {/* DIVIDER */}
                <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-40" />

                {/* FOOTER */}
                <div className="flex justify-between mt-3 text-xs text-gray-500 gap-4">

                    <span className="flex items-center gap-1">

                        <CalendarMonthIcon
                            fontSize="small"
                        />

                        {date}
                    </span>

                    <span className="flex items-center gap-1 text-right">

                        <RoomIcon
                            fontSize="small"
                        />

                        {location}
                    </span>
                </div>


            </div>

            <AnimatePresence>

                {manageMatches && (

                    <ManageMatches
                        matchId={id}
                        onClose={() =>
                            setManageMatches(false)
                        }
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default MatchCard;