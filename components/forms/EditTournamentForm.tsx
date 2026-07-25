
"use client";

import React, { useEffect, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Add, Settings } from "@mui/icons-material";
import { motion } from "framer-motion";

import useTournamentInfo, { DrawMatch, Team, Tournament } from "@/utils/logics/usetournamentinfo";
import useMatchesInfo from "@/utils/logics/usematchesinfo";

import CreateMatchForm from "@/components/forms/CreateMatchForm";
import MatchCard from "../match/MatchCard";
import toast from "react-hot-toast";
import AddPlayersForm from "./AddPlayersForm";

interface Props {
    tournament: Tournament;
    onClose: () => void;
}

function EditTournamentForm({ tournament, onClose }: Props) {
    const [tab, setTab] = useState<"teams" | "standings" | "matches" | "stats">("teams");
    const [draw, setDraw] = useState<DrawMatch[]>([]);
    const [editingRound, setEditingRound] = useState<DrawMatch["round"]>();
    const [playerName, setPlayerName] = useState("");
    const [goals, setGoals] = useState(0);
    const [assists, setAssists] = useState(0);
    const [yellowCards, setYellowCards] = useState(0);
    const [redCards, setRedCards] = useState(0);
    const [topScorers, setTopScorers] = useState(
        tournament.topScorers || []
    );
    const [settings, setSettings] = useState(true);
    const [addPlayers, setAddPlayers] = useState(false);
    const [createScorer, setCreateScorer] =
        useState(false);

    const [selectedTeam, setSelectedTeam] = useState("");
    const [selectedTeamP, setSelectedTeamP] = useState<Team | null>(null);
    const selectedTeamData = tournament.teams.find(
        (team) => team.id === selectedTeam
    );

    const players = selectedTeamData?.squad ?? [];
    const {
        editTournament,
        updateTournamentStatus,
        deleteTournament, addTopScorer, updatePlayerStat
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
    useEffect(() => {
        if (tournament.draw?.length) {
            setDraw(tournament.draw);
            return;
        }

        const teamCount = tournament.teams.length;

        const rounds: DrawMatch[] = [];

        const addRound = (
            round: DrawMatch["round"],
            matches: number
        ) => {
            for (let i = 0; i < matches; i++) {
                rounds.push({
                    id: crypto.randomUUID(),
                    round,
                    position: i + 1,
                    teamA: null,
                    teamB: null,
                    winner: null,
                });
            }
        };

        if (teamCount === 32) {
            addRound("Round of 32", 16);
            addRound("Round of 16", 8);
            addRound("Quarter Final", 4);
            addRound("Semi Final", 2);
            addRound("Final", 1);

            if (tournament.settings?.knockout?.thirdPlace) {
                addRound("Third Place", 1);
            }
        }

        else if (teamCount === 16) {
            addRound("Round of 16", 8);
            addRound("Quarter Final", 4);
            addRound("Semi Final", 2);
            addRound("Final", 1);

            if (tournament.settings?.knockout?.thirdPlace) {
                addRound("Third Place", 1);
            }
        }

        else if (teamCount === 8) {
            addRound("Quarter Final", 4);
            addRound("Semi Final", 2);
            addRound("Final", 1);

            if (tournament.settings?.knockout?.thirdPlace) {
                addRound("Third Place", 1);
            }
        }

        else if (teamCount === 4) {
            addRound("Semi Final", 2);
            addRound("Final", 1);

            if (tournament.settings?.knockout?.thirdPlace) {
                addRound("Third Place", 1);
            }
        } else if (teamCount === 6) {
            addRound("Quarter Final", 3); // 3 matches (6 teams)
            addRound("Semi Final", 2);    // You'll handle how teams get here later
            addRound("Final", 1);

            if (tournament.settings?.knockout?.thirdPlace) {
                addRound("Third Place", 1);
            }
        }

        setDraw(rounds);

    }, [tournament]);
    useEffect(() => {
        if (!draw.length) return;

        setEditingRound(
            tournament.settings?.knockout?.editingRound ??
            draw[0].round
        );
    }, [draw, tournament]);
    useEffect(() => {
        setTopScorers(tournament.topScorers || []);
    }, [tournament.topScorers]);
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

    };
    const updateDrawTeam = (
        matchId: string,
        side: "teamA" | "teamB",
        teamId: string
    ) => {
        const team = tournament.teams.find(t => t.id === teamId);

        if (!team) return;

        setDraw(prev =>
            prev.map(match => {
                if (match.id !== matchId) return match;

                const other =
                    side === "teamA"
                        ? match.teamB
                        : match.teamA;

                if (other?.id === team.id) {
                    toast.error("A team cannot play itself");
                    return match;
                }

                return {
                    ...match,
                    [side]: team,
                };
            })
        );
    };
    const validateDraw = () => {
        const currentRoundMatches = draw.filter(match => match.round === editingRound).sort((a, b) => a.position - b.position)

        const usedTeams = new Set<string>();

        for (const match of currentRoundMatches) {

            if (!match.teamA || !match.teamB) {
                toast.error("Every match must have two teams");
                return false;
            }

            if (match.teamA.id === match.teamB.id) {
                toast.error("A team cannot play itself");
                return false;
            }

            if (usedTeams.has(match.teamA.id)) {
                toast.error(`${match.teamA.name} already used`);
                return false;
            }

            if (usedTeams.has(match.teamB.id)) {
                toast.error(`${match.teamB.name} already used`);
                return false;
            }

            usedTeams.add(match.teamA.id);
            usedTeams.add(match.teamB.id);
        }

        return true;
    };
    const handleSaveDraw = async () => {

        if (!validateDraw()) return;
        const currentRoundMatches = draw.filter(
            m => m.round === editingRound
        );

        const allAssigned = currentRoundMatches.every(
            m => m.teamA && m.teamB
        );

        if (!allAssigned) {
            toast.error("Complete all fixtures first.");
            return;
        }
        const order: DrawMatch["round"][] = [
            "Round of 32",
            "Round of 16",
            "Quarter Final",
            "Semi Final",
            "Third Place",
            "Final",
        ];

        const currentIndex = order.indexOf(editingRound!);
        const nextRound = order[currentIndex + 1] ?? "Final";

        await editTournament(tournament.id, {
            draw,

            settings: {
                format: tournament.settings!.format,
                teamCount: tournament.settings!.teamCount,
                autoMatchups: tournament.settings!.autoMatchups,

                knockout: {
                    currentRound: nextRound,
                    thirdPlace: tournament.settings!.knockout!.thirdPlace,
                    twoLegged: tournament.settings!.knockout!.twoLegged,
                    editingRound: nextRound,
                },
            },
        });

        setEditingRound(nextRound);

        toast.success(`${editingRound} saved!`);

    };
    const format = tournament.settings?.format;

    const handleAddScorer = async () => {
        const team = tournament.teams.find(
            t => t.id === selectedTeam
        );

        if (!team) return;

        await addTopScorer(tournament.id, {
            id: crypto.randomUUID(),
            playerName,
            teamId: team.id,
            teamName: team.name,
            goals,
            assists,
            yellowCards,
            redCards,
        });

        setPlayerName("");
        setSelectedTeam("");
        setGoals(0);
        setAssists(0);
        setYellowCards(0);
        setRedCards(0);
        setCreateScorer(false);
    };

    const handleUpdatePlayer = async (
        scorerId: string,
        stat: "goals" | "assists" | "yellowCards" | "redCards",
        action: "increment" | "decrement"
    ) => {

        setTopScorers(prev =>
            prev.map(player =>
                player.id === scorerId
                    ? {
                        ...player,
                        [stat]:
                            action === "increment"
                                ? (player[stat] ?? 0) + 1
                                : Math.max(0, (player[stat] ?? 0) - 1),
                    }
                    : player
            )
        );

        await updatePlayerStat(
            tournament.id,
            scorerId,
            stat,
            action
        );
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
                        {tournament.name}
                    </h2>

                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </div>

                {/*  TABLE / STANDINGS  */}

                <>
                    {/* CONTROLS */}
                    <div className="sticky top-0 z-20 bg-[#0F172A] pb-4">
                        <div className="flex md:flex-row flex-col items-center justify-between gap-3">


                            {/* Tabs */}
                            <div className="flex gap-2 flex-wrap mb-6 border-b border-gray-800 pb-2 text-sm">
                                {[
                                    { key: "teams", label: "Teams" },
                                    { key: "standings", label: "Standings" },
                                    { key: "matches", label: "Matches" },
                                    { key: "stats", label: "Stats" },
                                ].map((item) => (
                                    <button
                                        key={item.key}
                                        onClick={() => setTab(item.key as typeof tab)}
                                        className={`px-3 py-1 rounded-lg transition cursor-pointer ${tab === item.key
                                            ? "bg-white/10 text-white"
                                            : "text-gray-400 hover:text-white"
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>

                            {/* RIGHT */}
                            <div> {tab === "matches" ? (
                                <Button
                                    onClick={() => setCreateMatch(true)}
                                    className="shrink-0"
                                >
                                    <Add fontSize="small" />
                                    Create Match
                                </Button>
                            ) : tab === "standings" ? (
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
                            ) : tab === "stats" ? <Button
                                onClick={() => setCreateScorer(!createScorer)}
                                className="shrink-0"
                            >

                                {!createScorer ? <span><Add fontSize="small" /> Add Stats</span> : "Close"}
                            </Button> : <></>}
                            </div>
                        </div>
                    </div>
                    {tab === "teams" ? (<div className="space-y-4">
                        {tournament.teams.map((t) => (
                            <div
                                key={t.id}
                                className="rounded-xl flex items-center justify-between border border-gray-700 bg-[#111827] p-4 transition hover:border-cyan-500"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-base font-semibold text-white">
                                            {t.name}
                                            <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
                                                Squad
                                            </span>
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-400">
                                            {t.squad?.length || 0} Player{(t.squad?.length || 0) !== 1 && "s"}
                                        </p>
                                    </div>


                                </div>

                                <Button
                                    onClick={() => {
                                        setSelectedTeamP(t);
                                        setAddPlayers(true);
                                    }}
                                >
                                    Add Player
                                </Button>
                            </div>
                        ))}
                    </div>) : format === "knockout" && tab === "standings" ? (
                        <div className="space-y-6">

                            <div className="space-y-5">

                                <h3 className="font-semibold">
                                    Tournament Draw
                                </h3>

                                {draw
                                    .filter(match => match.round === editingRound)
                                    .map((match, index) => (

                                        <div
                                            key={match.id}
                                            className="rounded-lg border border-gray-700 p-4 bg-[#111827]"
                                        >

                                            <p className="text-xs text-gray-500 mb-3">

                                                Match {index + 1}

                                            </p>
                                            <h3 className="text-lg font-semibold text-white mb-4">
                                                {editingRound}
                                            </h3>
                                            <div className="grid grid-cols-2 gap-3">

                                                <select

                                                    value={match.teamA?.id ?? ""}

                                                    onChange={(e) =>
                                                        updateDrawTeam(
                                                            match.id,
                                                            "teamA",
                                                            e.target.value
                                                        )
                                                    }

                                                    className="bg-[#0F172A] border border-gray-700 rounded-lg p-2"

                                                >

                                                    <option value="">

                                                        Select Team

                                                    </option>

                                                    {tournament.teams.map(team => (

                                                        <option

                                                            key={team.id}

                                                            value={team.id}

                                                        >

                                                            {team.name}

                                                        </option>

                                                    ))}

                                                </select>

                                                <select

                                                    value={match.teamB?.id ?? ""}

                                                    onChange={(e) =>
                                                        updateDrawTeam(
                                                            match.id,
                                                            "teamB",
                                                            e.target.value
                                                        )
                                                    }

                                                    className="bg-[#0F172A] border border-gray-700 rounded-lg p-2"

                                                >

                                                    <option value="">

                                                        Select Team

                                                    </option>

                                                    {tournament.teams.map(team => (

                                                        <option

                                                            key={team.id}

                                                            value={team.id}

                                                        >

                                                            {team.name}

                                                        </option>

                                                    ))}

                                                </select>

                                            </div>

                                        </div>

                                    ))}

                                <Button
                                    onClick={handleSaveDraw}
                                >

                                    Save Draw

                                </Button>

                            </div>
                        </div>
                    ) : format === "league" && tab === "standings" ? (
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
                    ) : tab === "matches" ? (
                        <div className="flex flex-col gap-4">

                            {matches
                                .filter((m) => m.tournamentId === tournament.id)
                                .map((match) => (
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
                                        category={match.category}
                                        location={match.location}
                                        tournamentId={match.tournamentId}
                                    />
                                ))}
                        </div>
                    ) :
                        (

                            <div className="space-y-6">

                                <h2 className="text-lg font-semibold">
                                    Stats
                                </h2>
                                {createScorer ?
                                    (<div className="space-y-6">
                                        <select
                                            value={selectedTeam}
                                            onChange={(e) => {
                                                setSelectedTeam(e.target.value);
                                                setPlayerName(""); // reset player when team changes
                                            }}
                                            className="w-full bg-[#0F1115] border border-gray-700 rounded-lg p-2 text-sm"
                                        >
                                            <option value="">Select Team</option>

                                            {tournament.teams.map((team) => (
                                                <option key={team.id} value={team.id}>
                                                    {team.name}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            value={playerName}
                                            onChange={(e) => setPlayerName(e.target.value)}
                                            disabled={!selectedTeam}
                                            className="w-full bg-[#0F1115] border border-gray-700 rounded-lg p-2 text-sm"
                                        >
                                            <option value="">Select Player</option>

                                            {players.map((player) => (
                                                <option key={player.id} value={player.name}>
                                                    {player.name}
                                                </option>
                                            ))}
                                        </select>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-sm font-medium text-gray-300">
                                                    Goals
                                                </label>
                                                <Input
                                                    type="number"
                                                    min={0}
                                                    value={goals}
                                                    onChange={(e) => setGoals(Number(e.target.value))}
                                                    placeholder="0"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-sm font-medium text-gray-300">
                                                    Assists
                                                </label>
                                                <Input
                                                    type="number"
                                                    min={0}
                                                    value={assists}
                                                    onChange={(e) => setAssists(Number(e.target.value))}
                                                    placeholder="0"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-sm font-medium text-yellow-400">
                                                    Yellow Cards
                                                </label>
                                                <Input
                                                    type="number"
                                                    min={0}
                                                    value={yellowCards}
                                                    onChange={(e) => setYellowCards(Number(e.target.value))}
                                                    placeholder="0"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-sm font-medium text-red-400">
                                                    Red Cards
                                                </label>
                                                <Input
                                                    type="number"
                                                    min={0}
                                                    value={redCards}
                                                    onChange={(e) => setRedCards(Number(e.target.value))}
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>
                                        <Button onClick={handleAddScorer}>Add Player</Button>
                                    </div>) : (
                                        <div className="space-y-3">
                                            {(tournament.topScorers || [])
                                                .sort((a, b) => b.goals - a.goals)
                                                .map((player, index) => (
                                                    <div
                                                        key={player.id}
                                                        className="rounded-xl border border-gray-700 bg-[#111827] p-4 hover:border-[#3B82F6] transition-all"
                                                    >
                                                        {/* Header */}
                                                        <div className="flex items-center justify-between mb-4">
                                                            <div className="flex items-center gap-4">
                                                                <div className="font-bold text-sm text-[#3B82F6]">
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
                                                        </div>

                                                        {/* Stats */}
                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                                                            {[
                                                                {
                                                                    label: "Goals",
                                                                    key: "goals",
                                                                    value: player.goals,
                                                                },
                                                                {
                                                                    label: "Assists",
                                                                    key: "assists",
                                                                    value: player.assists ?? 0,
                                                                },
                                                                {
                                                                    label: "Yellow",
                                                                    key: "yellowCards",
                                                                    value: player.yellowCards ?? 0,
                                                                },
                                                                {
                                                                    label: "Red",
                                                                    key: "redCards",
                                                                    value: player.redCards ?? 0,
                                                                },
                                                            ].map((stat) => (
                                                                <div
                                                                    key={stat.key}
                                                                    className="bg-[#0F1115] rounded-lg p-3 border border-gray-700"
                                                                >
                                                                    <p className="text-xs text-gray-400 mb-2">
                                                                        {stat.label}
                                                                    </p>

                                                                    <div className="flex items-center justify-between">
                                                                        <button
                                                                            onClick={() =>
                                                                                handleUpdatePlayer(
                                                                                    player.id,
                                                                                    stat.key as
                                                                                    | "goals"
                                                                                    | "assists"
                                                                                    | "yellowCards"
                                                                                    | "redCards",
                                                                                    "decrement"
                                                                                )
                                                                            }
                                                                            className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700"
                                                                        >
                                                                            −
                                                                        </button>

                                                                        <span className="text-lg font-bold text-white">
                                                                            {stat.value}
                                                                        </span>

                                                                        <button
                                                                            onClick={() =>
                                                                                handleUpdatePlayer(
                                                                                    player.id,
                                                                                    stat.key as
                                                                                    | "goals"
                                                                                    | "assists"
                                                                                    | "yellowCards"
                                                                                    | "redCards",
                                                                                    "increment"
                                                                                )
                                                                            }
                                                                            className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700"
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    )}



                            </div>

                        )}

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

                <div className="w-full flex items-end justify-end gap-4 py-5 my-10  border-t-[0.1px] border-gray-400">

                    {settings ? <span className="cursor-pointer my-2 hover:scale-105" onClick={() => setSettings(!settings)}><Settings /></span> : <div className="flex items-center gap-2">

                        <Button
                            onClick={() => { deleteTournament(tournament.id); onClose(); }}
                            variant="secondaryRed"
                        >
                            Delete
                        </Button>
                        <hr className="h-5 w-[0.1px] border-none bg-gray-500" />

                        <span className="cursor-pointer hover:scale-105" onClick={() => setSettings(!settings)}><Settings /></span>
                    </div>}

                    {/* <Button
                        onClick={saveTeams}
                        variant="primary"
                    >
                        Update
                    </Button> */}
                </div>
            </motion.aside>
            <AddPlayersForm
                isOpen={addPlayers}
                onClose={() => {
                    setAddPlayers(false);
                    setSelectedTeamP(null);
                }}
                tournament={tournament}
                team={selectedTeamP}
            />
        </div >
    );
}

export default EditTournamentForm;
