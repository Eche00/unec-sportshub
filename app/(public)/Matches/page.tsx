"use client";

import React, { useMemo, useState } from "react";

import MatchCard from "@/components/match/MatchCard";
import Button from "@/components/ui/Button";

import useMatchesInfo from "@/utils/logics/usematchesinfo";

import SearchIcon from "@mui/icons-material/Search";

export default function Page() {
    const [search, setSearch] = useState("");
    const [createMatch, setCreateMatch] = useState(false);

    const { matches, loading } = useMatchesInfo();

    const isEmpty = !loading && matches.length === 0;
    const hasMatches = matches.length > 0;

    /* FILTERED MATCHES */
    const filteredMatches = useMemo(() => {
        return matches.filter((match) => {
            const query = search.toLowerCase();

            return (
                match.teamA.toLowerCase().includes(query) ||
                match.teamB.toLowerCase().includes(query)
            );
        });
    }, [search, matches]);

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

                {/* LOADING */}
                {loading && (
                    <div className="border border-gray-800 rounded-2xl p-10 text-center bg-[#0F172A]">
                        <p className="text-sm text-gray-400">
                            Loading matches...
                        </p>
                    </div>
                )}

                {/* EMPTY STATE */}
                {isEmpty && (
                    <div className="border border-gray-800 rounded-2xl p-10 text-center bg-[#0F172A]">
                        <h2 className="text-lg font-semibold mb-2">
                            No Matches Yet
                        </h2>

                        <p className="text-sm text-gray-400 mb-5">
                            Create your first match to get started.
                        </p>

                        <Button
                            variant="primary"
                            onClick={() => setCreateMatch(true)}
                        >
                            Create Match
                        </Button>
                    </div>
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