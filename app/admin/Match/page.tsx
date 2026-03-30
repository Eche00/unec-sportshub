"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import MatchCard from "@/components/match/MatchCard";
import { AnimatePresence } from "framer-motion";
import CreateMatchForm from "@/components/forms/CreateMatchForm";
import Button from "@/components/ui/Button";

type Match = {
    id: string;
    teamA: string;
    teamB: string;
    scoreA: number;
    scoreB: number;
    status: "live" | "finished" | "upcoming";
    date: string;
    location: string;
};

export default function Page() {
    const router = useRouter();
    const [createMatch, setCreateMatch] = useState(false);
    const matches: Match[] = [
        {
            id: "1",
            teamA: "Team A",
            teamB: "Team B",
            scoreA: 2,
            scoreB: 1,
            status: "finished",
            date: "2026-03-28 16:00",
            location: "Stadium A",
        },
        {
            id: "2",
            teamA: "Team C",
            teamB: "Team D",
            scoreA: 0,
            scoreB: 0,
            status: "live",
            date: "2026-03-30 18:00",
            location: "Main Arena",
        },
    ];

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div className="flex items-center justify-between gap-2">
                <h1 className="text-2xl font-semibold  flex items-center gap-2">
                    Match Control</h1>
                <Button
                    variant="primary"
                    onClick={() => setCreateMatch(true)}
                >
                    + Create
                </Button>
            </div>


            <hr className="border-gray-800" />

            <div className="grid gap-4 lg:grid-cols-2">
                {matches.map((match) => (
                    <MatchCard
                        key={match.id}
                        id={match.id}
                        teamA={match.teamA}
                        teamB={match.teamB}
                        scoreA={match.scoreA}
                        scoreB={match.scoreB}
                        status={match.status}
                        date={match.date}
                        location={match.location}
                    // onClick={() =>
                    //     router.push(`/matches/${match.id}`)
                    // }
                    />
                ))}
            </div>

            {/* Open MODAL */}
            <AnimatePresence>
                {createMatch && (
                    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
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