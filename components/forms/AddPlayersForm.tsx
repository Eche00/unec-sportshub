"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import Input from "../ui/Input";
import useTournamentInfo, { Player, Team, Tournament } from "@/utils/logics/usetournamentinfo";
import toast from "react-hot-toast";


type Props = {
    isOpen: boolean;
    onClose: () => void;
    tournament: Tournament;
    team: Team | null;
};

export default function AddPlayersForm({
    isOpen,
    onClose,
    tournament,
    team,
}: Props) {
    const { editTournament } = useTournamentInfo();
    const [players, setPlayers] = useState<Player[]>([]);

    const [currentName, setCurrentName] = useState("");
    const [currentJersey, setCurrentJersey] = useState("");
    const [currentPosition, setCurrentPosition] =
        useState<Player["position"]>("Forward");

    useEffect(() => {
        if (team) {
            setPlayers(team.squad || []);
        }
    }, [team]);
    if (!isOpen || !team) return null;

    const handleAddPlayer = () => {
        if (!currentName.trim()) {
            toast.error("Enter a player name");
            return;
        }

        if (!currentJersey.trim()) {
            toast.error("Please enter a jersey number");
            return;
        }

        setPlayers((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                name: currentName.trim(),
                jerseyNumber: Number(currentJersey),
                position: currentPosition,
            },
        ]);

        setCurrentName("");
        setCurrentJersey("");
        setCurrentPosition("Forward");
    };
    const removePlayer = (id: string) => {
        setPlayers((prev) => prev.filter((p) => p.id !== id));
    };
    const handleSavePlayers = async () => {
        const updatedTeams = tournament.teams.map((t) =>
            t.id === team.id
                ? {
                    ...t,
                    squad: players,
                }
                : t
        );

        await editTournament(tournament.id, {
            teams: updatedTeams,
        });

        onClose();
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
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white">
                            {team.name}
                        </h2>

                        <p className="text-sm text-gray-400">
                            Add Player
                        </p>
                    </div>

                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </div>

                <div className="space-y-4">

                    <div className="flex flex-wrap gap-2">
                        {players.map((player) => (
                            <div
                                key={player.id}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F1115] border border-gray-700 text-sm"
                            >
                                <span>
                                    {player.name}
                                    {player.jerseyNumber && ` #${player.jerseyNumber}`}
                                </span>

                                <button
                                    type="button"
                                    onClick={() => removePlayer(player.id)}
                                    className="text-gray-400 hover:text-red-400"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    <Input
                        placeholder="Player name"
                        value={currentName}
                        onChange={(e) => setCurrentName(e.target.value)}
                    />

                    <div className="grid grid-cols-2 gap-3">

                        <Input
                            placeholder="Jersey No."
                            type="number"
                            value={currentJersey}
                            onChange={(e) =>
                                setCurrentJersey(e.target.value)
                            }
                        />

                        <select
                            value={currentPosition}
                            onChange={(e) =>
                                setCurrentPosition(
                                    e.target.value as Player["position"]
                                )
                            }
                            className="rounded-lg border border-gray-700 bg-[#111827] p-3 text-white"
                        >
                            <option value="Goalkeeper">Goalkeeper</option>
                            <option value="Defender">Defender</option>
                            <option value="Midfielder">Midfielder</option>
                            <option value="Forward">Forward</option>
                        </select>

                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleAddPlayer}
                            disabled={!currentName.trim()}
                        >
                            Add Player
                        </Button>

                        <Button
                            onClick={handleSavePlayers}
                        >
                            Save Squad
                        </Button>

                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="mb-3 text-lg font-semibold text-white">
                        Squad ({team.squad?.length || 0})
                    </h3>

                    <div className="space-y-2">
                        {(team.squad || []).map((player) => (
                            <div
                                key={player.id}
                                className="rounded-lg bg-[#111827] p-3"
                            >
                                <div className="font-medium text-white">
                                    {player.name}
                                </div>

                                <div className="text-sm text-gray-400">
                                    #{player.jerseyNumber || "--"} •{" "}
                                    {player.position}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.aside>
        </div>

    );
}