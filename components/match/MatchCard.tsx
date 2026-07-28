"use client";

import React, { useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RoomIcon from "@mui/icons-material/Room";

import { AnimatePresence } from "framer-motion";

import ManageMatches from "../table/ManageMatches";

import useMatchesInfo, { Matches } from "@/utils/logics/usematchesinfo";
import useTournamentInfo from "@/utils/logics/usetournamentinfo";
import { SportsBasketball, SportsSoccer, SportsVolleyball } from "@mui/icons-material";

type MatchCardProps = Matches & {
    onAdminClick?: (id: string) => void;
};

const MatchCard: React.FC<MatchCardProps> = ({

    id,

    category,

    teamA,
    teamB,

    scoreA,
    scoreB,

    status,

    date,
    time,
    location,

    currentHalf,

    isHalftime,
    tournamentId,

}) => {
    const {
        tournaments,
    } = useTournamentInfo();

    const {
        manageMatches,
        setManageMatches,

        isAdmin,

        statusLabel,
        statusStyles,

        handleClick,
    } = useMatchesInfo();
    return (
        <>
            <div
                onClick={() => handleClick(id)}
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
                    {tournamentId && tournaments.filter((t) => t.id === tournamentId).map((t) => (
                        <p className=" text-[10px] text-gray-500 uppercase border-y border-gray-500 h-fit py-1">
                            {t.name}
                        </p>))}

                    <div className="flex items-center gap-2 capitalize text-[11px] text-gray-500">{category}
                        <div className="p-2 rounded-lg bg-white/5 border border-gray-700">
                            {category === "football" && <SportsSoccer fontSize="small" className="text-gray-300" />}
                            {category === "basketball" && <SportsBasketball fontSize="small" className="text-gray-300" />}
                            {category === "volleyball" && <SportsVolleyball fontSize="small" className="text-gray-300" />}
                        </div>

                    </div>

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

                        {date} - {time}
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