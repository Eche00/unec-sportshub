"use client";

import StandingsTable from "@/components/table/StandingsTable";
import Button from "@/components/ui/Button";
import TournamentsSkeleton from "@/components/ui/skeletons/TournamentsSkeleton";
import useMatchesInfo from "@/utils/logics/usematchesinfo";
import useTournamentInfo, { Tournament } from "@/utils/logics/usetournamentinfo";
import { Add, Edit, Search, SportsSoccer } from "@mui/icons-material";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";



export default function Page() {
    const [openTournament, setOpenTournament] = useState(false);

    const {
        tournaments,
        filteredTournaments,
        loading,
        search,
        setSearch
    } = useTournamentInfo();
    const {
        statusStyles,
    } = useMatchesInfo();


    const [selectedTournament, setSelectedTournament] =
        useState<Tournament | null>(null);

    // CLEAN HELPERS (NO MATCH LOGIC)



    const getTournamentStage = (tournament: Tournament) => {

        const teamCount = tournament.teams?.length || 0;

        if (teamCount === 0) return "No Teams";
        if (teamCount <= 4) return "Group Stage";
        if (teamCount <= 8) return "Knockout Stage";
        if (teamCount <= 16) return "Quarter Finals";

        return "Final Stage";
    };
    const hasTournaments = tournaments.length > 0;
    const isSearching = search.trim().length > 0;
    return (
        <div className="min-h-screen sm:p-6 mt-22">
            <div className="max-w-[90%] mx-auto space-y-6">
                {/*  Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or status..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1F2933] border border-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>
                {/* Tournament List */}
                <section className="space-y-4 pt-6 border-t border-gray-800">

                    {/* LOADING */}
                    {loading && <TournamentsSkeleton />}

                    {/* LIST */}
                    <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">

                        {!loading && filteredTournaments.length > 0 ? (
                            filteredTournaments.map((tournament) => {

                                const stage = getTournamentStage(tournament);

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
                                        <div className="my-4 h-[1px] bg-gray-800" />

                                        {/* BOTTOM */}
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 text-gray-400 text-sm">

                                            <div className="flex items-center gap-6 flex-wrap">

                                                <div>
                                                    <p className="text-xs">Stage</p>
                                                    <p className="text-white font-medium">
                                                        {stage}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-xs">Teams</p>
                                                    <p className="text-white font-medium">
                                                        {tournament.teams?.length || 0}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-xs">Start Date</p>
                                                    <p className="text-white font-medium">
                                                        {tournament.startDate || "--"}
                                                    </p>
                                                </div>

                                            </div>

                                            {/* ACTIONS */}
                                            <div className="flex flex-wrap gap-2">



                                                <hr className="h-5 w-[0.5px] bg-gray-500" />

                                                <button
                                                    className="group-hover:text-gray-300 transition text-xs cursor-pointer hover:underline"
                                                    onClick={() => {
                                                        setSelectedTournament(tournament);
                                                        setOpenTournament(true);
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

                            //  EMPTY / SEARCH STATE 
                            <div className="sm:col-span-2 flex flex-col items-center justify-center text-center border border-dashed border-gray-700 rounded-xl p-10 bg-[#0F1115] w-full mx-auto min-h-[300px]">

                                <div className="p-3 rounded-full bg-white/5 border border-gray-700 mb-4">
                                    <SportsSoccer className="text-gray-300" />
                                </div>

                                {/* DYNAMIC TITLE */}
                                <h3 className="text-sm font-semibold text-gray-200 mb-1">
                                    {hasTournaments
                                        ? "No tournaments found"
                                        : "No tournaments yet"}
                                </h3>

                                {/* DYNAMIC MESSAGE */}
                                <p className="text-xs text-gray-400 mb-4 max-w-xs">
                                    {hasTournaments
                                        ? `No tournaments match "${search}". Try a different keyword.`
                                        : "No tournaments have been created yet. Come back later."}
                                </p>

                                {/* OPTIONAL RESET */}
                                {isSearching && (
                                    <button
                                        onClick={() => setSearch("")}
                                        className="text-xs text-blue-400  cursor-pointer"
                                    >
                                        Clear search
                                    </button>
                                )}
                            </div>
                        ) : null}
                    </div>
                </section>

                {/* Open MODAL  */}
                <AnimatePresence>
                    {openTournament && selectedTournament && (
                        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">

                            <div className="w-full max-w-lg">
                                <StandingsTable
                                    tournament={selectedTournament}
                                    onClose={() => setOpenTournament(false)}
                                />
                            </div>

                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}