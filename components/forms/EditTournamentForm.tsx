
"use client";

import React, { useEffect, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Edit, Add } from "@mui/icons-material";
import { motion } from "framer-motion";

import useTournamentInfo, { Tournament } from "@/utils/logics/usetournamentinfo";
import useMatchesInfo, { Matches } from "@/utils/logics/usematchesinfo";

import CreateMatchForm from "@/components/forms/CreateMatchForm";

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
    } = useMatchesInfo();

    return (
        <div
            className="fixed inset-0 bg-black/60 flex justify-end z-50"
            onClick={onClose}
        >
            <motion.aside
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 200, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-[#0F172A] sm:w-[540px] w-[100%] min-h-0  overflow-scroll border-l border-gray-800 rounded-tl-2xl rounded-bl-2xl p-6 overflow-y-scroll flex flex-col mt-10"
                onClick={(e) => e.stopPropagation()}
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
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold capitalize">{tab}</h3>

                        <div className="flex items-center gap-1 bg-[#0F172A] border border-gray-800 p-1.5 rounded-lg ">
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
                    {tab === "standings" ? (
                        <div className="rounded-xl border border-gray-800 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-[800px] w-full text-sm text-left">
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
                        <div className="rounded-xl border border-gray-800 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-[800px] w-full text-sm text-left">
                                    <thead className="bg-[#0F1115] text-gray-400 text-xs uppercase">
                                        <tr>
                                            <th className="p-3">Match</th>
                                            <th className="p-3">Status</th>
                                            <th className="p-3">Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {matches?.map((match) => (
                                            <tr
                                                key={match.id}
                                                className="border-t border-gray-800 hover:bg-white/5"
                                            >
                                                {/* MATCH */}
                                                <td className="p-3">
                                                    {match.teamA} vs {match.teamB}
                                                </td>

                                                {/* STATUS */}
                                                <td className="p-3">
                                                    <span
                                                        className={
                                                            match.status === "live"
                                                                ? "text-green-400"
                                                                : match.status === "finished"
                                                                    ? "text-gray-400"
                                                                    : "text-yellow-400"
                                                        }
                                                    >
                                                        {match.status.toUpperCase()}
                                                    </span>
                                                </td>

                                                {/* SCORE */}
                                                <td className="p-3">
                                                    {match.scoreA ?? 0} -{" "}
                                                    {match.scoreB ?? 0}
                                                </td>


                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>)}
                </>
                {/* CREATE MATCH */}
                {tab != "standings" && <div className="flex justify-end items-end my-3">

                    <Button onClick={() => setCreateMatch(true)}>
                        <Add fontSize="small" />
                        Create Match
                    </Button>
                </div>
                }


                {/* SCORE MODAL */}
                {/* {selectedMatch && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                        <div className="bg-[#0F172A] border border-gray-800 p-5 rounded-xl w-full max-w-md space-y-4">
                            <h3 className="text-lg font-semibold">
                                Edit Live Match
                            </h3>

                            <div className="flex gap-3">
                                <Input
                                    type="number"
                                    value={editScoreA}
                                    onChange={(e) =>
                                        setEditScoreA(Number(e.target.value))
                                    }
                                />

                                <Input
                                    type="number"
                                    value={editScoreB}
                                    onChange={(e) =>
                                        setEditScoreB(Number(e.target.value))
                                    }
                                />
                            </div>

                            <div className="flex justify-end gap-3">
                                <Button
                                    variant="secondary"
                                    onClick={() => setSelectedMatch(null)}
                                >
                                    Cancel
                                </Button>
                                <Button onClick={saveMatch}>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                )} */}

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
