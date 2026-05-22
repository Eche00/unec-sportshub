"use client";

import { useEffect, useMemo, useState } from "react";

import {
    usePathname,
    useRouter,
} from "next/navigation";

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

export type MatchEvent = {
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

const useMatchesInfo = (
    onClose?: () => void,
    matchId?: string
) => {

    const router = useRouter();

    const pathname = usePathname();

    /* STATES */

    const [match, setMatch] =
        useState<Matches | null>(null);

    const [matches, setMatches] =
        useState<Matches[]>([]);

    const [loading, setLoading] =
        useState(false);

    /* SEARCH / UI STATES */

    const [search, setSearch] =
        useState("");

    const [createMatch, setCreateMatch] =
        useState(false);

    const [manageMatches, setManageMatches] =
        useState(false);

    /* EVENTS */

    const [events, setEvents] =
        useState<MatchEvent[]>([]);

    const [newEvent, setNewEvent] =
        useState<Partial<MatchEvent>>({
            type: "goal",
        });

    /* FORM STATES */

    const [teamA, setTeamA] =
        useState("");

    const [teamB, setTeamB] =
        useState("");

    const [location, setLocation] =
        useState("");

    const [date, setDate] =
        useState("");

    const [time, setTime] =
        useState("");

    const [status, setStatus] =
        useState<
            "live"
            | "finished"
            | "upcoming"
            | "halftime"
        >("upcoming");

    /* FIREBASE */

    const matchesRef =
        collection(db, "matches");

    /* REALTIME MATCHES */

    useEffect(() => {

        const unsubscribe =
            onSnapshot(
                matchesRef,

                (snapshot) => {

                    const data: Matches[] =
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...(doc.data() as Omit<
                                Matches,
                                "id"
                            >),
                        }));

                    setMatches(data);
                },

                (error) => {

                    console.error(error);

                    toast.error(
                        "Failed to fetch matches"
                    );
                }
            );

        return () => unsubscribe();

    }, []);

    /* CURRENT MATCH */

    const currentMatch = useMemo(
        () =>
            matches.find(
                (m) => m.id === matchId
            ),

        [matches, matchId]
    );

    /* SYNC MATCH */

    useEffect(() => {

        if (currentMatch) {

            setMatch(currentMatch);

            setEvents(
                currentMatch.events || []
            );
        }

    }, [currentMatch]);

    /* ESC CLOSE */

    useEffect(() => {

        if (!onClose) return;

        const handleEsc = (
            e: KeyboardEvent
        ) => {

            if (e.key === "Escape") {

                onClose();
            }
        };

        window.addEventListener(
            "keydown",
            handleEsc
        );

        return () => {

            window.removeEventListener(
                "keydown",
                handleEsc
            );
        };

    }, [onClose]);

    /* LOCK SCROLL */

    useEffect(() => {

        if (!onClose) return;

        document.body.style.overflow =
            "hidden";

        return () => {

            document.body.style.overflow =
                "auto";
        };

    }, [onClose]);

    /* MATCH STATES */

    const isEmpty =
        !loading &&
        matches.length === 0;

    const hasMatches =
        matches.length > 0;

    const isAdmin =
        pathname?.startsWith("/admin");

    /* FILTERED MATCHES */

    const filteredMatches =
        useMemo(() => {

            return matches.filter(
                (match) => {

                    const query =
                        search.toLowerCase();

                    return (
                        match.teamA
                            .toLowerCase()
                            .includes(query) ||

                        match.teamB
                            .toLowerCase()
                            .includes(query)
                    );
                }
            );

        }, [search, matches]);

    /* STATUS LABEL */

    const statusLabel =
        useMemo(() => {

            if (
                status === "live"
            ) {
                return "LIVE";
            }

            if (
                status === "halftime" ||
                match?.isHalftime
            ) {
                return "HALFTIME";
            }

            if (
                status === "finished"
            ) {
                return "FULL TIME";
            }

            return "UPCOMING";

        }, [
            status,
            match?.isHalftime,
        ]);

    /* STATUS STYLES */

    const statusStyles = {

        live:
            "bg-green-500/10 text-green-400 border-green-500/30",

        finished:
            "bg-gray-500/10 text-gray-300 border-gray-500/30",

        upcoming:
            "bg-blue-500/10 text-blue-400 border-blue-500/30",

        halftime:
            "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    };

    /* CARD CLICK */

    const handleClick = (
        id: string
    ) => {

        if (isAdmin) {

            setManageMatches(true);

        } else {

            router.push(
                `/Matches/${id}`
            );
        }
    };

    /* UPDATE FIELD */

    const handleManageChange = <
        K extends keyof Matches
    >(
        field: K,
        value: Matches[K]
    ) => {

        setMatch((prev) => {

            if (!prev) return prev;

            return {
                ...prev,
                [field]: value,
            };
        });
    };

    /* ADD EVENT */

    const addEvent = () => {

        if (
            !newEvent.type ||
            !match
        ) return;

        const event: MatchEvent = {

            id:
                Date.now().toString(),

            type:
                newEvent.type,
        };

        /* OPTIONAL FIELDS */

        if (
            newEvent.type !==
            "commentary"
        ) {

            if (
                newEvent.minute !==
                undefined
            ) {

                event.minute =
                    newEvent.minute;
            }

            if (
                newEvent.player
            ) {

                event.player =
                    newEvent.player;
            }

            if (
                newEvent.team
            ) {

                event.team =
                    newEvent.team;
            }
        }

        if (
            newEvent.type ===
            "commentary" &&
            newEvent.text
        ) {

            event.text =
                newEvent.text;
        }

        let updatedMatch = {
            ...match,
        };

        /* AUTO SCORE */

        if (
            event.type === "goal"
        ) {

            if (
                event.team === "A"
            ) {

                updatedMatch.scoreA += 1;
            }

            if (
                event.team === "B"
            ) {

                updatedMatch.scoreB += 1;
            }
        }

        const updatedEvents = [
            event,
            ...(match.events || []),
        ];

        updatedMatch.events =
            updatedEvents;

        setMatch(updatedMatch);

        setEvents(updatedEvents);

        setNewEvent({
            type: "goal",
        });
    };

    /* SAVE MANAGED MATCH */

    const handleManageMatch =
        async (
            e?:
                | React.FormEvent
                | React.MouseEvent
        ) => {

            e?.preventDefault();

            if (!match) return;

            await handleUpdateMatch(
                match.id,
                {

                    scoreA:
                        match.scoreA,

                    scoreB:
                        match.scoreB,

                    status:
                        match.status,

                    currentHalf:
                        match.currentHalf,

                    isHalftime:
                        match.isHalftime,

                    isLive:
                        match.isLive,

                    events:
                        match.events ||
                        [],
                }
            );

            if (onClose) {

                onClose();
            }
        };

    /* REALTIME SINGLE MATCH */

    const getMatchById = (
        id: string
    ) => {

        try {

            setLoading(true);

            const ref =
                doc(
                    db,
                    "matches",
                    id
                );

            const unsubscribe =
                onSnapshot(

                    ref,

                    (snap) => {

                        if (
                            snap.exists()
                        ) {

                            setMatch({
                                id: snap.id,

                                ...(snap.data() as Omit<
                                    Matches,
                                    "id"
                                >),
                            });

                        } else {

                            setMatch(
                                null
                            );

                            toast.error(
                                "Match not found"
                            );
                        }

                        setLoading(
                            false
                        );
                    },

                    (error) => {

                        console.error(
                            error
                        );

                        toast.error(
                            "Failed to fetch match"
                        );

                        setLoading(
                            false
                        );
                    }
                );

            return unsubscribe;

        } catch (error) {

            console.error(error);

            toast.error(
                "Failed to fetch match"
            );

            setLoading(false);
        }
    };

    /* CREATE MATCH */

    type CreateMatchInput =
        Omit<
            Matches,
            | "id"
            | "scoreA"
            | "scoreB"
            | "isLive"
            | "currentHalf"
            | "isHalftime"
        >;

    const handleCreateMatch =
        async (
            matchData:
                CreateMatchInput
        ) => {

            try {

                setLoading(true);

                await addDoc(
                    matchesRef,
                    {

                        ...matchData,

                        scoreA: 0,

                        scoreB: 0,

                        isLive: false,

                        currentHalf: 1,

                        isHalftime: false,
                    }
                );

                toast.success(
                    "Match created successfully"
                );

                if (onClose) {

                    onClose();
                }

            } catch (error) {

                console.error(error);

                toast.error(
                    "Failed to create match"
                );

            } finally {

                setLoading(false);
            }
        };

    /* UPDATE MATCH */

    const handleUpdateMatch =
        async (
            id: string,
            matchData:
                Partial<Matches>
        ) => {

            try {

                setLoading(true);

                const ref =
                    doc(
                        db,
                        "matches",
                        id
                    );

                const cleanedData =
                    Object.fromEntries(
                        Object.entries(
                            matchData
                        ).filter(
                            ([_, value]) =>
                                value !==
                                undefined
                        )
                    );

                await updateDoc(
                    ref,
                    cleanedData
                );

                toast.success(
                    "Match updated successfully"
                );

            } catch (error) {

                console.error(error);

                toast.error(
                    "Failed to update match"
                );

            } finally {

                setLoading(false);
            }
        };

    /* DELETE MATCH */

    const handleDeleteMatch =
        async (
            id: string
        ) => {

            try {

                setLoading(true);

                await deleteDoc(
                    doc(
                        db,
                        "matches",
                        id
                    )
                );

                toast.success(
                    "Match deleted successfully"
                );

            } catch (error) {

                console.error(error);

                toast.error(
                    "Failed to delete match"
                );

            } finally {

                setLoading(false);
            }
        };

    /* START MATCH */

    const startMatch = async (
        id: string
    ) => {

        try {

            setLoading(true);

            const ref =
                doc(
                    db,
                    "matches",
                    id
                );

            await updateDoc(ref, {

                status: "live",

                isLive: true,

                currentHalf: 1,

                isHalftime: false,
            });

            toast.success(
                "Match started"
            );

        } catch (error) {

            console.error(error);

            toast.error(
                "Failed to start match"
            );

        } finally {

            setLoading(false);
        }
    };

    /* HALFTIME */

    const pauseMatch = async (
        id: string
    ) => {

        try {

            setLoading(true);

            const ref =
                doc(
                    db,
                    "matches",
                    id
                );

            await updateDoc(ref, {

                status:
                    "halftime",

                isLive: false,

                isHalftime: true,
            });

            toast.success(
                "Halftime"
            );

        } catch (error) {

            console.error(error);

            toast.error(
                "Failed to pause match"
            );

        } finally {

            setLoading(false);
        }
    };

    /* CONTINUE MATCH */

    const continueMatch =
        async (
            id: string
        ) => {

            try {

                setLoading(true);

                const ref =
                    doc(
                        db,
                        "matches",
                        id
                    );

                await updateDoc(
                    ref,
                    {

                        status:
                            "live",

                        isLive: true,

                        currentHalf: 2,

                        isHalftime: false,
                    }
                );

                toast.success(
                    "Second half started"
                );

            } catch (error) {

                console.error(error);

                toast.error(
                    "Failed to continue match"
                );

            } finally {

                setLoading(false);
            }
        };

    /* END MATCH */

    const endMatch = async (
        id: string
    ) => {

        try {

            setLoading(true);

            const ref =
                doc(
                    db,
                    "matches",
                    id
                );

            await updateDoc(ref, {

                status:
                    "finished",

                isLive: false,

                isHalftime: false,
            });

            toast.success(
                "Match ended"
            );

        } catch (error) {

            console.error(error);

            toast.error(
                "Failed to end match"
            );

        } finally {

            setLoading(false);
        }
    };

    /* HANDLE START */

    const handleStartMatch =
        async () => {

            if (!match) return;

            await startMatch(
                match.id
            );

            setMatch((prev) =>
                prev
                    ? {
                        ...prev,

                        status:
                            "live",

                        isLive: true,

                        currentHalf: 1,

                        isHalftime: false,
                    }
                    : prev
            );
        };

    /* HANDLE HALFTIME */

    const handleHalftime =
        async () => {

            if (!match) return;

            await handleUpdateMatch(
                match.id,
                {

                    status:
                        "halftime",

                    isLive: false,

                    isHalftime: true,
                }
            );

            setMatch((prev) =>
                prev
                    ? {
                        ...prev,

                        status:
                            "halftime",

                        isLive: false,

                        isHalftime: true,
                    }
                    : prev
            );
        };

    /* HANDLE CONTINUE */

    const handleContinueMatch =
        async () => {

            if (!match) return;

            await continueMatch(
                match.id
            );

            setMatch((prev) =>
                prev
                    ? {
                        ...prev,

                        status:
                            "live",

                        isLive: true,

                        currentHalf: 2,

                        isHalftime: false,
                    }
                    : prev
            );
        };

    /* HANDLE END */

    const handleEndMatch =
        async () => {

            if (!match) return;

            await endMatch(
                match.id
            );

            setMatch((prev) =>
                prev
                    ? {
                        ...prev,

                        status:
                            "finished",

                        isLive: false,

                        isHalftime: false,
                    }
                    : prev
            );
        };

    /* FORM SUBMIT */

    const handleSubmit =
        async (
            e: React.FormEvent
        ) => {

            e.preventDefault();

            if (
                !teamA ||
                !teamB ||
                !location ||
                !date ||
                !time
            ) {

                toast.error(
                    "Please fill all fields"
                );

                return;
            }

            if (
                teamA === teamB
            ) {

                toast.error(
                    "Teams cannot be the same"
                );

                return;
            }

            const matchData = {

                name:
                    `${teamA} vs ${teamB}`,

                teamA,

                teamB,

                location,

                date,

                time,

                status,
            };

            await handleCreateMatch(
                matchData
            );

            setTeamA("");

            setTeamB("");

            setLocation("");

            setDate("");

            setTime("");

            setStatus(
                "upcoming"
            );
        };

    /* EXPORT */

    return {

        loading,

        match,
        setMatch,

        matches,

        currentMatch,

        events,
        setEvents,

        newEvent,
        setNewEvent,

        search,
        setSearch,

        createMatch,
        setCreateMatch,

        manageMatches,
        setManageMatches,

        isAdmin,

        isEmpty,
        hasMatches,

        filteredMatches,

        statusLabel,
        statusStyles,

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

        handleClick,

        handleSubmit,

        handleManageChange,

        addEvent,

        handleManageMatch,

        getMatchById,

        handleCreateMatch,

        handleUpdateMatch,

        handleDeleteMatch,

        startMatch,
        pauseMatch,
        continueMatch,
        endMatch,

        handleStartMatch,
        handleHalftime,
        handleContinueMatch,
        handleEndMatch,
    };
};

export default useMatchesInfo;