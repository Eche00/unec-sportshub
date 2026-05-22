"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";

import MatchCard from "@/components/match/MatchCard";
import CreateMatchForm from "@/components/forms/CreateMatchForm";
import Button from "@/components/ui/Button";

import useMatchesInfo from "@/utils/logics/usematchesinfo";
import Empty from "@/components/ui/Empty";
import MatchesSkeleton from "@/components/ui/skeletons/MatchesSkeleton";

export default function Page() {

    const { filteredMatches, loading, createMatch, setCreateMatch, isEmpty, search, setSearch } = useMatchesInfo();

    const hasMatches = filteredMatches.length > 0;
    if (loading) {
        return (
            <MatchesSkeleton />
        );
    }
    return (
        <div className="space-y-6">

            {/* HEADER */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">
                    Match Control
                </h1>

                <Button
                    variant="primary"
                    onClick={() => setCreateMatch(true)}
                >
                    + Create
                </Button>
            </div>

            <hr className="border-gray-800" />


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
            {isEmpty && (
                <Empty />
            )}

            {/* MATCHES GRID */}
            {hasMatches && (
                <div className="grid gap-4 lg:grid-cols-2">
                    {filteredMatches.map((match) => (
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
                    ))}
                </div>
            )}

            {/* CREATE MODAL */}
            <AnimatePresence>
                {createMatch && (
                    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                        <div className="w-full max-w-lg">
                            <CreateMatchForm
                                onClose={() => setCreateMatch(false)}
                            />
                        </div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}