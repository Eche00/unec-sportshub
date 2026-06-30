"use client";

import { useEffect, useState } from "react";

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    updateDoc,
    query,
    orderBy,
    DocumentData,
} from "firebase/firestore";

import toast from "react-hot-toast";
import { db } from "@/lib/firebase";

/* TYPES */

type Team = {
    id: string;
    name: string;
    eliminated: boolean;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor?: number;
    goalsAgainst?: number;
    points: number;
};

export type TournamentSettings = {
    format: string;
    teamCount: number;
    autoMatchups: boolean;
};

export type Tournament = {
    id: string;
    name: string;
    description?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    status: "upcoming" | "live" | "finished";
    createdAt?: number;
    settings?: TournamentSettings;
    teams: Team[];
};

/* MATCH TYPE (ADDED) */

export type Matches = {
    id: string;
    tournamentId?: string;
    name?: string;
    teamA?: string;
    teamB?: string;
    scoreA?: number;
    scoreB?: number;
    status: "upcoming" | "live" | "finished";
    isLive?: boolean;
    createdAt?: number;
};

/* HELPERS */

export const getTournamentStatus = (tournament: Tournament) => {
    const teams = tournament?.teams || [];
    if (teams.length === 0) return "Not Started";
    return "Active";
};

export const getTournamentStage = (tournament: Tournament) => {
    const total = tournament.teams?.length || 0;

    if (total === 0) return "No Teams";
    if (total <= 4) return "Group Stage";
    if (total <= 8) return "Knockout Stage";
    if (total <= 16) return "Quarter Finals";

    return "Final Stage";
};

/* TYPES */

type CreateTournamentPayload = {
    name: string;
    description?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    settings?: TournamentSettings;
    teams?: Team[];
};

/* HOOK */

const useTournamentInfo = () => {
    const [loading, setLoading] = useState(false);
    const [creating, setCreating] = useState(false);
    const [updating, setUpdating] = useState(false);

    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [tournament, setTournament] = useState<Tournament | null>(null);
    const [search, setSearch] = useState("");
    /* MATCH STATE (ADDED) */
    const [matches, setMatches] = useState<Matches[]>([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [format, setFormat] = useState("knockout");
    const [teamCount, setTeamCount] = useState(8);
    const [autoMatchups, setAutoMatchups] = useState(true);

    const [teams, setTeams] = useState<Team[]>([]);

    const tournamentRef = collection(db, "tournaments");
    const matchesRef = collection(db, "matches");

    /* REALTIME LIST (TOURNAMENTS) */

    useEffect(() => {
        setLoading(true);

        const q = query(tournamentRef, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const data = snapshot.docs.map((item) => {
                    const d = item.data() as Omit<Tournament, "id">;

                    return {
                        id: item.id,
                        ...d,
                    };
                });

                setTournaments(data);
                setLoading(false);
            },
            (error) => {
                console.error(error);
                toast.error("Failed to fetch tournaments");
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const filteredTournaments = tournaments.filter((tournament) => {
        const query = search.toLowerCase();

        return (
            tournament.name?.toLowerCase().includes(query) ||
            tournament.status?.toLowerCase().includes(query)

        );
    });
    /* REALTIME LIST (MATCHES - ADDED) */

    useEffect(() => {
        const q = query(matchesRef, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const data = snapshot.docs.map((item) => {
                    const d = item.data() as Omit<Matches, "id">;

                    return {
                        id: item.id,
                        ...d,
                    };
                });

                setMatches(data);
            },
            (error) => {
                console.error(error);
                toast.error("Failed to fetch matches");
            }
        );

        return () => unsubscribe();
    }, []);

    /* SINGLE TOURNAMENT */

    const getTournament = async (id: string) => {
        try {
            setLoading(true);

            const ref = doc(db, "tournaments", id);

            const unsubscribe = onSnapshot(
                ref,
                (snap) => {
                    if (!snap.exists()) {
                        toast.error("Tournament not found");
                        setTournament(null);
                        setLoading(false);
                        return;
                    }

                    const data = snap.data() as Omit<Tournament, "id">;

                    setTournament({
                        id: snap.id,
                        ...data,
                    });

                    setLoading(false);
                },
                (error) => {
                    console.error(error);
                    toast.error("Failed to fetch tournament");
                    setLoading(false);
                }
            );

            return unsubscribe;
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch tournament");
            setLoading(false);
        }
    };

    /* MATCH FUNCTIONS (ADDED) */

    const handleUpdateMatch = async (id: string, payload: Partial<Matches>) => {
        try {
            const ref = doc(db, "matches", id);
            await updateDoc(ref, payload as DocumentData);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update match");
        }
    };



    /* TEAM LOGIC */

    const addTeam = (teamName: string) => {
        const trimmed = teamName.trim();
        if (!trimmed) return;

        const exists = teams.some(
            (t) => t.name.toLowerCase() === trimmed.toLowerCase()
        );

        if (exists) return toast.error("Team already exists");

        if (teams.length >= teamCount)
            return toast.error("Team limit reached");

        const newTeam: Team = {
            id: Date.now().toString(),
            name: trimmed,
            eliminated: false,
            played: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            points: 0,
        };

        setTeams((prev) => [...prev, newTeam]);
    };

    const removeTeam = (index: number) => {
        setTeams((prev) => prev.filter((_, i) => i !== index));
    };

    const resetTournamentForm = () => {
        setName("");
        setDescription("");
        setLocation("");
        setStartDate("");
        setEndDate("");
        setFormat("knockout");
        setTeamCount(8);
        setAutoMatchups(true);
        setTeams([]);
    };

    /* CREATE TOURNAMENT */

    const createTournament = async (payload?: CreateTournamentPayload) => {
        try {
            setCreating(true);

            const body = {
                name: payload?.name || name,
                description: payload?.description || description,
                location: payload?.location || location,
                startDate: payload?.startDate || startDate,
                endDate: payload?.endDate || endDate,
                status: "upcoming",
                settings: payload?.settings || {
                    format,
                    teamCount,
                    autoMatchups,
                },
                teams: payload?.teams || teams,
                createdAt: Date.now(),
            };

            const docRef = await addDoc(tournamentRef, body);

            resetTournamentForm();
            toast.success("Tournament created successfully");

            return { id: docRef.id, ...body };
        } catch (error) {
            console.error(error);
            toast.error("Failed to create tournament");
        } finally {
            setCreating(false);
        }
    };

    /* UPDATE */

    const editTournament = async (
        id: string,
        payload: Partial<Tournament>
    ) => {
        try {
            setUpdating(true);

            const ref = doc(db, "tournaments", id);

            await updateDoc(ref, payload as DocumentData);

            toast.success("Tournament updated");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update tournament");
        } finally {
            setUpdating(false);
        }
    };
    const updateTournamentStatus = async (
        id: string,
        status: "upcoming" | "live" | "finished"
    ) => {
        try {
            const ref = doc(db, "tournaments", id);

            await updateDoc(ref, { status });

            toast.success(`Tournament is now ${status}`);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update tournament status");
        }
    };
    /* DELETE */
    const deleteTournament = async (id: string) => {
        try {
            await deleteDoc(doc(db, "tournaments", id));
            toast.success("Tournament deleted");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete tournament");
        }
    };

    /* TEAM DELETE */
    const deleteTeam = async (tournamentId: string, teamName: string) => {
        try {
            const target = tournaments.find((t) => t.id === tournamentId);

            if (!target) return toast.error("Tournament not found");

            const updatedTeams = target.teams.filter(
                (t) => t.name !== teamName
            );

            await editTournament(tournamentId, {
                teams: updatedTeams,
            });

            toast.success("Team deleted");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete team");
        }
    };

    /* EXPORT */

    return {
        loading,
        creating,
        updating,

        tournaments,
        tournament,
        search,
        setSearch,
        setTournament,
        setTournaments,

        /* MATCH EXPORTS (ADDED) */
        matches,
        handleUpdateMatch,

        name,
        setName,
        description,
        setDescription,
        location,
        setLocation,
        startDate,
        setStartDate,
        endDate,
        setEndDate,

        format,
        setFormat,
        teamCount,
        setTeamCount,
        autoMatchups,
        setAutoMatchups,

        teams,
        setTeams,

        addTeam,
        removeTeam,
        deleteTeam,

        getTournament,
        createTournament,
        editTournament,
        updateTournamentStatus,
        deleteTournament,

        resetTournamentForm,

        getTournamentStatus,
        getTournamentStage,
        filteredTournaments
    };
};

export default useTournamentInfo;