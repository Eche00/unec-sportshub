"use client";

import React, { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import {
    EmojiEvents,
    SportsSoccer,
    TrendingUp,
    Logout,
    Person,
} from "@mui/icons-material";

import { handleSignOut, useUserInfo } from "@/utils/logics/userinfo";

import useTournamentInfo from "@/utils/logics/usetournamentinfo";
import useMatchesInfo from "@/utils/logics/usematchesinfo";

import MatchCard from "@/components/match/MatchCard";

export default function Page() {
    const router = useRouter();

    const userInfo = useUserInfo();

    const {
        tournaments,
    } = useTournamentInfo();

    const {
        filteredMatches,
        getMatchTime,
    } = useMatchesInfo();

    // Featured match
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

    useEffect(() => {
        if (!filteredMatches?.length) {
            setCurrentHeroIndex(0);
            return;
        }

        const interval = setInterval(() => {
            setCurrentHeroIndex(
                (prev) => (prev + 1) % filteredMatches.length
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [filteredMatches?.length]);

    const featuredMatch = useMemo(() => {
        if (!filteredMatches?.length) return null;

        const safeIndex =
            currentHeroIndex % filteredMatches.length;

        return filteredMatches[safeIndex];
    }, [filteredMatches, currentHeroIndex]);

    return (
        <main className="text-white">

            {/* HERO */}
            <section className="relative overflow-hidden rounded-xl border border-[#FFFFFF33] bg-[#131313] py-8 px-6">

                <div className="relative z-10 flex flex-col xl:flex-row gap-10 xl:items-center xl:justify-between">

                    {/* LEFT */}
                    <div className="max-w-2xl">

                        <div className="flex items-center gap-3 mb-6">

                            <div className="h-12 w-12 rounded-xl bg-[#FB831C] flex items-center justify-center text-black font-black text-xl shadow-xl">
                                <Person
                                    className="text-white"
                                    fontSize="medium"
                                />
                            </div>

                            <div>
                                <div className="flex items-center gap-2 mb-1">

                                    <span className="text-xs uppercase tracking-[0.3em] text-[#FB831C]">
                                        Dashboard
                                    </span>

                                    <span className="px-2 py-1 rounded-full text-[10px] border border-[#FB831C]/20 bg-[#FB831C]/10 text-[#FB831C] uppercase">
                                        {userInfo?.role}
                                    </span>

                                </div>

                                <h1 className="text-xl sm:text-3xl font-black leading-tight">
                                    Welcome, {userInfo?.fullName}
                                </h1>
                            </div>

                        </div>

                        <p className="text-gray-300 max-w-xl leading-relaxed">
                            Manage tournaments, monitor live football matches,
                            update scores in real-time and control the entire
                            sports experience from one place.
                        </p>

                        <button
                            onClick={() => handleSignOut(router)}
                            className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 px-6 py-2 font-semibold hover:bg-red-500/20 transition cursor-pointer mt-4"
                        >
                            <Logout />
                            Sign Out
                        </button>

                    </div>

                    {/* RIGHT HERO CARD */}
                    <div className="relative w-full xl:max-w-md">

                        <div className="relative overflow-hidden sm:rounded-xl sm:border border-white/10 sm:bg-black/30 backdrop-blur-xl sm:p-5">

                            <div className="absolute inset-0 sm:bg-gradient-to-b sm:from-white/5 sm:to-transparent pointer-events-none" />

                            <div className="relative z-10">

                                {/* HEADER */}
                                <div className="flex items-center justify-between mb-6">

                                    <div>
                                        <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                                            Featured Match
                                        </p>

                                        <h3 className="text-xl font-black ">
                                            {!featuredMatch && "No featured match"}
                                        </h3>
                                    </div>


                                </div>

                                {/* MATCH */}
                                {featuredMatch ? (
                                    <MatchCard
                                        key={featuredMatch.id}
                                        id={featuredMatch.id}
                                        name={featuredMatch.name}
                                        category={featuredMatch.category}
                                        teamA={featuredMatch.teamA}
                                        teamB={featuredMatch.teamB}
                                        scoreA={featuredMatch.scoreA}
                                        scoreB={featuredMatch.scoreB}
                                        status={featuredMatch.status}
                                        date={featuredMatch.date}
                                        time={featuredMatch.time}
                                        location={featuredMatch.location}
                                        createdBy={featuredMatch.createdBy}
                                        tournamentId={
                                            featuredMatch.tournamentId
                                        }
                                        matchMinute={getMatchTime(
                                            featuredMatch
                                        )}
                                    />
                                ) : (
                                    <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-dashed border-gray-700 bg-[#0F1115]">
                                        <div className="text-center">
                                            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-gray-700">
                                                <SportsSoccer className="text-gray-400" />
                                            </div>

                                            <p className="text-sm font-semibold text-gray-300">
                                                No matches yet
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                Create a match to feature it here.
                                            </p>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="grid grid-cols-2 xl:grid-cols-4 gap-5 mt-8">

                <StatCard
                    title="Tournaments"
                    value={String(tournaments.length)}
                    icon={<EmojiEvents />}
                    glow="from-cyan-500/20 to-blue-500/10"
                />

                <StatCard
                    title="Matches"
                    value={String(filteredMatches.length)}
                    icon={<TrendingUp />}
                    glow="from-orange-500/20 to-yellow-500/10"
                />

            </section>

        </main>
    );
}

/* STAT CARD */

function StatCard({
    title,
    value,
    icon,
}: {
    title: string;
    value: string;
    icon: React.ReactNode;
    glow: string;
}) {
    return (
        <div className="group relative overflow-hidden rounded-xl border border-[#FFFFFF33] bg-[#131313] py-8 px-6">

            <div className="relative z-10">

                <div className="flex items-center justify-between">

                    <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-300">
                        {icon}
                    </div>

                    <TrendingUp className="text-green-400 text-[20px]!" />
                </div>

                <p className="text-sm text-gray-400 mt-5">
                    {title}
                </p>

                <h2 className="text-3xl font-black mt-2">
                    {value}
                </h2>

            </div>
        </div>
    );
}