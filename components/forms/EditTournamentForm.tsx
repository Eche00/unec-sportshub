
"use client";

import React, { useEffect, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Edit, Add } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";

import useTournamentInfo, { Team, Tournament } from "@/utils/logics/usetournamentinfo";
import useMatchesInfo, { Matches } from "@/utils/logics/usematchesinfo";

import CreateMatchForm from "@/components/forms/CreateMatchForm";
import MatchCard from "../match/MatchCard";
import toast from "react-hot-toast";

interface Props {
    tournament: Tournament;
    onClose: () => void;
}

function EditTournamentForm({ tournament, onClose }: Props) {
    const [tab, setTab] = useState<"standings" | "matches">("standings");
    const {
        editTournament,
        updateTournamentStatus,
        deleteTournament
    } = useTournamentInfo();
    const {
        matches,
        createMatch,
        setCreateMatch,
    } = useMatchesInfo();
    const [editTeams, setEditTeams] = useState<Record<string, Team>>({});

    useEffect(() => {
        if (!tournament?.teams) return;

        const initial: Record<string, Team> = {};

        tournament.teams.forEach((team) => {
            initial[team.name] = { ...team };
        });

        setEditTeams(initial);
    }, [tournament]);

    const saveTeams = async () => {
        const updatedTeams = tournament.teams.map((team) => {
            const edited = editTeams[team.name];

            return {
                ...team,
                ...edited, // only overrides changed fields
            };
        });

        await editTournament(tournament.id, {
            teams: updatedTeams,
        });

        toast.success("Standings updated");
    };
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
                            {tab === "matches" ? (
                                <Button
                                    onClick={() => setCreateMatch(true)}
                                    className="shrink-0"
                                >
                                    <Add fontSize="small" />
                                    Create Match
                                </Button>
                            ) : (
                                <div className="flex items-center gap-1 bg-[#111827] border border-gray-800 p-1.5 rounded-lg">
                                    <button
                                        onClick={() => updateTournamentStatus(tournament.id, "live")}
                                        className={`px-3 py-1.5 text-sm rounded-lg transition cursor-pointer ${tournament.status === "live"
                                            ? "bg-[#3B82F6] text-black"
                                            : "text-gray-400 hover:text-white"
                                            }`}
                                    >
                                        live
                                    </button>

                                    <button
                                        onClick={() => updateTournamentStatus(tournament.id, "finished")}
                                        className={`px-3 py-1.5 text-sm rounded-lg transition cursor-pointer ${tournament.status === "finished"
                                            ? "bg-[#3B82F6] text-black"
                                            : "text-gray-400 hover:text-white"
                                            }`}
                                    >
                                        Finish
                                    </button>

                                </div>
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
                                                        value={editTeams[team.name]?.played ?? 0}
                                                        onChange={(e) =>
                                                            setEditTeams((prev) => ({
                                                                ...prev,
                                                                [team.name]: {
                                                                    ...prev[team.name],
                                                                    played: Number(e.target.value),
                                                                },
                                                            }))
                                                        }
                                                    />
                                                </td>

                                                <td className="p-2">
                                                    <Input
                                                        type="number"
                                                        value={editTeams[team.name]?.won ?? 0}
                                                        onChange={(e) =>
                                                            setEditTeams((prev) => ({
                                                                ...prev,
                                                                [team.name]: {
                                                                    ...prev[team.name],
                                                                    won: Number(e.target.value),
                                                                },
                                                            }))
                                                        }
                                                    />
                                                </td>

                                                <td className="p-2">
                                                    <Input
                                                        type="number"
                                                        value={editTeams[team.name]?.drawn ?? 0}
                                                        onChange={(e) =>
                                                            setEditTeams((prev) => ({
                                                                ...prev,
                                                                [team.name]: {
                                                                    ...prev[team.name],
                                                                    drawn: Number(e.target.value),
                                                                },
                                                            }))
                                                        }
                                                    />
                                                </td>

                                                <td className="p-2">
                                                    <Input
                                                        type="number"
                                                        value={editTeams[team.name]?.lost ?? 0}
                                                        onChange={(e) =>
                                                            setEditTeams((prev) => ({
                                                                ...prev,
                                                                [team.name]: {
                                                                    ...prev[team.name],
                                                                    lost: Number(e.target.value),
                                                                },
                                                            }))
                                                        }
                                                    />
                                                </td>

                                                <td className="p-2">
                                                    <Input
                                                        type="number"
                                                        value={editTeams[team.name]?.goalsFor ?? 0}
                                                        onChange={(e) =>
                                                            setEditTeams((prev) => ({
                                                                ...prev,
                                                                [team.name]: {
                                                                    ...prev[team.name],
                                                                    goalsFor: Number(e.target.value),
                                                                },
                                                            }))
                                                        }
                                                    />
                                                </td>

                                                <td className="p-2">
                                                    <Input
                                                        type="number"
                                                        value={editTeams[team.name]?.goalsAgainst ?? 0}
                                                        onChange={(e) =>
                                                            setEditTeams((prev) => ({
                                                                ...prev,
                                                                [team.name]: {
                                                                    ...prev[team.name],
                                                                    goalsAgainst: Number(e.target.value),
                                                                },
                                                            }))
                                                        }

                                                    />
                                                </td>

                                                <td className="p-2">
                                                    <Input
                                                        type="number"
                                                        value={editTeams[team.name]?.points ?? 0}
                                                        onChange={(e) =>
                                                            setEditTeams((prev) => ({
                                                                ...prev,
                                                                [team.name]: {
                                                                    ...prev[team.name],
                                                                    points: Number(e.target.value),
                                                                },
                                                            }))
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

                <div className="w-full flex items-end justify-end gap-4 py-5 mb-10  border-t-[0.1px] border-gray-400">

                    <Button
                        onClick={() => { deleteTournament(tournament.id); onClose(); }}
                        variant="secondaryRed"
                    >
                        Delete Tournament
                    </Button>

                    <Button
                        onClick={saveTeams}
                        variant="primary"
                    >
                        Update Standings
                    </Button>
                </div>
            </motion.aside>
        </div >
    );
}

export default EditTournamentForm;
