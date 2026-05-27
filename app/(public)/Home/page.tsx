"use client";

import { useState } from "react";

import {
    EmojiEvents,
    SportsSoccer,
} from "@mui/icons-material";

import useMatchesInfo from "@/utils/logics/usematchesinfo";

import SearchIcon from "@mui/icons-material/Search";
import MatchesSkeleton from "@/components/ui/skeletons/MatchesSkeleton";
import Empty from "@/components/ui/Empty";

import useTournamentInfo, {
    Tournament,
} from "@/utils/logics/usetournamentinfo";

export default function Page() {

    const [activeTab, setActiveTab] = useState<
        "matches" | "tournaments"
    >("matches");

    /* MATCHES */
    const {
        loading,

        search,
        setSearch,

        isEmpty,
        hasMatches,

        filteredMatches,
    } = useMatchesInfo();

    /* TOURNAMENTS */
    const {
        filteredTournaments,
    } = useTournamentInfo();

    const getTournamentStage = (tournament: Tournament) => {

        const teamCount = tournament.teams?.length || 0;

        if (teamCount === 0) return "No Teams";
        if (teamCount <= 4) return "Group Stage";
        if (teamCount <= 8) return "Knockout Stage";
        if (teamCount <= 16) return "Quarter Finals";

        return "Final Stage";
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#151B23] text-white">
                <div className="pt-28">
                    <MatchesSkeleton />
                </div>
            </main>
        );
    }

    return (
        <main className="relative min-h-screen bg-[#151B23] text-white overflow-hidden">

            {/* PAGE CONTENT */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20">

                {/* HERO CARD */}
                <section className="relative overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-[#182742] via-[#131A28] to-[#3D2166] p-5 sm:p-7 shadow-2xl">

                    {/* BACKGROUND GLOW */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/20 pointer-events-none" />

                    {/* TOP LABEL */}
                    <div className="relative z-10 flex items-center gap-2 text-sm text-gray-300 mb-6">
                        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                        Live Football Experience
                    </div>

                    {/* MAIN CONTENT */}
                    <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">

                        {/* LEFT */}
                        <div>

                            <p className="text-blue-300 text-sm mb-2 uppercase tracking-[0.3em]">
                                Match Day
                            </p>

                            <h1 className="text-4xl sm:text-6xl font-black leading-tight italic">
                                LIVE
                                <br />
                                FOOTBALL
                            </h1>

                            <p className="mt-5 text-gray-300 max-w-lg text-sm sm:text-base leading-relaxed">
                                Watch tournaments, follow live matches,
                                check standings and track every moment
                                in real time.
                            </p>

                            {/* MINI MATCH */}
                            <div className="mt-8 flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md w-fit">

                                <div className="flex items-center gap-3">

                                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
                                        RM
                                    </div>

                                    <span className="text-xl font-bold">
                                        VS
                                    </span>

                                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
                                        MCI
                                    </div>
                                </div>

                                <div className="h-10 w-px bg-white/10" />

                                <div>
                                    <p className="text-sm font-semibold">
                                        28 DECEMBER 2025
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        12:00 UTC+1
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT IMAGE */}
                        <div className="relative h-[300px] sm:h-[420px] rounded-3xl overflow-hidden">

                            <img
                                src="https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=1200&auto=format&fit=crop"
                                alt="Football"
                                className="absolute inset-0 h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-[#151B23] via-transparent to-transparent" />

                            {/* FLOAT CARD */}
                            <div className="absolute bottom-5 left-5 right-5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4">

                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-sm text-gray-300">
                                            Featured Match
                                        </p>

                                        <h3 className="font-bold text-lg">
                                            Real Madrid vs Manchester City
                                        </h3>
                                    </div>

                                    <div className="h-11 w-11 rounded-full bg-purple-500/30 flex items-center justify-center border border-purple-400/30">
                                        <SportsSoccer />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* TABS */}
                <section className="mt-10">

                    <div className="flex items-center gap-3 overflow-x-auto border-b border-white/10 pb-3">

                        <button
                            onClick={() =>
                                setActiveTab("matches")
                            }
                            className={`px-5 py-3 rounded-full text-sm font-semibold transition whitespace-nowrap cursor-pointer ${activeTab === "matches"
                                ? "bg-white text-black shadow-lg"
                                : "bg-white/5 text-gray-400 hover:bg-white/10"
                                }`}
                        >
                            Matches
                        </button>

                        <button
                            onClick={() =>
                                setActiveTab("tournaments")
                            }
                            className={`px-5 py-3 rounded-full text-sm font-semibold transition whitespace-nowrap cursor-pointer ${activeTab === "tournaments"
                                ? "bg-white text-black shadow-lg"
                                : "bg-white/5 text-gray-400 hover:bg-white/10"
                                }`}
                        >
                            Tournaments
                        </button>
                    </div>

                    {/* MATCHES TAB */}
                    {activeTab === "matches" && (
                        <div className="mt-8">

                            {/* SEARCH */}
                            <div className="relative mb-8">

                                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                <input
                                    type="text"
                                    placeholder="Search teams..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1F2933] border border-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                            </div>

                            {/* EMPTY */}
                            {!loading && isEmpty && (
                                <Empty />
                            )}

                            {/* MATCHES GRID */}
                            {hasMatches && (
                                <div className="grid gap-5 lg:grid-cols-2">

                                    {filteredMatches.length > 0 ? (
                                        filteredMatches
                                            .slice(0, 8)
                                            .map((match) => (

                                                <div
                                                    key={match.id}
                                                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#1B2430] to-[#111827] p-5 hover:border-purple-400/40 transition"
                                                >

                                                    {/* GLOW */}
                                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl" />

                                                    <div className="relative z-10">

                                                        {/* STATUS */}
                                                        <div className="flex items-center justify-between mb-5">

                                                            <span
                                                                className={`px-3 py-1 rounded-full text-xs uppercase border ${match.status ===
                                                                    "live"
                                                                    ? "bg-green-500/10 border-green-500/20 text-green-400"
                                                                    : "bg-white/5 border-white/10 text-gray-400"
                                                                    }`}
                                                            >
                                                                {match.status}
                                                            </span>

                                                            <span className="text-xs text-gray-500">
                                                                Match
                                                            </span>
                                                        </div>

                                                        {/* TEAMS */}
                                                        <div className="flex items-center justify-between gap-4">

                                                            {/* TEAM A */}
                                                            <div className="flex items-center gap-3">

                                                                <div className="h-14 w-14 rounded-full bg-white/10 flex items-center justify-center text-lg font-black">
                                                                    {String(
                                                                        match.teamA
                                                                    )
                                                                        .charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase()}
                                                                </div>

                                                                <div>
                                                                    <p className="text-lg font-bold">
                                                                        {String(
                                                                            match.teamA
                                                                        )}
                                                                    </p>

                                                                    <p className="text-xs text-gray-500">
                                                                        Home
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            {/* SCORE */}
                                                            <div className="text-center">

                                                                <h2 className="text-3xl font-black">
                                                                    {
                                                                        match.scoreA
                                                                    }{" "}
                                                                    :{" "}
                                                                    {
                                                                        match.scoreB
                                                                    }
                                                                </h2>

                                                                <p className="text-xs text-gray-500 mt-1">
                                                                    Full Time
                                                                </p>
                                                            </div>

                                                            {/* TEAM B */}
                                                            <div className="flex items-center gap-3">

                                                                <div>
                                                                    <p className="text-lg font-bold text-right">
                                                                        {String(
                                                                            match.teamB
                                                                        )}
                                                                    </p>

                                                                    <p className="text-xs text-gray-500 text-right">
                                                                        Away
                                                                    </p>
                                                                </div>

                                                                <div className="h-14 w-14 rounded-full bg-white/10 flex items-center justify-center text-lg font-black">
                                                                    {String(
                                                                        match.teamB
                                                                    )
                                                                        .charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase()}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* BOTTOM */}
                                                        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-5 text-sm text-gray-400">

                                                            <div className="flex items-center gap-2">
                                                                {match.time}
                                                            </div>

                                                            <div className="flex items-center gap-2">
                                                                {match.location}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                    ) : (
                                        <div className="col-span-full text-center text-gray-500 py-10">
                                            No matches found
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* TOURNAMENTS TAB */}
                    {activeTab === "tournaments" && (
                        <div className="mt-8 grid gap-5 lg:grid-cols-2">

                            {filteredTournaments
                                ?.slice(0, 8)
                                .map((tournament) => {

                                    const stage =
                                        getTournamentStage(
                                            tournament
                                        );

                                    return (
                                        <div
                                            key={tournament.id}
                                            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#1B2430] to-[#111827] p-6 hover:border-cyan-400/40 transition"
                                        >

                                            {/* GLOW */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-2xl" />

                                            <div className="relative z-10">

                                                {/* HEADER */}
                                                <div className="flex items-start justify-between">

                                                    <div className="flex items-center gap-4">

                                                        <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                                                            <EmojiEvents className="text-yellow-400" />
                                                        </div>

                                                        <div>
                                                            <h2 className="text-xl font-bold">
                                                                {
                                                                    tournament.name
                                                                }
                                                            </h2>

                                                            <p className="text-sm text-gray-400 mt-1">
                                                                {tournament.location ||
                                                                    "Unknown Location"}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <span
                                                        className={`text-xs px-3 py-1 rounded-full border uppercase ${tournament.status ===
                                                            "live"
                                                            ? "bg-green-500/10 border-green-500/20 text-green-400"
                                                            : "bg-white/5 border-white/10 text-gray-400"
                                                            }`}
                                                    >
                                                        {
                                                            tournament.status
                                                        }
                                                    </span>
                                                </div>

                                                {/* INFO */}
                                                <div className="mt-8 grid grid-cols-3 gap-4">

                                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                                        <p className="text-xs text-gray-500 mb-1">
                                                            Stage
                                                        </p>

                                                        <p className="font-semibold text-sm">
                                                            {stage}
                                                        </p>
                                                    </div>

                                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                                        <p className="text-xs text-gray-500 mb-1">
                                                            Teams
                                                        </p>

                                                        <p className="font-semibold text-sm">
                                                            {tournament
                                                                .teams
                                                                ?.length ||
                                                                0}
                                                        </p>
                                                    </div>

                                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                                        <p className="text-xs text-gray-500 mb-1">
                                                            Start
                                                        </p>

                                                        <p className="font-semibold text-sm">
                                                            {tournament.startDate ||
                                                                "--"}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* ACTION */}
                                                <button className="mt-6 w-full rounded-2xl bg-white text-black py-3 font-semibold hover:opacity-90 transition cursor-pointer">
                                                    View Tournament
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                </section>

                {/* FEATURES */}
                <section className="max-w-6xl mx-auto mt-24 grid md:grid-cols-3 gap-6">

                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="bg-[#1F2933] p-6 rounded-3xl border border-gray-800 hover:border-gray-600 transition"
                        >
                            <h3 className="text-xl font-semibold mb-2">
                                {feature.title}
                            </h3>

                            <p className="text-gray-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </section>
            </div>
        </main>
    );
}

const features = [
    {
        title: "Create Tournaments",
        description:
            "Quickly set up tournaments with teams, formats, and schedules.",
    },
    {
        title: "Live Match Control",
        description:
            "Update scores and events in real-time from the admin panel.",
    },
    {
        title: "Real-Time Viewing",
        description:
            "Users can watch match progress live with instant updates.",
    },
];