"use client";

import { useEffect, useState } from "react";

import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
} from "firebase/firestore";

import toast from "react-hot-toast";

import { db } from "@/lib/firebase";

/* TYPES */

export interface Matches {
    id: string;
    name: string;
    teamA: string;
    teamB: string;
    location: string;
    date: string;
    time: string;

    status:
    | "live"
    | "finished"
    | "upcoming"
    | "halftime";

    scoreA: number;
    scoreB: number;

    isLive?: boolean;
    currentHalf?: 1 | 2;
    isHalftime?: boolean;

    events?: MatchEvent[];
}

type MatchEvent = {
    id: string;
    minute?: number;
    type:
    | "goal"
    | "yellow"
    | "red"
    | "commentary";

    player?: string;
    team?: "A" | "B";
    text?: string;
};

/* HOOK */

const useMatchesInfo = (onClose?: () => void) => {

    /* STATES */

    const [match, setMatch] =
        useState<Matches | null>(null);

    const [matches, setMatches] =
        useState<Matches[]>([]);

    const [loading, setLoading] =
        useState(false);

    /* FORM STATES */

    const [teamA, setTeamA] = useState("");
    const [teamB, setTeamB] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const [status, setStatus] = useState<
        "live" | "finished" | "upcoming" | "halftime"
    >("upcoming");

    /* FIREBASE */

    const matchesRef =
        collection(db, "matches");

    /* REALTIME MATCHES (UNCHANGED) */

    useEffect(() => {

        const unsubscribe = onSnapshot(
            matchesRef,

            (snapshot) => {

                const data: Matches[] =
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...(doc.data() as Omit<Matches, "id">),
                    }));

                setMatches(data);
            },

            (error) => {
                console.error(error);
                toast.error("Failed to fetch matches");
            }
        );

        return () => unsubscribe();

    }, []);

    /* ✅ FIXED: REALTIME SINGLE MATCH */

    const getMatchById = (id: string) => {

        try {

            setLoading(true);

            const ref =
                doc(db, "matches", id);

            const unsubscribe = onSnapshot(
                ref,

                (snap) => {

                    if (snap.exists()) {

                        setMatch({
                            id: snap.id,
                            ...(snap.data() as Omit<Matches, "id">),
                        });

                    } else {
                        setMatch(null);
                        toast.error("Match not found");
                    }

                    setLoading(false);
                },

                (error) => {
                    console.error(error);
                    toast.error("Failed to fetch match");
                    setLoading(false);
                }
            );

            return unsubscribe;

        } catch (error) {

            console.error(error);
            toast.error("Failed to fetch match");
            setLoading(false);
        }
    };

    /* CREATE MATCH */

    type CreateMatchInput = Omit<
        Matches,
        "id" | "scoreA" | "scoreB" | "isLive" | "currentHalf" | "isHalftime"
    >;

    const handleCreateMatch = async (matchData: CreateMatchInput) => {

        try {

            setLoading(true);

            await addDoc(matchesRef, {
                ...matchData,
                scoreA: 0,
                scoreB: 0,
                isLive: false,
                currentHalf: 1,
                isHalftime: false,
            });

            toast.success("Match created successfully");

            if (onClose) onClose();

        } catch (error) {

            console.error(error);
            toast.error("Failed to create match");

        } finally {
            setLoading(false);
        }
    };

    /* UPDATE MATCH */

    const handleUpdateMatch = async (
        id: string,
        matchData: Partial<Matches>
    ) => {

        try {

            setLoading(true);

            const ref =
                doc(db, "matches", id);

            const cleanedData =
                Object.fromEntries(
                    Object.entries(matchData)
                        .filter(([_, value]) => value !== undefined)
                );

            await updateDoc(ref, cleanedData);

            toast.success("Match updated successfully");

        } catch (error) {

            console.error(error);
            toast.error("Failed to update match");

        } finally {
            setLoading(false);
        }
    };

    /* DELETE MATCH */

    const handleDeleteMatch = async (id: string) => {

        try {

            setLoading(true);

            await deleteDoc(doc(db, "matches", id));

            toast.success("Match deleted successfully");

        } catch (error) {

            console.error(error);
            toast.error("Failed to delete match");

        } finally {
            setLoading(false);
        }
    };

    /* START MATCH */

    const startMatch = async (id: string) => {

        try {

            setLoading(true);

            const ref =
                doc(db, "matches", id);

            await updateDoc(ref, {
                status: "live",
                isLive: true,
                currentHalf: 1,
                isHalftime: false,
            });

            toast.success("Match started");

        } catch (error) {

            console.error(error);
            toast.error("Failed to start match");

        } finally {
            setLoading(false);
        }
    };

    /* HALFTIME */

    const pauseMatch = async (id: string) => {

        try {

            setLoading(true);

            const ref =
                doc(db, "matches", id);

            await updateDoc(ref, {
                status: "halftime",
                isLive: false,
                isHalftime: true,
            });

            toast.success("Halftime");

        } catch (error) {

            console.error(error);
            toast.error("Failed to pause match");

        } finally {
            setLoading(false);
        }
    };

    /* CONTINUE MATCH */

    const continueMatch = async (id: string) => {

        try {

            setLoading(true);

            const ref =
                doc(db, "matches", id);

            await updateDoc(ref, {
                status: "live",
                isLive: true,
                currentHalf: 2,
                isHalftime: false,
            });

            toast.success("Second half started");

        } catch (error) {

            console.error(error);
            toast.error("Failed to continue match");

        } finally {
            setLoading(false);
        }
    };

    /* END MATCH */

    const endMatch = async (id: string) => {

        try {

            setLoading(true);

            const ref =
                doc(db, "matches", id);

            await updateDoc(ref, {
                status: "finished",
                isLive: false,
                isHalftime: false,
            });

            toast.success("Match ended");

        } catch (error) {

            console.error(error);
            toast.error("Failed to end match");

        } finally {
            setLoading(false);
        }
    };

    /* FORM SUBMIT */

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        if (!teamA || !teamB || !location || !date || !time) {
            toast.error("Please fill all fields");
            return;
        }

        if (teamA === teamB) {
            toast.error("Teams cannot be the same");
            return;
        }

        const matchData = {
            name: `${teamA} vs ${teamB}`,
            teamA,
            teamB,
            location,
            date,
            time,
            status,
        };

        await handleCreateMatch(matchData);

        setTeamA("");
        setTeamB("");
        setLocation("");
        setDate("");
        setTime("");
        setStatus("upcoming");
    };

    /* EXPORT */

    return {
        loading,

        match,
        matches,

        teamA,
        setTeamA,

        teamB,
        setTeamB,

        location,
        setLocation,

        date,
        setDate,

        time,
        setTime,

        status,
        setStatus,

        handleSubmit,

        getMatchById,

        handleCreateMatch,
        handleUpdateMatch,
        handleDeleteMatch,

        startMatch,
        pauseMatch,
        continueMatch,
        endMatch,
    };
};

export default useMatchesInfo;