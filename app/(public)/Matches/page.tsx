"use client";

import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import MatchCard from "@/components/match/MatchCard";
import SearchIcon from "@mui/icons-material/Search";

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
    const params = useParams();
    const id = params?.id as string;

    const [search, setSearch] = useState("");

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
        {
            id: "3",
            teamA: "Team E",
            teamB: "Team F",
            scoreA: 1,
            scoreB: 3,
            status: "upcoming",
            date: "2026-04-01 14:00",
            location: "City Ground",
        },
    ];

    // Filter matches based on search
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

                {/*  Search Bar */}
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

                {/*  Matches Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                    {filteredMatches.length > 0 ? (
                        filteredMatches.map((match) => (
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
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500 py-10">
                            No matches found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}