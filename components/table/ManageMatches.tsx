"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";

import Button from "../ui/Button";
import Input from "../ui/Input";

import useMatchesInfo, { Matches } from "@/utils/logics/usematchesinfo";

type MatchStatus =
    | "live"
    | "finished"
    | "upcoming"
    | "halftime";

type MatchEventType =
    | "goal"
    | "yellow"
    | "red"
    | "commentary";

type MatchEvent = {
    id: string;
    minute?: number;
    type: MatchEventType;
    player?: string;
    team?: "A" | "B";
    text?: string;
};

type ManageMatchesProps = {
    matchId: string;
    onClose: () => void;
};

export default function ManageMatches({
    matchId,
    onClose,
}: ManageMatchesProps) {

    const {
        matches,
        loading,

        handleUpdateMatch,

        startMatch,
        continueMatch,
        endMatch,

    } = useMatchesInfo();

    /* MATCH */
    const currentMatch = useMemo(
        () => matches.find((m) => m.id === matchId),
        [matches, matchId]
    );

    /* LOCAL STATE */
    const [match, setMatch] = useState<Matches | null>(null);

    const [events, setEvents] = useState<MatchEvent[]>([]);

    const [newEvent, setNewEvent] =
        useState<Partial<MatchEvent>>({
            type: "goal",
        });

    /* SYNC MATCH */
    useEffect(() => {
        if (currentMatch) {
            setMatch(currentMatch);
            setEvents(currentMatch.events || []);
        }
    }, [currentMatch]);

    /* ESC CLOSE */
    useEffect(() => {

        const handleEsc = (e: KeyboardEvent) => {

            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener(
                "keydown",
                handleEsc
            );
        };

    }, [onClose]);

    /* LOCK SCROLL */
    useEffect(() => {

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };

    }, []);

    /* UPDATE FIELD */
    const handleChange = <
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
        if (!newEvent.type || !match) return;

        const event: MatchEvent = {
            id: Date.now().toString(),
            type: newEvent.type,
        };

        // only add optional fields if they exist
        if (newEvent.type !== "commentary") {
            if (newEvent.minute !== undefined) {
                event.minute = newEvent.minute;
            }

            if (newEvent.player) {
                event.player = newEvent.player;
            }

            if (newEvent.team) {
                event.team = newEvent.team;
            }
        }

        if (newEvent.type === "commentary" && newEvent.text) {
            event.text = newEvent.text;
        }

        let updatedMatch = { ...match };

        // AUTO SCORE UPDATE
        if (event.type === "goal") {
            if (event.team === "A") {
                updatedMatch.scoreA += 1;
            }

            if (event.team === "B") {
                updatedMatch.scoreB += 1;
            }
        }

        const updatedEvents = [event, ...(match.events || [])];

        updatedMatch.events = updatedEvents;

        setMatch(updatedMatch);
        setEvents(updatedEvents);

        setNewEvent({ type: "goal" });
    };

    /* SAVE */
    const handleSubmit = async (
        e?: React.FormEvent | React.MouseEvent
    ) => {

        e?.preventDefault();

        if (!match) return;

        await handleUpdateMatch(match.id, {

            scoreA: match.scoreA,

            scoreB: match.scoreB,

            status: match.status,

            currentHalf: match.currentHalf,

            isHalftime: match.isHalftime,

            isLive: match.isLive,
            events: match.events || [],
        });

        onClose();
    };

    /* START MATCH */
    const handleStartMatch = async () => {

        if (!match) return;

        await startMatch(match.id);

        setMatch((prev) =>
            prev
                ? {
                    ...prev,

                    status: "live",

                    isLive: true,

                    currentHalf: 1,

                    isHalftime: false,
                }
                : prev
        );
    };

    /* HALFTIME */
    const handleHalftime = async () => {

        if (!match) return;

        await handleUpdateMatch(match.id, {

            status: "halftime",

            isLive: false,

            isHalftime: true,
        });

        setMatch((prev) =>
            prev
                ? {
                    ...prev,

                    status: "halftime",

                    isLive: false,

                    isHalftime: true,
                }
                : prev
        );
    };

    /* CONTINUE MATCH */
    const handleContinueMatch = async () => {

        if (!match) return;

        await continueMatch(match.id);

        setMatch((prev) =>
            prev
                ? {
                    ...prev,

                    status: "live",

                    isLive: true,

                    currentHalf: 2,

                    isHalftime: false,
                }
                : prev
        );
    };

    /* END MATCH */
    const handleEndMatch = async () => {

        if (!match) return;

        await endMatch(match.id);

        setMatch((prev) =>
            prev
                ? {
                    ...prev,

                    status: "finished",

                    isLive: false,

                    isHalftime: false,
                }
                : prev
        );
    };

    if (!match) {

        return (
            <div className="fixed inset-0 bg-black/60 z-50 flex justify-end">
                <div className="bg-[#0F172A] sm:w-[650px] mt-16 w-full h-full flex items-center justify-center">
                    <p className="text-gray-400">
                        {loading
                            ? "Loading match..."
                            : "Match not found"}
                    </p>
                </div>
            </div>
        );
    }

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
                className="bg-[#0F172A] sm:w-[650px] mt-16 w-full h-full border-l border-gray-800 rounded-tl-2xl rounded-bl-2xl p-5 sm:p-6 overflow-y-auto flex flex-col"
            >

                {/* HEADER */}
                <div className="flex justify-between items-center mb-6">

                    <div>
                        <h1 className="text-lg font-semibold">
                            Manage Match
                        </h1>

                        {/* LIVE INFO */}
                        <div className="flex items-center gap-2 mt-1">

                            {match.status === "live" && (
                                <span className="text-xs text-green-400">
                                    LIVE • {match.currentHalf === 1
                                        ? "First Half"
                                        : "Second Half"}
                                </span>
                            )}

                            {match.status === "halftime" && (
                                <span className="text-xs text-yellow-400">
                                    HALFTIME
                                </span>
                            )}

                            {match.status === "finished" && (
                                <span className="text-xs text-red-400">
                                    FULL TIME
                                </span>
                            )}

                            {match.status === "upcoming" && (
                                <span className="text-xs text-gray-400">
                                    UPCOMING
                                </span>
                            )}
                        </div>
                    </div>

                    <button onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>

                {/* TEAMS */}
                <div className="flex justify-between text-gray-300 mb-4">

                    <span>{match.teamA}</span>

                    <span>VS</span>

                    <span>{match.teamB}</span>
                </div>

                {/* SCORE */}
                <div className="grid grid-cols-2 gap-4 mb-4">

                    <Input
                        type="number"
                        label={match.teamA}
                        value={match.scoreA}
                        onChange={(e) =>
                            handleChange(
                                "scoreA",
                                Number(
                                    e.target.value
                                )
                            )
                        }
                    />

                    <Input
                        type="number"
                        label={match.teamB}
                        value={match.scoreB}
                        onChange={(e) =>
                            handleChange(
                                "scoreB",
                                Number(
                                    e.target.value
                                )
                            )
                        }
                    />
                </div>

                {/* STATUS */}
                <select
                    value={match.status}
                    onChange={(e) =>
                        handleChange(
                            "status",
                            e.target
                                .value as MatchStatus
                        )
                    }
                    className="p-2 bg-[#0B0F19] border border-gray-700 rounded mb-4"
                >
                    <option value="live">
                        Live
                    </option>

                    <option value="halftime">
                        Halftime
                    </option>

                    <option value="finished">
                        Finished
                    </option>

                    <option value="upcoming">
                        Upcoming
                    </option>
                </select>

                {/* LIVE CONTROLS */}
                <div className="flex gap-3 mb-6 flex-wrap">

                    {/* START */}
                    {match.status ===
                        "upcoming" && (
                            <Button
                                onClick={
                                    handleStartMatch
                                }
                            >
                                Start Match
                            </Button>
                        )}

                    {/* FIRST HALF */}
                    {match.status === "live" &&
                        match.currentHalf === 1 && (
                            <Button
                                variant="secondary"
                                onClick={
                                    handleHalftime
                                }
                            >
                                Halftime
                            </Button>
                        )}

                    {/* HALFTIME */}
                    {match.status ===
                        "halftime" && (
                            <Button
                                onClick={
                                    handleContinueMatch
                                }
                            >
                                Start Second Half
                            </Button>
                        )}

                    {/* SECOND HALF */}
                    {match.status === "live" &&
                        match.currentHalf === 2 && (
                            <Button
                                variant="secondary"
                                onClick={
                                    handleEndMatch
                                }
                            >
                                End Match
                            </Button>
                        )}
                </div>

                {/* ADD EVENT */}
                <div className="border-t border-gray-800 pt-4 mb-4">

                    <h2 className="text-sm mb-3 text-gray-400">
                        Add Event
                    </h2>

                    <div className="grid gap-3">

                        {/* TYPE */}
                        <select
                            value={newEvent.type}
                            onChange={(e) =>
                                setNewEvent(
                                    (prev) => ({
                                        ...prev,
                                        type: e
                                            .target
                                            .value as MatchEventType,
                                    })
                                )
                            }
                            className="p-2 bg-[#0B0F19] border border-gray-700 rounded"
                        >
                            <option value="goal">
                                Goal
                            </option>

                            <option value="yellow">
                                Yellow Card
                            </option>

                            <option value="red">
                                Red Card
                            </option>

                            <option value="commentary">
                                Commentary
                            </option>
                        </select>

                        {/* MINUTE */}
                        {newEvent.type !==
                            "commentary" && (
                                <Input
                                    type="number"
                                    label="Minute"
                                    placeholder="e.g 45"
                                    value={
                                        newEvent.minute ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        setNewEvent(
                                            (
                                                prev
                                            ) => ({
                                                ...prev,
                                                minute:
                                                    Number(
                                                        e
                                                            .target
                                                            .value
                                                    ),
                                            })
                                        )
                                    }
                                />
                            )}

                        {/* TEAM */}
                        {newEvent.type !==
                            "commentary" && (
                                <select
                                    value={
                                        newEvent.team ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        setNewEvent(
                                            (
                                                prev
                                            ) => ({
                                                ...prev,
                                                team: e
                                                    .target
                                                    .value as
                                                    | "A"
                                                    | "B",
                                            })
                                        )
                                    }
                                    className="p-2 bg-[#0B0F19] border border-gray-700 rounded"
                                >
                                    <option value="">
                                        Select Team
                                    </option>

                                    <option value="A">
                                        {
                                            match.teamA
                                        }
                                    </option>

                                    <option value="B">
                                        {
                                            match.teamB
                                        }
                                    </option>
                                </select>
                            )}

                        {/* PLAYER */}
                        {(newEvent.type ===
                            "goal" ||
                            newEvent.type ===
                            "yellow" ||
                            newEvent.type ===
                            "red") && (
                                <Input
                                    label="Player"
                                    placeholder="Player Name"
                                    value={
                                        newEvent.player ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        setNewEvent(
                                            (
                                                prev
                                            ) => ({
                                                ...prev,
                                                player:
                                                    e
                                                        .target
                                                        .value,
                                            })
                                        )
                                    }
                                />
                            )}

                        {/* COMMENTARY */}
                        {newEvent.type ===
                            "commentary" && (
                                <textarea
                                    value={
                                        newEvent.text ||
                                        ""
                                    }
                                    placeholder="Commentator says..."
                                    onChange={(e) =>
                                        setNewEvent(
                                            (
                                                prev
                                            ) => ({
                                                ...prev,
                                                text: e
                                                    .target
                                                    .value,
                                            })
                                        )
                                    }
                                    className="p-2 bg-[#0B0F19] border border-gray-700 rounded"
                                />
                            )}

                        <Button
                            onClick={addEvent}
                        >
                            Add Event
                        </Button>
                    </div>
                </div>

                {/* EVENTS */}
                <div className="flex flex-col gap-2 mb-6">

                    {events.map((e) => (

                        <div
                            key={e.id}
                            className="text-sm bg-[#0B0F19] p-3 rounded border border-gray-700"
                        >

                            {e.minute && (
                                <strong>
                                    {e.minute}'
                                </strong>
                            )}{" "}

                            {e.type ===
                                "goal" &&
                                `⚽ ${e.player} (${e.team === "A"
                                    ? match.teamA
                                    : match.teamB
                                })`}

                            {e.type ===
                                "yellow" &&
                                `🟨 ${e.player}`}

                            {e.type ===
                                "red" &&
                                `🟥 ${e.player}`}

                            {e.type ===
                                "commentary" &&
                                `💬 ${e.text}`}
                        </div>
                    ))}
                </div>

                {/* SAVE */}
                <div className="w-full flex items-end justify-end py-3 border-t-[0.1px] border-gray-400">

                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading
                            ? "Saving..."
                            : "Save Match"}
                    </Button>
                </div>
            </motion.aside>
        </div>
    );
}