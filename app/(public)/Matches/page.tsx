"use client";

import React, { useMemo, useState } from "react";

import MatchCard from "@/components/match/MatchCard";
import Button from "@/components/ui/Button";

import useMatchesInfo from "@/utils/logics/usematchesinfo";

import SearchIcon from "@mui/icons-material/Search";
import MatchesSkeleton from "@/components/ui/skeletons/MatchesSkeleton";
import Empty from "@/components/ui/Empty";

export default function Page() {
    const {
        loading,

        search,
        setSearch,

        isEmpty,
        hasMatches,

        filteredMatches,
    } = useMatchesInfo();

    if (loading) {
        return (
            <MatchesSkeleton />
        );
    }
    // if (isEmpty) {
    //     return (
    //         <Empty />
    //     );
    // }
    return (
        <div className="min-h-screen sm:p-6 mt-22">

            <div className="max-w-[90%] mx-auto space-y-6">

                {/* SEARCH BAR */}
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                        type="text"
                        placeholder="Search teams..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1F2933] border border-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>


                {/* EMPTY STATE */}
                {!loading && isEmpty && (
                    <Empty />
                )}

                {/* MATCHES GRID */}
                {hasMatches && (
                    <div className="grid gap-4 sm:grid-cols-2">
                        {filteredMatches.length > 0 ? (
                            filteredMatches.map((match) => (
                                <MatchCard
                                    key={match.id}
                                    id={match.id}
                                    name={match.name}
                                    teamA={match.teamA}
                                    teamB={match.teamB}
                                    scoreA={match.scoreA}
                                    scoreB={match.scoreB}
                                    status={match.status}
                                    date={match.date}
                                    time={match.time}
                                    location={match.location}
                                    tournamentId={match.tournamentId}

                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 py-10">
                                No matches found
                            </div>
                        )}
                    </div>
                )}


            </div>
        </div>
    );
}