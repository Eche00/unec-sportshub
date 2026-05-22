"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";

import MatchCard from "@/components/match/MatchCard";
import CreateMatchForm from "@/components/forms/CreateMatchForm";
import Button from "@/components/ui/Button";

import useMatchesInfo from "@/utils/logics/usematchesinfo";

export default function Page() {

    const { matches, loading, createMatch, setCreateMatch, isEmpty } = useMatchesInfo();

    const hasMatches = matches.length > 0;

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
                <div className="grid gap-4 lg:grid-cols-2">
                    {matches.map((match) => (
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