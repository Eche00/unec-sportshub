"use client";

import { useEffect, useMemo, useState } from "react";

import {
    EmojiEvents,
    SportsSoccer,
} from "@mui/icons-material";

import SearchIcon from "@mui/icons-material/Search";

import MatchCard from "@/components/match/MatchCard";
import Empty from "@/components/ui/Empty";
import MatchesSkeleton from "@/components/ui/skeletons/MatchesSkeleton";
import TournamentsSkeleton from "@/components/ui/skeletons/TournamentsSkeleton";
import StandingsTable from "@/components/table/StandingsTable";

import useMatchesInfo from "@/utils/logics/usematchesinfo";
import useTournamentInfo, {
    Tournament,
} from "@/utils/logics/usetournamentinfo";

import { AnimatePresence } from "framer-motion";
import HomeSkeleton from "@/components/ui/skeletons/HomeSkeleton";
import Button from "@/components/ui/Button";

export default function Page() {

    const [activeTab, setActiveTab] = useState<
        "matches" | "tournaments"
    >("matches");

    const [openTournament, setOpenTournament] =
        useState(false);

    const [selectedTournament, setSelectedTournament] =
        useState<Tournament | null>(null);

    /* MATCHES */
    const {
        loading,

        filteredMatches,

        statusStyles,
    } = useMatchesInfo();

    /* TOURNAMENTS */
    const {
        tournaments,
        filteredTournaments,
    } = useTournamentInfo();

    /* HERO MATCH */
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

    useEffect(() => {
        if (!filteredMatches?.length) return;

        const interval = setInterval(() => {
            setCurrentHeroIndex((prev) => (prev + 1) % filteredMatches.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [filteredMatches?.length]); // 👈 better dependency

    const heroMatch = useMemo(() => {
        if (!filteredMatches?.length) return null;

        const safeIndex = currentHeroIndex % filteredMatches.length;

        return filteredMatches[safeIndex];
    }, [filteredMatches, currentHeroIndex]);

    /* LIMIT */
    const homeMatches = filteredMatches?.slice(0, 4);
    const homeTournaments = filteredTournaments?.slice(0, 4);

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
            <HomeSkeleton />
        );
    }

    return (
        <main className="relative min-h-screen text-white overflow-hidden">

            {/* PAGE CONTENT */}
            <div className="max-w-7xl mx-auto  sm:px-6 sm:pt-28  pb-20">

                {/* HERO CARD */}
                <section className="relative overflow-hidden sm:pt-7 pt-28 rounded-[30px] border border-white/10 bg-gradient-to-br from-[#182742] via-[#131A28] to-[#3D2166] p-5 sm:p-7 shadow-2xl">

                    {/* BG */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/20 pointer-events-none" />

                    {/* TOP */}
                    <div className="relative z-10 flex items-center gap-2 text-sm text-gray-300 mb-6">

                        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />

                        Live Football Experience
                    </div>

                    {/* MAIN */}
                    <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">

                        {/* LEFT */}
                        <div>

                            <p className="text-blue-300 text-sm mb-2 uppercase tracking-[0.3em]">
                                Featured Match
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

                            {/* LIVE DATA */}
                            {heroMatch && (
                                <div className="mt-8 flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md w-fit">

                                    <div className="flex items-center gap-3">

                                        <div className="h-12 min-w-12 px-3 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
                                            {String(heroMatch.teamA)
                                                .slice(0, 3)
                                                .toUpperCase()}
                                        </div>

                                        <span className="text-xl font-bold">
                                            VS
                                        </span>

                                        <div className="h-12 min-w-12 px-3 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
                                            {String(heroMatch.teamB)
                                                .slice(0, 3)
                                                .toUpperCase()}
                                        </div>
                                    </div>

                                    <div className="h-10 w-px bg-white/10" />

                                    <div>
                                        <p className="text-sm font-semibold">
                                            {heroMatch.date || "Match Day"}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            {heroMatch.time || "TBD"}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* RIGHT */}
                        <div className="relative h-[300px] sm:h-[420px] rounded-3xl overflow-hidden">

                            <img
                                src="https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=1200&auto=format&fit=crop"
                                alt="Football"
                                className="absolute inset-0 h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-[#151B23] via-transparent to-transparent" />

                            {/* FLOAT */}
                            <div className="absolute bottom-5 left-5 right-5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-sm text-gray-300">
                                            Featured Match
                                        </p>

                                        <h3 className="font-bold text-lg">
                                            {heroMatch
                                                ? `${heroMatch.teamA} vs ${heroMatch.teamB}`
                                                : "No Match Available"}
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
                <section className="mt-10 md:p-0 p-4">

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

                    {/* MATCHES */}
                    {activeTab === "matches" && (
                        <div className="mt-8">

                            {!loading && homeMatches.length === 0 && (
                                <Empty />
                            )}

                            {homeMatches.length > 0 && (
                                <>
                                    <div className="grid gap-4 sm:grid-cols-2">

                                        {homeMatches.map((match) => (
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
                                        ))}
                                    </div>

                                    {/* BUTTON */}
                                    <div className="mt-8 flex justify-center">
                                        <a href="/Matches">
                                            <Button variant="primary"
                                            >
                                                View All Matches
                                            </Button>
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* TOURNAMENTS */}
                    {activeTab === "tournaments" && (
                        <div className="mt-8">

                            {loading && (
                                <TournamentsSkeleton />
                            )}

                            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">

                                {!loading && homeTournaments.length > 0 ? (

                                    homeTournaments.map((tournament) => {

                                        const stage =
                                            getTournamentStage(
                                                tournament
                                            );

                                        return (
                                            <div
                                                key={tournament.id}
                                                className="relative group bg-gradient-to-b from-[#111827] to-[#0B0F19] rounded-2xl p-6 border border-gray-800 hover:border-purple-400/40 transition overflow-hidden"
                                            >

                                                {/* Glow */}
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-linear-to-r from-cyan-500/10 to-purple-500/10 blur-xl" />

                                                {/* TOP */}
                                                <div className="flex justify-between items-start relative z-10">

                                                    <div className="flex items-center gap-3">

                                                        <div className="p-2 rounded-lg bg-white/5 border border-gray-700">
                                                            <SportsSoccer className="text-gray-300" />
                                                        </div>

                                                        <div>

                                                            <span className="text-sm font-medium text-gray-200 block">
                                                                {tournament.name}
                                                            </span>

                                                            {tournament.location && (
                                                                <p className="text-xs text-gray-500 mt-1">
                                                                    {tournament.location}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* STATUS */}
                                                    <span
                                                        className={`text-xs px-3 py-1 rounded-full border ${statusStyles[tournament.status]} flex items-center gap-2 uppercase`}
                                                    >

                                                        {tournament?.status === "live" && (
                                                            <span className="relative flex h-2 w-2">
                                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                            </span>
                                                        )}

                                                        {tournament?.status}
                                                    </span>
                                                </div>

                                                {/* DIVIDER */}
                                                <div className="my-4 h-px bg-gray-800" />

                                                {/* BOTTOM */}
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 text-gray-400 text-sm">

                                                    <div className="flex items-center gap-6 flex-wrap">

                                                        <div>
                                                            <p className="text-xs">
                                                                Stage
                                                            </p>

                                                            <p className="text-white font-medium">
                                                                {stage}
                                                            </p>
                                                        </div>

                                                        <div>
                                                            <p className="text-xs">
                                                                Teams
                                                            </p>

                                                            <p className="text-white font-medium">
                                                                {tournament.teams?.length || 0}
                                                            </p>
                                                        </div>

                                                        <div>
                                                            <p className="text-xs">
                                                                Start Date
                                                            </p>

                                                            <p className="text-white font-medium">
                                                                {tournament.startDate || "--"}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* ACTION */}
                                                    <div className="flex flex-wrap gap-2">

                                                        <hr className="h-5 w-[0.5px] bg-gray-500" />

                                                        <button
                                                            className="group-hover:text-gray-300 transition text-xs cursor-pointer hover:underline"
                                                            onClick={() => {
                                                                setSelectedTournament(
                                                                    tournament
                                                                );

                                                                setOpenTournament(
                                                                    true
                                                                );
                                                            }}
                                                        >
                                                            View Details →
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })

                                ) : !loading ? (

                                    <div className="sm:col-span-2 flex flex-col items-center justify-center text-center border border-dashed border-gray-700 rounded-xl p-10 bg-[#0F1115] w-full mx-auto min-h-[300px]">

                                        <div className="p-3 rounded-full bg-white/5 border border-gray-700 mb-4">
                                            <SportsSoccer className="text-gray-300" />
                                        </div>

                                        <h3 className="text-sm font-semibold text-gray-200 mb-1">
                                            No tournaments yet
                                        </h3>

                                        <p className="text-xs text-gray-400 mb-4 max-w-xs">
                                            No tournaments have been created yet.
                                            Come back later.
                                        </p>
                                    </div>

                                ) : null}
                            </div>

                            {/* BUTTON */}
                            {homeTournaments.length > 0 && (
                                <div className="mt-8 flex justify-center">
                                    <a href="/Tournaments">
                                        <Button variant="primary"
                                        >
                                            View All Tournaments
                                        </Button>
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                </section>

                {/* FEATURES */}
                <section className="max-w-6xl mx-auto mt-24 grid md:grid-cols-3 gap-6 p-4">

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

            {/* MODAL */}
            <AnimatePresence>
                {openTournament && selectedTournament && (
                    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">

                        <div className="w-full max-w-lg">

                            <StandingsTable
                                tournament={selectedTournament}
                                onClose={() =>
                                    setOpenTournament(false)
                                }
                            />
                        </div>
                    </div>
                )}
            </AnimatePresence>
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