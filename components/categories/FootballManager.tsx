"use client";

import React from "react";

import { motion } from "framer-motion";

import CloseIcon from "@mui/icons-material/Close";

import Button from "../ui/Button";
import Input from "../ui/Input";

import useMatchesInfo from "@/utils/logics/usematchesinfo";
import { Settings, SportsSoccer } from "@mui/icons-material";
import Empty from "../ui/Empty";

type MatchStatus =
    | "live"
    | "finished"
    | "upcoming"
    | "halftime";

type MatchEventType =
    | "commentary"
    | "goal"
    | "yellow"
    | "red";

type ManageMatchesProps = {
    matchId: string;
    onClose: () => void;
};

function FootballManager({
    matchId,
    onClose,
}: ManageMatchesProps) {

    const {

        loading,

        match,

        events,

        newEvent,
        setNewEvent,

        handleManageChange,

        addEvent,

        handleManageMatch,

        handleStartMatch,
        handleHalftime,
        handleContinueMatch,
        handleEndMatch,

        handleDeleteMatch

    } = useMatchesInfo(
        onClose,
        matchId
    );
    const [settings, setSettings] = React.useState(true);
    if (!match) {

        return <Empty />
    }

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex justify-end" onClick={onClose}>
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

                className="bg-[#0B0B0B] sm:w-[650px] mt-16 mb-10  w-full h-[90vh] rounded-tl-2xl rounded-bl-2xl p-5 sm:p-6 overflow-y-auto flex flex-col"
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

                                    LIVE • {

                                        match.currentHalf === 1
                                            ? "First Half"
                                            : "Second Half"

                                    }

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

                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>

                </div>

                {/* SCORE */}

                <div className="grid grid-cols-2 gap-4 mb-4">

                    <Input
                        type="number"
                        label={match.teamA}
                        value={match.scoreA}
                        onChange={(e) =>
                            handleManageChange(
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
                            handleManageChange(
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
                        handleManageChange(
                            "status",
                            e.target.value as MatchStatus
                        )
                    }
                    className="p-2 bg-black border border-gray-700 rounded mb-4"
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

                    {match.status === "upcoming" && (

                        <Button
                            onClick={handleStartMatch}
                        >
                            Start Match
                        </Button>

                    )}

                    {match.status === "live" &&
                        match.currentHalf === 1 && (

                            <Button
                                variant="secondary"
                                onClick={handleHalftime}
                            >
                                Halftime
                            </Button>

                        )}

                    {match.status === "halftime" && (

                        <Button
                            onClick={handleContinueMatch}
                        >
                            Start Second Half
                        </Button>

                    )}

                    {match.status === "live" &&
                        match.currentHalf === 2 && (

                            <Button
                                variant="secondary"
                                onClick={handleEndMatch}
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
                                setNewEvent((prev) => ({
                                    ...prev,
                                    type: e.target.value as MatchEventType,
                                }))
                            }
                            className="p-2 bg-black border border-gray-700 rounded"
                        >
                            <option value="commentary">
                                Commentary
                            </option>

                            <option value="goal">
                                Goal
                            </option>

                            <option value="yellow">
                                Yellow Card
                            </option>

                            <option value="red">
                                Red Card
                            </option>


                        </select>

                        {/* MINUTE */}

                        {newEvent.type !== "commentary" && (

                            <Input
                                type="number"
                                label="Minute"
                                placeholder="e.g 45"
                                value={newEvent.minute || ""}
                                onChange={(e) =>
                                    setNewEvent((prev) => ({
                                        ...prev,
                                        minute: Number(
                                            e.target.value
                                        ),
                                    }))
                                }
                            />

                        )}

                        {/* TEAM */}

                        {newEvent.type !== "commentary" && (

                            <select
                                value={newEvent.team || ""}
                                onChange={(e) =>
                                    setNewEvent((prev) => ({
                                        ...prev,
                                        team: e.target.value as "A" | "B",
                                    }))
                                }
                                className="p-2 bg-black border border-gray-700 rounded"
                            >

                                <option value="">
                                    Select Team
                                </option>

                                <option value="A">
                                    {match.teamA}
                                </option>

                                <option value="B">
                                    {match.teamB}
                                </option>

                            </select>

                        )}

                        {/* PLAYER */}

                        {(newEvent.type === "goal" ||
                            newEvent.type === "yellow" ||
                            newEvent.type === "red") && (

                                <Input
                                    label="Player"
                                    placeholder="Player Name"
                                    value={newEvent.player || ""}
                                    onChange={(e) =>
                                        setNewEvent((prev) => ({
                                            ...prev,
                                            player: e.target.value,
                                        }))
                                    }
                                />

                            )}

                        {/* COMMENTARY */}

                        {newEvent.type === "commentary" && (

                            <textarea
                                value={newEvent.text || ""}
                                placeholder="Commentator says..."
                                onChange={(e) =>
                                    setNewEvent((prev) => ({
                                        ...prev,
                                        text: e.target.value,
                                    }))
                                }
                                className="p-2 bg-black border border-gray-700 rounded"
                            />

                        )}

                        <Button onClick={addEvent}>
                            Add Event
                        </Button>

                    </div>

                </div>

                {/* EVENTS */}

                <div className="flex flex-col gap-2 mb-6">

                    {events.map((e) => (

                        <div
                            key={e.id}
                            className="text-sm rounded-xl border border-[#FFFFFF33] bg-[#131313] py-3 px-4 transition-all duration-300 hover:border-gray-700"
                        >

                            {e.minute && (
                                <strong>
                                    {e.minute}'
                                </strong>
                            )}{" "}

                            {e.type === "goal" &&
                                <span className="flex gap-3 items-center text-nowrap">
                                    <SportsSoccer fontSize="small" /> {e.player} ({e.team === "A"
                                        ? match.teamA
                                        : match.teamB
                                    }) </span>}

                            {e.type === "yellow" &&
                                `🟨 ${e.player}`}

                            {e.type === "red" &&
                                `🟥 ${e.player}`}

                            {e.type === "commentary" &&
                                <span className="flex gap-3 items-center text-wrap">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C9.79086 2 8 3.79086 8 6V11C8 13.2091 9.79086 15 12 15C14.2091 15 16 13.2091 16 11V10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12 18V22M12 22H15M12 22H9" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M19 12C18.7174 15.3914 15.8824 18 12.4792 18H11.5208C8.11765 18 5.28262 15.3914 5 12" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M15 4V7.5L17 6H19C19.9428 6 20.4142 6 20.7071 5.70711C21 5.41421 21 4.94281 21 4C21 3.05719 21 2.58579 20.7071 2.29289C20.4142 2 19.9428 2 19 2H17C16.0572 2 15.5858 2 15.2929 2.29289C15 2.58579 15 3.05719 15 4Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    {e.text}
                                </span>}

                        </div>

                    ))}

                </div>

                {/* SAVE */}

                <div className="w-full flex items-center justify-end gap-4 py-5 mb-10  border-t-[0.1px] border-gray-400">


                    <div >

                        {settings ?
                            <span className="cursor-pointer mb-12 hover:scale-105" onClick={() => setSettings(!settings)}><Settings /></span>
                            :
                            <div className="flex items-center gap-2">

                                <Button
                                    onClick={() => handleDeleteMatch(matchId)}
                                    variant="secondaryRed"
                                >
                                    Delete
                                </Button>
                                <hr className="h-5 w-[0.1px] border-none bg-gray-500" />

                                <span className="cursor-pointer hover:scale-105" onClick={() => setSettings(!settings)}><Settings /></span>
                            </div>}
                    </div>
                    <Button
                        variant="primary"
                        onClick={handleManageMatch}
                        disabled={loading}
                    >

                        {loading
                            ? "Saving..."
                            : "Save Match"}

                    </Button>

                </div>

            </motion.aside>
        </div>
    )
}

export default FootballManager