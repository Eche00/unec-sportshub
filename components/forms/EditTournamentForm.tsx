
"use client";

import React, { useEffect, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Edit, Add } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";

import useTournamentInfo, { Tournament } from "@/utils/logics/usetournamentinfo";
import useMatchesInfo, { Matches } from "@/utils/logics/usematchesinfo";

import CreateMatchForm from "@/components/forms/CreateMatchForm";
import ManageMatches from "../table/ManageMatches";
import MatchCard from "../match/MatchCard";

interface Props {
    tournament: Tournament;
    onClose: () => void;
}

function EditTournamentForm({ tournament, onClose }: Props) {
    const [tab, setTab] = useState<"standings" | "matches">("standings");
    const {
        updateTeam,
    } = useTournamentInfo();
    const {
        matches,
        createMatch,
        setCreateMatch,
        manageMatches,
        setManageMatches,
        handleClick
    } = useMatchesInfo();

    return (
        <div
            className="fixed inset-0 bg-black/60 z-50 flex justify-end"
            onClick={onClose}
        >

            <motion.aside

                initial={{
                    x: 300,
                    opacity: 0,
                }}

                animate={{
                    x: 0,
                    opacity: 1,
                }}

                exit={{
                    x: 300,
                    opacity: 0,
                }}

                transition={{
                    duration: 0.3,
                }}

                onClick={(e) =>
                    e.stopPropagation()
                }

                className="bg-[#0F172A] sm:w-[650px] mt-16 mb-10  w-full h-[90vh]  border-l border-gray-800 rounded-tl-2xl rounded-bl-2xl p-5 sm:p-6 overflow-y-auto flex flex-col"
            >
                {/* HEADER */}
                <div className="mt-8 flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        Manage {tournament.name}
                    </h2>

                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </div>

                {/*  TABLE / STANDINGS  */}
                <>
                    {/* CONTROLS */}
                    <div className="sticky top-0 z-20 bg-[#0F172A] pb-4">
                        <div className="flex items-center justify-between gap-3">

                            {/* LEFT */}
                            <div className="flex items-center gap-3">

                                <div className="flex items-center gap-1 bg-[#111827] border border-gray-800 p-1.5 rounded-lg">
                                    <button
                                        onClick={() => setTab("standings")}
                                        className={`px-3 py-1.5 text-sm rounded-lg transition cursor-pointer ${tab === "standings"
                                            ? "bg-[#3B82F6] text-black"
                                            : "text-gray-400 hover:text-white"
                                            }`}
                                    >
                                        Standings
                                    </button>

                                    <button
                                        onClick={() => setTab("matches")}
                                        className={`px-3 py-1.5 text-sm rounded-lg transition cursor-pointer ${tab === "matches"
                                            ? "bg-[#3B82F6] text-black"
                                            : "text-gray-400 hover:text-white"
                                            }`}
                                    >
                                        Matches
                                    </button>
                                </div>
                            </div>

                            {/* RIGHT */}
                            {tab === "matches" && (
                                <Button
                                    onClick={() => setCreateMatch(true)}
                                    className="shrink-0"
                                >
                                    <Add fontSize="small" />
                                    Create Match
                                </Button>
                            )}
                        </div>
                    </div>
                    {tab === "standings" ? (
                        <div className="rounded-xl border border-gray-800 overflow-scroll">
                            <div className="overflow-auto">
                                <table className="min-w-[800px] w-full text-sm text-left text-nowrap">
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
                                        {tournament.teams.map((team, index) => (
                                            <tr
                                                key={team.name}
                                                className="border-t border-gray-800 hover:bg-white/5"
                                            >
                                                <td className="p-3">{index + 1}</td>

                                                <td className="p-3 text-gray-200">
                                                    {team.name}
                                                </td>

                                                <td className="p-2">
                                                    <Input
                                                        type="number"
                                                        value={team.played}
                                                        onChange={(e) =>
                                                            updateTeam(
                                                                tournament.id,
                                                                team.name,
                                                                { played: Number(e.target.value) }
                                                            )
                                                        }
                                                    />
                                                </td>

                                                <td className="p-2">
                                                    <Input
                                                        type="number"
                                                        value={team.won}
                                                        onChange={(e) =>
                                                            updateTeam(
                                                                tournament.id,
                                                                team.name,
                                                                { won: Number(e.target.value) }
                                                            )
                                                        }
                                                    />
                                                </td>

                                                <td className="p-2">
                                                    <Input
                                                        type="number"
                                                        value={team.drawn}
                                                        onChange={(e) =>
                                                            updateTeam(
                                                                tournament.id,
                                                                team.name,
                                                                { drawn: Number(e.target.value) }
                                                            )
                                                        }
                                                    />
                                                </td>

                                                <td className="p-2">
                                                    <Input
                                                        type="number"
                                                        value={team.lost}
                                                        onChange={(e) =>
                                                            updateTeam(
                                                                tournament.id,
                                                                team.name,
                                                                { lost: Number(e.target.value) }
                                                            )
                                                        }
                                                    />
                                                </td>

                                                <td className="p-2">
                                                    <Input
                                                        type="number"
                                                        value={team.goalsFor}
                                                        onChange={(e) =>
                                                            updateTeam(
                                                                tournament.id,
                                                                team.name,
                                                                { goalsFor: Number(e.target.value) }
                                                            )
                                                        }
                                                    />
                                                </td>

                                                <td className="p-2">
                                                    <Input
                                                        type="number"
                                                        value={team.goalsAgainst}
                                                        onChange={(e) =>
                                                            updateTeam(
                                                                tournament.id,
                                                                team.name,
                                                                { goalsAgainst: Number(e.target.value) }
                                                            )
                                                        }
                                                    />
                                                </td>

                                                <td className="p-2">
                                                    <Input
                                                        type="number"
                                                        value={team.points}
                                                        onChange={(e) =>
                                                            updateTeam(
                                                                tournament.id,
                                                                team.name,
                                                                { points: Number(e.target.value) }
                                                            )
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    ) : (
                        <div className="flex flex-col gap-4">

                            {matches.filter((m) => m.tournamentId === tournament?.id).map((match) => (
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

                        </div>)}
                </>


                {/* CREATE MATCH */}
                {createMatch && (
                    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                        <div className="w-full max-w-lg">
                            <CreateMatchForm
                                onClose={() => setCreateMatch(false)}
                                tournamentId={tournament.id}

                            />
                        </div>
                    </div>
                )}

            </motion.aside>
        </div >
    );
}

export default EditTournamentForm;
