"use client";

import React, { useEffect, useMemo, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
    Add,
    EmojiEvents,
    SportsSoccer,
    TrendingUp,
    AccessTime,
    ArrowOutward,
    Logout,
    Stadium,
} from "@mui/icons-material";

import { handleSignOut, useUserInfo } from "@/utils/logics/userinfo";

import useTournamentInfo from "@/utils/logics/usetournamentinfo";
import useMatchesInfo from "@/utils/logics/usematchesinfo";

export default function Page() {

    const router = useRouter();

    const userInfo = useUserInfo();

    const {
        tournaments,
        filteredTournaments,
    } = useTournamentInfo();

    const {
        filteredMatches,
    } = useMatchesInfo();

    // Featured match 
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

    useEffect(() => {
        if (!filteredMatches?.length) return;

        const interval = setInterval(() => {
            setCurrentHeroIndex((prev) => (prev + 1) % filteredMatches.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [filteredMatches?.length]);

    const featuredMatch = useMemo(() => {
        if (!filteredMatches?.length) return null;

        const safeIndex = currentHeroIndex % filteredMatches.length;

        return filteredMatches[safeIndex];
    }, [filteredMatches, currentHeroIndex]);

    return (
        <main className="text-white ">

            {/* HERO */}
            <section className="relative overflow-hidden rounded-xl border border-[#FFFFFF33] bg-[#131313] py-8 px-6">

                <div className="relative z-10 flex flex-col xl:flex-row gap-10 xl:items-center xl:justify-between">

                    {/* LEFT */}
                    <div className="max-w-2xl">

                        <div className="flex items-center gap-3 mb-6">

                            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-black font-black text-xl shadow-xl">
                                {userInfo?.fullName?.charAt(0)}
                            </div>

                            <div>
                                <div className="flex items-center gap-2 mb-1">

                                    <span className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                                        Dashboard
                                    </span>

                                    <span className="px-2 py-1 rounded-full text-[10px] border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 uppercase">
                                        {userInfo?.role}
                                    </span>
                                </div>

                                <h1 className="text-2xl sm:text-3xl font-black leading-tight">
                                    Welcome back,
                                    <br />
                                    {userInfo?.fullName}
                                </h1>
                            </div>
                        </div>

                        <p className="text-gray-300 max-w-xl leading-relaxed">
                            Manage tournaments, monitor live football matches,
                            update scores in real-time and control the entire
                            sports experience from one place.
                        </p>

                        <button
                            onClick={() =>
                                handleSignOut(router)
                            }
                            className="flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400 px-6 py-4 font-semibold hover:bg-red-500/20 transition cursor-pointer mt-4"
                        >
                            <Logout />
                            Sign Out
                        </button>
                    </div>

                    {/* RIGHT HERO CARD */}
                    <div className="relative w-full xl:max-w-md">

                        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-black/30 backdrop-blur-xl p-5">

                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                            <div className="relative z-10">

                                <div className="flex items-center justify-between mb-6">

                                    <div>
                                        <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                                            Featured Match
                                        </p>

                                        <h3 className="text-xl font-black mt-2">
                                            {featuredMatch?.teamA} vs{" "}
                                            {featuredMatch?.teamB}
                                        </h3>
                                    </div>

                                    <div className="h-12 w-12 rounded-2xl bg-purple-500/20 border border-purple-400/20 flex items-center justify-center">
                                        <SportsSoccer className="text-purple-300" />
                                    </div>
                                </div>

                                {/* SCORE */}
                                <div className="rounded-3xl bg-white/5 border border-white/10 p-6">

                                    <div className="flex items-center justify-between">

                                        <div className="text-center">
                                            <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center text-xl font-black">
                                                {String(
                                                    featuredMatch?.teamA || "A"
                                                )
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>

                                            <p className="mt-3 font-semibold">
                                                {featuredMatch?.teamA}
                                            </p>
                                        </div>

                                        <div className="text-center">
                                            <h1 className="text-5xl font-black">
                                                {featuredMatch?.scoreA}:
                                                {featuredMatch?.scoreB}
                                            </h1>

                                            <span className="inline-flex mt-3 px-3 py-1 rounded-full text-xs uppercase bg-green-500/10 border border-green-500/20 text-green-400">
                                                {featuredMatch?.status}
                                            </span>
                                        </div>

                                        <div className="text-center">
                                            <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center text-xl font-black">
                                                {String(
                                                    featuredMatch?.teamB || "B"
                                                )
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>

                                            <p className="mt-3 font-semibold">
                                                {featuredMatch?.teamB}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* DETAILS */}
                                <div className="flex items-center justify-between mt-5 text-sm text-gray-400">

                                    <div className="flex items-center gap-2">
                                        <AccessTime className="text-[18px]!" />
                                        {featuredMatch?.time}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Stadium className="text-[18px]!" />
                                        {featuredMatch?.location}
                                    </div>
                                </div>
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