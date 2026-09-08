"use client";

import { AnimatePresence } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";

import MatchCard from "@/components/match/MatchCard";
import CreateMatchForm from "@/components/forms/CreateMatchForm";
import Button from "@/components/ui/Button";

import useMatchesInfo from "@/utils/logics/usematchesinfo";
import Empty from "@/components/ui/Empty";
import Loader from "@/components/ui/Loader";
import { SportsSoccer } from "@mui/icons-material";

export default function Matches() {
    const { filteredMatches, loading, createMatch, setCreateMatch, isEmpty, search, setSearch, getMatchTime } = useMatchesInfo();
    const isSearching = search.trim().length > 0;

    const hasMatches = filteredMatches.length > 0;
    if (loading) {
        return (
            <Loader />
        );
    }
    return (
        <div className="space-y-6">
            {/* SEARCH BAR */}
            <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                    type="text"
                    placeholder="Search teams..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1F2933] border border-gray-800 text-gray-200 placeholder-gray-500 outline-none ring-2 ring-[#FB831C] transition"
                />
            </div>
            {/* EMPTY STATE */}
            {isEmpty && (
                <Empty />
            )}

            {/* MATCHES GRID */}
            {!loading && hasMatches ? (
                <div className="grid gap-4 lg:grid-cols-2">
                    {filteredMatches.map((match) => (
                        <MatchCard
                            key={match.id}
                            id={match.id}
                            name={match.name}
                            category={match.category}
                            teamA={match.teamA}
                            teamB={match.teamB}
                            scoreA={match.scoreA}
                            scoreB={match.scoreB}
                            status={match.status}
                            date={match.date}
                            time={match.time}
                            location={match.location}
                            createdBy={match.createdBy}
                            tournamentId={match.tournamentId}
                            matchMinute={getMatchTime(match)}
                        />
                    ))}
                </div>
            ) : !loading ? (

                /* EMPTY/SEARCH STATE */
                <div className="sm:col-span-2 flex flex-col items-center justify-center text-center border border-dashed border-gray-700 rounded-xl p-10 bg-[#0F1115] w-full mx-auto min-h-[300px]">

                    <div className="p-3 rounded-full bg-white/5 border border-gray-700 mb-4">
                        <SportsSoccer className="text-gray-300" />
                    </div>

                    {/* DYNAMIC TITLE */}
                    <h3 className="text-sm font-semibold text-gray-200 mb-1">
                        {isSearching
                            ? "No matches found"
                            : "No matches yet"}
                    </h3>

                    {/* DYNAMIC MESSAGE */}
                    <p className="text-xs text-gray-400 mb-4 max-w-xs">
                        {isSearching
                            ? `No matches match "${search}". Try a different keyword.`
                            : "No matches created yet. Come back later."}
                    </p>

                    {/* OPTIONAL RESET */}
                    {isSearching && (
                        <button
                            onClick={() => setSearch("")}
                            className="text-xs text-[#FB831C]  cursor-pointer"
                        >
                            Clear search
                        </button>
                    )}
                </div>
            ) : null}

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