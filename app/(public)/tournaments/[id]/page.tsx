"use client";

import React, { useState } from "react";
import {
    ArrowDropDown,
    Close,
    EmojiEvents,
    EventBusy,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";
import useTournamentInfo, { DrawMatch } from "@/utils/logics/usetournamentinfo";
import useMatchesInfo from "@/utils/logics/usematchesinfo";
import MatchCard from "@/components/match/MatchCard";
import Empty from "@/components/ui/Empty";


function page() {
    const params = useParams();
    const router = useRouter();

    const tournamentId = params.id as string;

    // HOOKS — ALWAYS FIRST

    const {
        tournaments,
        loading,
    } = useTournamentInfo();

    const {
        matches,
        statusStyles,
    } = useMatchesInfo();

    const [activeTab, setActiveTab] = useState<
        "teams" | "standings" | "live" | "upcoming" | "past" | "stats"
    >("teams");

    const [statView, setStatView] = useState<
        "goals" | "assists" | "yellowCards" | "redCards"
    >("goals");

    const [openTeam, setOpenTeam] = useState<string | null>(null);

    // DATA

    const tournament = tournaments.find(
        (item) => item.id === tournamentId
    );

    const tournamentMatches = matches.filter(
        (m) => m.tournamentId === tournamentId
    );

    const upcomingMatches = tournamentMatches.filter(
        (m) => m.status === "upcoming"
    );

    const liveMatches = tournamentMatches.filter(
        (m) =>
            m.status === "live" ||
            m.status === "halftime"
    );

    const pastMatches = tournamentMatches.filter(
        (m) => m.status === "finished"
    );

    // TOURNAMENT-DEPENDENT DATA

    // const sortedPlayers = [
    //     ...(tournament?.topScorers || []),
    // ]
    //     .filter(
    //         (player) =>
    //             (player[statView] ?? 0) > 0
    //     )
    //     .sort(
    //         (a, b) =>
    //             (b[statView] ?? 0) -
    //             (a[statView] ?? 0)
    //     );

    const statLabels = {
        goals: "Goals",
        assists: "Assists",
        yellowCards: "Yellow Cards",
        redCards: "Red Cards",
    };

    const ROUND_ORDER: DrawMatch["round"][] = [
        "Round of 32",
        "Round of 16",
        "Quarter Final",
        "Semi Final",
        "Third Place",
        "Final",
    ];

    // MEMOIZED DATA

    const rounds = React.useMemo(() => {
        if (!tournament?.draw?.length) {
            return [];
        }

        const grouped: Record<
            DrawMatch["round"],
            DrawMatch[]
        > = {} as Record<
            DrawMatch["round"],
            DrawMatch[]
        >;

        tournament.draw.forEach((match) => {
            if (!grouped[match.round]) {
                grouped[match.round] = [];
            }

            grouped[match.round].push(match);
        });

        return ROUND_ORDER
            .filter(
                (round) =>
                    grouped[round]?.length
            )
            .map((round) => ({
                title: round,
                matches: grouped[round],
            }));
    }, [tournament?.draw]);

    const drawByRound = React.useMemo(() => {
        const grouped: Record<string, DrawMatch[]> = {};

        tournament?.draw?.forEach((match) => {
            if (!grouped[match.round]) {
                grouped[match.round] = [];
            }

            grouped[match.round].push(match);
        });

        return grouped;
    }, [tournament?.draw]);

    const allTournamentPlayers = React.useMemo(() => {
        if (!tournament?.teams?.length) return [];

        const recordedStats = tournament.topScorers ?? [];

        return tournament.teams.flatMap((team) =>
            (team.squad ?? []).map((player) => {
                // Try to find the player's recorded statistics.
                const stats = recordedStats.find((stat) => {
                    // Most reliable possibilities first
                    if (stat.id && player.id && stat.id === player.id) {
                        return true;
                    }

                    // If your stats use playerId instead of id
                    if (
                        "playerId" in stat &&
                        stat.playerId &&
                        stat.playerId === player.id
                    ) {
                        return true;
                    }

                    // Fallback to player name
                    if (
                        stat.playerName &&
                        player.name &&
                        stat.playerName.toLowerCase().trim() ===
                        player.name.toLowerCase().trim()
                    ) {
                        return true;
                    }

                    return false;
                });

                return {
                    id: player.id,
                    playerName: player.name,
                    teamName: team.name,

                    goals: stats?.goals ?? 0,
                    assists: stats?.assists ?? 0,
                    yellowCards: stats?.yellowCards ?? 0,
                    redCards: stats?.redCards ?? 0,
                };
            })
        );
    }, [tournament?.teams, tournament?.topScorers]);
    const sortedPlayers = React.useMemo(() => {
        return [...allTournamentPlayers].sort(
            (a, b) => b[statView] - a[statView]
        );
    }, [allTournamentPlayers, statView]);
    // CONDITIONAL RETURNS

    if (loading) {
        return <Loader />;
    }

    if (!tournament) {
        return <Loader />;
    }
    return (
        <div
            className="flex flex-col gap-3 w-[95%] mx-auto"
        >
            {/* Tabs */}
            <div className="flex gap-3 flex-wrap border-y border-[#FFFFFF1A] p-3 text-[12px] font-medium">
                {[
                    { key: "teams", label: "Teams" },
                    { key: "standings", label: "Draw" },
                    { key: "upcoming", label: "Upcoming " },
                    { key: "past", label: "Played " },
                    { key: "live", label: "Live " },
                    { key: "stats", label: "Player Stats" },
                ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key as any)}
                        className={`px-3 py-2 rounded-lg transition cursor-pointer  ${activeTab === tab.key
                            ? "bg-[#FFFFFF] text-[#171717]"
                            : "bg-[#FFFFFF1A] text-[#FFFFFF]"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto">

                {/*  STANDINGS  */}
                {activeTab === "teams" ?
                    <div className="space-y-3">
                        {tournament.teams.map((team) => {
                            const isOpen = openTeam === team.id;

                            return (
                                <div
                                    key={team.id}
                                    className={`overflow-hidden rounded-lg bg-[#131313] hover:bg-[#131313]/80 border ${isOpen ? "border-[#FB831C66]" : "border-[#FFFFFF33]"}`}
                                >
                                    <div

                                        className="flex w-full items-center justify-between px-4 py-3 text-left transition  "
                                    >
                                        <div className="flex items-center justify-center gap-3">
                                            <img src="/tournamentTeam.png" alt="" className="w-8 h-8 object-cover bg-white rounded-full" />
                                            <div className="flex flex-col gap-2">
                                                <h3 className="text-[16px] font-medium text-white">
                                                    {team.name}
                                                </h3>

                                                <p className="text-[12px] text-[#A1A1AA]">
                                                    {team.squad?.length || 0} Players
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() =>
                                                setOpenTeam(isOpen ? null : team.id)
                                            }
                                            className={`text-xl text-white transition-transform duration-200 cursor-pointer ${isOpen ? "rotate-180" : ""
                                                }`}
                                        >
                                            <ArrowDropDown />
                                        </button>
                                    </div>

                                    {isOpen && (
                                        <div className="bg-[#0B0B0B] p-4">
                                            {team.squad?.length ? (
                                                <div className="space-y-2">
                                                    {team.squad.map((player) => (
                                                        <div
                                                            key={player.id}
                                                            className="flex items-center justify-between border-b border-gray-700  py-3"
                                                        >
                                                            <div>
                                                                <p className="text-[16px] font-medium text-white">
                                                                    {player.name}
                                                                </p>

                                                                <p className="text-[12px] text-[#A1A1AA]">
                                                                    {player.position}
                                                                </p>
                                                            </div>

                                                            <span className="rounded-full bg-[#FB831C] px-3.25 py-1 text-[16px] font-medium text-white">
                                                                {player.jerseyNumber ?? "--"}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="rounded-lg border border-dashed border-gray-700 py-6 text-center text-sm text-gray-500">
                                                    No players added yet.
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    : activeTab === "standings" ? (
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
                                                            className="rounded-xl bg-[#131313] hover:bg-[#131313]/80 border border-[#FFFFFF33] overflow-hidden shadow-lg"
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
                                    <div className="flex items-center justify-center ">
                                        <Empty />
                                    </div>
                                )
                            )}
                            {activeTab === "stats" && (
                                <div className="space-y-4">

                                    {/* Table */}
                                    {sortedPlayers.length > 0 ? (
                                        <div className="w-full overflow-x-auto">
                                            <div className="w-full overflow-x-auto">
                                                <table className="w-full min-w-[600px] border-collapse text-left">
                                                    <thead>
                                                        <tr className="border-b-2 border-[#FB831C] text-[14px] text-[#A1A1AA]">
                                                            <th className="w-17.5 px-4 py-5 text-left font-medium ">
                                                                #
                                                            </th>

                                                            <th className="px-4 py-5 text-left font-medium ">
                                                                Player
                                                            </th>

                                                            <th className="w-20 px-4 py-5 text-right font-medium ">
                                                                GL
                                                            </th>

                                                            <th className="w-20 px-4 py-5 text-right font-medium ">
                                                                AST
                                                            </th>

                                                            <th className="w-20 px-4 py-5 text-right font-medium ">
                                                                YC
                                                            </th>

                                                            <th className="w-20 px-4 py-5 text-right font-medium ">
                                                                RC
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {sortedPlayers.map((player, index) => (
                                                            <tr
                                                                key={player.id}
                                                                className="border-b border-[#242424] transition hover:bg-white/[0.03] font-medium text-white text-[14px]"
                                                            >
                                                                <td className="px-4 py-6 font-medium text-[#A1A1AA]">
                                                                    {index + 1}
                                                                </td>

                                                                <td className="flex flex-col gap-2 px-4 py-6">
                                                                    <span >
                                                                        {player.playerName}
                                                                    </span>
                                                                    <span className=" text-[#A1A1AA] text-[12px] ">
                                                                        {player.teamName}
                                                                    </span>
                                                                </td>

                                                                <td className="px-4 py-6 text-right ">
                                                                    {player.goals ?? 0}
                                                                </td>

                                                                <td className="px-4 py-6 text-right ">
                                                                    {player.assists ?? 0}
                                                                </td>

                                                                <td className="px-4 py-6 text-right ">
                                                                    {player.yellowCards ?? 0}
                                                                </td>

                                                                <td className="px-4 py-6 text-right text-[16px] font-medium text-white">
                                                                    {player.redCards ?? 0}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="rounded-xl bg-[#131313] hover:bg-[#131313]/80 border border-[#FFFFFF33] p-8 text-center">
                                            <p className="text-gray-400">
                                                No players registered in this tournament.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    )}


            </div>


        </div>
    );
}

export default page;