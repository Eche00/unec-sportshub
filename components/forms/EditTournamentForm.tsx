import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Edit } from "@mui/icons-material";
import { motion } from "framer-motion";

type Team = {
    name: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor?: number;
    goalsAgainst?: number;
    points: number;
};

type MatchPhase = "notStarted" | "firstHalf" | "secondHalf" | "extraTime" | "penalties" | "finished";

type MatchStatus = "upcoming" | "live" | "past";

type Match = {
    id: string;
    home: string;
    away: string;
    score?: string;
    date?: string;
    status: MatchStatus;
    phase: MatchPhase;
};

interface Props {
    teams: Team[];
    onClose: () => void;
}

function EditTournamentForm({ teams: initialTeams, onClose }: Props) {

    const [teams, setTeams] = useState<Team[]>(initialTeams);

    const updateTeam = (index: number, field: keyof Team, value: number) => {
        const updated = [...teams];
        updated[index] = { ...updated[index], [field]: value };
        setTeams(updated);
    };

    const [matches, setMatches] = useState<Match[]>([
        { id: "1", home: "Team A", away: "Team B", date: "Today 4PM", status: "upcoming", phase: "notStarted" },
        { id: "2", home: "Team C", away: "Team A", score: "1 - 2", status: "past", phase: "finished" },
    ]);

    const upcomingMatches = matches.filter((m) => m.status === "upcoming");
    const liveMatches = matches.filter((m) => m.status === "live");
    const pastMatches = matches.filter((m) => m.status === "past");

    const startMatch = (id: string) => {
        setMatches(prev =>
            prev.map(m =>
                m.id === id
                    ? { ...m, status: "live", phase: "firstHalf" }
                    : m
            )
        );
    };

    const endMatch = (id: string) => {
        setMatches(prev =>
            prev.map(m =>
                m.id === id
                    ? { ...m, status: "past", phase: "finished" }
                    : m
            )
        );
    };

    const setPhase = (id: string, phase: MatchPhase) => {
        setMatches(prev =>
            prev.map(m =>
                m.id === id ? { ...m, phase } : m
            )
        );
    };

    const [newHome, setNewHome] = useState("");
    const [newAway, setNewAway] = useState("");
    const [newDate, setNewDate] = useState("");

    const addMatch = () => {
        if (!newHome || !newAway) return;

        const newMatch: Match = {
            id: Date.now().toString(),
            home: newHome,
            away: newAway,
            date: newDate,
            status: "upcoming",
            phase: "notStarted",
        };

        setMatches((prev) => [...prev, newMatch]);

        setNewHome("");
        setNewAway("");
        setNewDate("");
    };

    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
    const [editScoreA, setEditScoreA] = useState<number>(0);
    const [editScoreB, setEditScoreB] = useState<number>(0);

    const openEditModal = (match: Match) => {
        if (match.status !== "live") return;

        setSelectedMatch(match);

        const [a, b] =
            match.score?.split("-").map((n) => Number(n.trim())) || [0, 0];

        setEditScoreA(a);
        setEditScoreB(b);
    };

    const saveMatch = () => {
        if (!selectedMatch) return;

        setMatches(prev =>
            prev.map(m =>
                m.id === selectedMatch.id
                    ? { ...m, score: `${editScoreA} - ${editScoreB}` }
                    : m
            )
        );

        setSelectedMatch(null);
    };

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
                className="bg-[#0F172A] sm:w-[80%] w-full h-full border-l border-gray-800 rounded-tl-2xl rounded-bl-2xl p-4 sm:p-6 overflow-y-auto flex flex-col"
            >
                {/* HEADER */}
                <div className="mt-8 flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-2">
                    <h2 className="text-lg md:text-xl font-semibold">Manage Tournament</h2>
                    <Button variant="secondary" onClick={onClose} className="w-full md:w-auto">
                        Close
                    </Button>
                </div>

                {/* ---------------- STANDINGS ---------------- */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Standings Editor</h3>

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
                                    {teams.map((team, index) => (
                                        <tr key={team.name} className="border-t border-gray-800 hover:bg-white/5">
                                            <td className="p-3">{index + 1}</td>
                                            <td className="p-3 text-gray-200">{team.name}</td>

                                            <td className="p-2"><Input type="number" value={team.played} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateTeam(index, "played", Number(e.target.value))} /></td>
                                            <td className="p-2"><Input type="number" value={team.won} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateTeam(index, "won", Number(e.target.value))} /></td>
                                            <td className="p-2"><Input type="number" value={team.drawn} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateTeam(index, "drawn", Number(e.target.value))} /></td>
                                            <td className="p-2"><Input type="number" value={team.lost} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateTeam(index, "lost", Number(e.target.value))} /></td>
                                            <td className="p-2"><Input type="number" value={team.goalsFor ?? 0} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateTeam(index, "goalsFor", Number(e.target.value))} /></td>
                                            <td className="p-2"><Input type="number" value={team.goalsAgainst ?? 0} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateTeam(index, "goalsAgainst", Number(e.target.value))} /></td>
                                            <td className="p-2"><Input type="number" value={team.points} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateTeam(index, "points", Number(e.target.value))} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ---------------- CREATE MATCH ---------------- */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Create Match</h3>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <Input placeholder="Team A" value={newHome} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewHome(e.target.value)} />
                        <Input placeholder="Team B" value={newAway} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewAway(e.target.value)} />
                        <Input type="datetime-local" value={newDate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDate(e.target.value)} />
                        <Button className="w-full md:w-auto" onClick={addMatch}>Add Match</Button>
                    </div>
                </div>

                {/* ---------------- UPCOMING ---------------- */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Upcoming Matches</h3>

                    {upcomingMatches.map((match) => (
                        <div key={match.id} className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 p-4 border border-gray-800 rounded-lg mb-2">
                            <span>{match.home} vs {match.away}</span>
                            <Button className="w-full md:w-auto" onClick={() => startMatch(match.id)}>Start Match</Button>
                        </div>
                    ))}
                </div>

                {/* ---------------- LIVE ---------------- */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Live Matches</h3>

                    {liveMatches.map((match) => (
                        <div key={match.id} className="p-4 border border-green-600 rounded-lg mb-3 space-y-3">

                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                                <span>{match.home} vs {match.away}</span>
                                <span className="text-green-400">LIVE</span>
                            </div>

                            <div className="flex flex-wrap gap-2 text-sm">
                                <Button onClick={() => setPhase(match.id, "firstHalf")}>1st Half</Button>
                                <Button onClick={() => setPhase(match.id, "secondHalf")}>2nd Half</Button>
                                <Button onClick={() => setPhase(match.id, "extraTime")}>Extra Time</Button>
                                <Button onClick={() => setPhase(match.id, "penalties")}>Penalties</Button>
                            </div>

                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                                <span>Score: {match.score || "0 - 0"}</span>

                                <button onClick={() => openEditModal(match)} className="p-2 hover:bg-white/10 rounded-lg w-fit">
                                    <Edit fontSize="small" />
                                </button>
                            </div>

                            <Button className="w-full md:w-auto" onClick={() => endMatch(match.id)}>
                                End Match
                            </Button>
                        </div>
                    ))}
                </div>

                {/* ---------------- PAST ---------------- */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Past Matches</h3>

                    {pastMatches.map((match) => (
                        <div key={match.id} className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 p-4 border border-gray-800 rounded-lg mb-2">
                            <span>{match.home} vs {match.away}</span>
                            <span>{match.score}</span>
                        </div>
                    ))}
                </div>

                {/* ---------------- EDIT MODAL ---------------- */}
                {selectedMatch && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                        <div className="bg-[#0F172A] border border-gray-800 p-5 md:p-6 rounded-xl w-full max-w-md space-y-4">

                            <h3 className="text-lg font-semibold">Edit Live Match</h3>

                            <p className="text-sm text-gray-400">
                                {selectedMatch.home} vs {selectedMatch.away}
                            </p>

                            <div className="flex flex-col md:flex-row gap-3">
                                <Input label="Home Score" type="number" value={editScoreA} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditScoreA(Number(e.target.value))} />
                                <Input label="Away Score" type="number" value={editScoreB} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditScoreB(Number(e.target.value))} />
                            </div>

                            <div className="flex justify-end gap-3">
                                <Button variant="secondary" onClick={() => setSelectedMatch(null)}>Cancel</Button>
                                <Button onClick={saveMatch}>Save</Button>
                            </div>
                        </div>
                    </div>
                )}
            </motion.aside>


        </div>
    );
}

export default EditTournamentForm;