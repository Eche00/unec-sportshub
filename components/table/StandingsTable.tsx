"use client";

import React, { useState } from "react";
import {
    Close,
    EmojiEvents,
    EventBusy,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { DrawMatch, Tournament } from "@/utils/logics/usetournamentinfo";
import MatchCard from "../match/MatchCard";
import useMatchesInfo from "@/utils/logics/usematchesinfo";



type Props = {
    tournament: Tournament;
    onClose: () => void;
};

function StandingsTable({ tournament, onClose }: Props) {
    const [activeTab, setActiveTab] = useState<
        "standings" | "live" | "upcoming" | "past" | "top-scorers"
    >("standings");


    const {
        matches,
        statusStyles
    } = useMatchesInfo();
    const tournamentMatches = matches.filter(
        (m) => m.tournamentId === tournament?.id
    );
    const upcomingMatches = tournamentMatches.filter(
        (m) => m.status === "upcoming"
    );

    const liveMatches = tournamentMatches.filter(
        (m) => m.status === "live" || m.status === "halftime"
    );

    const pastMatches = tournamentMatches.filter(
        (m) => m.status === "finished"
    );

    const ROUND_ORDER: DrawMatch["round"][] = [
        "Round of 32",
        "Round of 16",
        "Quarter Final",
        "Semi Final",
        "Third Place",
        "Final",
    ];

    const rounds = React.useMemo(() => {
        if (!tournament.draw?.length) return [];

        const grouped: Record<DrawMatch["round"], DrawMatch[]> = {} as any;

        tournament.draw.forEach((match) => {
            if (!grouped[match.round]) grouped[match.round] = [];
            grouped[match.round].push(match);
        });

        return ROUND_ORDER
            .filter((round) => grouped[round]?.length)
            .map((round) => ({
                title: round,
                matches: grouped[round],
            }));
    }, [tournament.draw]);
    const drawByRound = React.useMemo(() => {
        const grouped: Record<string, typeof tournament.draw> = {};

        tournament.draw?.forEach((match) => {
            if (!grouped[match.round]) {
                grouped[match.round] = [];
            }

            grouped[match.round]!.push(match);
        });

        return grouped;
    }, [tournament.draw]);


    return (
        <div
            className="fixed inset-0 top-16.5 bg-black/60 z-50 flex justify-end"
            onClick={onClose}
        >
            <motion.aside
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 200, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0F172A] sm:w-[650px] w-full h-full border-l border-gray-800 rounded-tl-2xl rounded-bl-2xl p-4 sm:p-6 overflow-y-auto flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <EmojiEvents className="text-[#3B82F6]" />
                        <h3 className="text-lg font-semibold capitalize">
                            {tournament.name} -  <span className=" text-sm">{tournament.category}</span>
                        </h3>
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

                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/5 transition"
                    >
                        <Close />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-gray-800 pb-2 text-sm">
                    {[
                        { key: "standings", label: "Standings" },
                        { key: "upcoming", label: "Upcoming " },
                        { key: "past", label: "Past " },
                        { key: "live", label: "Live " },
                        { key: "top-scorers", label: "Top Scorers " },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as any)}
                            className={`px-3 py-1 rounded-lg transition cursor-pointer  ${activeTab === tab.key
                                ? "bg-white/10 text-white"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* CONTENT */}
                <div className="flex-1 overflow-y-auto">

                    {/*  STANDINGS  */}
                    {activeTab === "standings" ? (
                        tournament.settings?.format === "league" ? (
                            <div className="rounded-xl border border-gray-800 overflow-hidden">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-[#0F1115] text-gray-400 text-xs uppercase">
                                        <tr>
                                            <th className="p-3">#</th>
                                            <th className="p-3">Team</th>
                                            <th className="p-3">MP</th>
                                            <th className="p-3">W</th>
                                            <th className="p-3">D</th>
                                            <th className="p-3">L</th>
                                            <th className="p-3">GF</th>
                                            <th className="p-3">GA</th>
                                            <th className="p-3">Pts</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {[...tournament.teams]
                                            .sort((a, b) => {
                                                if ((b.points ?? 0) !== (a.points ?? 0)) {
                                                    return (b.points ?? 0) - (a.points ?? 0);
                                                }

                                                const bGD =
                                                    (b.goalsFor ?? 0) - (b.goalsAgainst ?? 0);
                                                const aGD =
                                                    (a.goalsFor ?? 0) - (a.goalsAgainst ?? 0);

                                                if (bGD !== aGD) return bGD - aGD;

                                                if ((b.goalsFor ?? 0) !== (a.goalsFor ?? 0)) {
                                                    return (b.goalsFor ?? 0) - (a.goalsFor ?? 0);
                                                }

                                                return a.name.localeCompare(b.name);
                                            })
                                            .map((team, index) => (
                                                <tr
                                                    key={team.id ?? index}
                                                    className="border-t border-gray-800 hover:bg-white/5"
                                                >
                                                    <td className="p-3">{index + 1}</td>
                                                    <td className="p-3 text-gray-200">{team.name}</td>
                                                    <td className="p-3">{team.played}</td>
                                                    <td className="p-3">{team.won ?? "-"}</td>
                                                    <td className="p-3">{team.drawn ?? "-"}</td>
                                                    <td className="p-3">{team.lost ?? "-"}</td>
                                                    <td className="p-3">{team.goalsFor ?? "-"}</td>
                                                    <td className="p-3">{team.goalsAgainst ?? "-"}</td>
                                                    <td className="p-3 font-bold">
                                                        {team.points ?? 0}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">
                                            Tournament Bracket
                                        </h3>

                                    </div>

                                    <div className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs">
                                        Knockout
                                    </div>
                                </div>
                                <div className=" flex flex-wrap w-full gap-3"> {[...tournament.teams].map((team, index) => (<p key={team.id ?? index} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F1115] border border-gray-700 text-sm text-gray-200">{team.name}</p>))}</div>
                                <div className="overflow-x-auto pb-4">
                                    <div className="flex gap-8 min-w-max">

                                        {rounds.map((round) => (

                                            <div
                                                key={round.title}
                                                className="w-72 flex-shrink-0"
                                            >
                                                <div className="mb-4">
                                                    <h4 className="text-center font-semibold text-slate-200">
                                                        {round.title}
                                                    </h4>

                                                    <div className="mt-2 h-px bg-gray-700" />
                                                </div>

                                                <div className="space-y-5">

                                                    {(drawByRound[round.title] ?? []).map((match) => (

                                                        <div
                                                            key={match.id}
                                                            className="rounded-xl border border-gray-700 bg-[#111827] overflow-hidden shadow-lg"
                                                        >

                                                            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">

                                                                <div className="flex items-center gap-3">

                                                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-semibold">
                                                                        {match.teamA?.name.charAt(0) ?? "?"}
                                                                    </div>

                                                                    <span
                                                                        className={
                                                                            match.teamA
                                                                                ? "text-white"
                                                                                : "text-gray-400"
                                                                        }
                                                                    >
                                                                        {match.teamA?.name ?? "Team TBD"}
                                                                    </span>

                                                                </div>

                                                                <span className="font-mono text-gray-500">
                                                                    VS
                                                                </span>

                                                            </div>

                                                            <div className="flex items-center justify-between px-4 py-3">

                                                                <div className="flex items-center gap-3">

                                                                    <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-xs font-semibold">
                                                                        {match.teamB?.name.charAt(0) ?? "?"}
                                                                    </div>

                                                                    <span
                                                                        className={
                                                                            match.teamB
                                                                                ? "text-white"
                                                                                : "text-gray-400"
                                                                        }
                                                                    >
                                                                        {match.teamB?.name ?? "Team TBD"}
                                                                    </span>

                                                                </div>

                                                                <span className="font-mono text-gray-500">
                                                                    VS
                                                                </span>

                                                            </div>

                                                        </div>

                                                    ))}

                                                </div>
                                            </div>

                                        ))}

                                    </div>
                                </div>
                                <div className="rounded-xl border border-dashed border-gray-700 bg-[#111827]/50 p-5 text-center">

                                    <p className="text-gray-300 font-medium">
                                        Matchups will appear here after the tournament draw.
                                    </p>

                                    <p className="text-sm text-gray-500 mt-2">
                                        {tournament.teams.length} teams are currently registered and waiting
                                        to be seeded into the bracket.
                                    </p>

                                </div>

                            </div>
                        )
                    ) : (
                        <div className="flex flex-col gap-4">

                            {activeTab === "upcoming" && (
                                upcomingMatches.length > 0 ? (
                                    upcomingMatches.map((match) => (
                                        <MatchCard key={match.id} {...match} />
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                                            <EventBusy className="text-slate-400 !text-4xl" />
                                        </div>

                                        <h3 className="text-lg font-semibold text-white">
                                            No Upcoming Matches
                                        </h3>

                                        <p className="mt-2 max-w-sm text-sm text-slate-400">
                                            There are currently no scheduled matches for this tournament.
                                        </p>
                                    </div>
                                )
                            )}

                            {activeTab === "past" && (
                                pastMatches.length > 0 ? (
                                    pastMatches.map((match) => (
                                        <MatchCard key={match.id} {...match} />
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                                            <EventBusy className="text-slate-400 !text-4xl" />
                                        </div>

                                        <h3 className="text-lg font-semibold text-white">
                                            No Past Matches
                                        </h3>

                                        <p className="mt-2 max-w-sm text-sm text-slate-400">
                                            There are currently no past matches for this tournament.
                                        </p>
                                    </div>
                                )
                            )}

                            {activeTab === "live" && (
                                liveMatches.length > 0 ? (
                                    liveMatches.map((match) => (
                                        <MatchCard key={match.id} {...match} />
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                                            <EventBusy className="text-slate-400 !text-4xl" />
                                        </div>

                                        <h3 className="text-lg font-semibold text-white">
                                            No Live Matches
                                        </h3>

                                        <p className="mt-2 max-w-sm text-sm text-slate-400">
                                            There are currently no live matches for this tournament.
                                        </p>
                                    </div>
                                )
                            )}
                            {activeTab === "top-scorers" && (
                                <>
                                    <h2 className="text-lg font-semibold">
                                        Top Scorers
                                    </h2>
                                    <div className="space-y-3">
                                        {(tournament.topScorers?.length ?? 0) > 0 ? (
                                            tournament.topScorers!
                                                .sort((a, b) => b.goals - a.goals)
                                                .map((player, index) => (
                                                    <div
                                                        key={player.id}
                                                        className="flex items-center justify-between rounded-xl border border-gray-700 bg-[#111827] px-4 py-2 hover:border-[#3B82F6] transition-all"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex items-center justify-center rounded-full font-bold text-xs">
                                                                #{index + 1}
                                                            </div>

                                                            <div>
                                                                <h3 className="font-semibold text-white">
                                                                    {player.playerName}
                                                                </h3>

                                                                <p className="text-xs text-gray-400">
                                                                    {player.teamName}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-3">
                                                            <span className="text-sm text-gray-400 md:inline hidden">
                                                                Goals
                                                            </span>

                                                            <div className="text-center text-lg font-bold text-white bg-[#0F1115] border border-gray-700 rounded-lg px-2 text-sm">
                                                                {player.goals}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                        ) : (
                                            <div className="rounded-xl border border-dashed border-gray-700 bg-[#111827] p-6 text-center">
                                                <p className="text-sm text-gray-400">
                                                    No top scorers yet.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                        </div>
                    )}


                </div>
            </motion.aside>


        </div>
    );
}

export default StandingsTable;