"use client";

import React from "react";

import { AnimatePresence } from "framer-motion";

import ManageMatches from "../table/ManageMatches";

import useMatchesInfo, { Matches } from "@/utils/logics/usematchesinfo";

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
        manageMatches,
        setManageMatches,
        statusStyles,
        handleClick,
    } = useMatchesInfo();

    return (
        <>
            <div className=" flex flex-col w-full">

                {/* MAtch Card  */}
                <section
                    onClick={() => handleClick(id)}
                    className="cursor-pointer rounded-xl border border-[#FFFFFF33] bg-[#131313] py-8 px-6 transition-all duration-300 hover:border-gray-700 relative flex flex-col gap-5"

                >
                    <span
                        className={`absolute top-0 left-1/2 -translate-x-1/2 text-[12px] px-3 py-1 rounded-b-sm ${statusStyles[status]} flex items-center gap-2`}
                    >
                        {status.toUpperCase()}
                        {status === "live" && (
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF0107] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EF0107]"></span>
                            </span>
                        )}
                    </span>

                    {/* SCORE */}
                    <div className="relative flex items-center justify-between text-[14px] font-medium">

                        <span className="flex flex-col gap-2">
                            <img src="/teamA.png" alt="" className=" w-14 h-14  object-cover " />
                            {teamA}
                        </span>

                        <div className="absolute left-1/2 -translate-x-1/2 text-xl font-bold text-[32px] font-bold">
                            {scoreA} : {scoreB}
                        </div>

                        <span className="flex flex-col gap-2">
                            <img src="/teamB.png" alt="" className=" w-14 h-14  object-cover bg-white rounded-full" />
                            {teamB}
                        </span>

                    </div>

                    {/* DIVIDER */}
                    <div className="h-px max-w-75.5 w-full mx-auto bg-[#FFFFFF1A] to-transparent opacity-40 " />

                    {/* FOOTER */}
                    <div className="flex justify-between text-[12px] text-[#A1A1AA] gap-4">

                        <span className="flex items-center gap-1">
                            {new Date(date).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                            })}{" "}
                            - {time}
                        </span>

                        <span>

                            {location}
                        </span>
                    </div>

                </section>

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