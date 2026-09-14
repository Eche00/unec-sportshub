"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import useMatchesInfo from "@/utils/logics/usematchesinfo";
import { Person, Person2, SportsSoccer } from "@mui/icons-material";
import Loader from "@/components/ui/Loader";
import Empty from "@/components/ui/Empty";
import useTournamentInfo from "@/utils/logics/usetournamentinfo";

export default function Page() {

    const params = useParams();
    const id = params?.id as string;

    const {
        match,
        statusStyles,
        getMatchById, getMatchTime
    } = useMatchesInfo();
    const {
        tournaments,
    } = useTournamentInfo();
    /* FETCH MATCH ON LOAD */
    useEffect(() => {
        if (id) {
            getMatchById(id);
        }
    }, [id]);
    const tabs = ["Lineups", "Formation", "Events"];

    const [activeTab, setActiveTab] = useState("Lineups");
    const tournament = tournaments.find(
        (tournament) => tournament.id === match?.tournamentId
    );

    const teamA = tournament?.teams?.find(
        (team) => team.name === match?.teamA
    );

    const teamB = tournament?.teams?.find(
        (team) => team.name === match?.teamB
    );
    const teamAScorers =
        match?.events?.filter(
            (event: any) => event.type === "goal" && event.team === "A"
        ) || [];

    const teamBScorers =
        match?.events?.filter(
            (event: any) => event.type === "goal" && event.team === "B"
        ) || [];
    const teamASquad = teamA?.squad ?? [];
    const teamBSquad = teamB?.squad ?? [];
    if (!match) {
        return <Loader />;
    }
    return (
        <main className="min-h-screen text-white py-8 absolute top-12 left-1/2 -translate-x-1/2 w-[90%] sm:left-10 sm:right-10 sm:w-auto sm:translate-x-0 z-50">
            <div className=" min-w-[90%] w-full  space-y-6">

                {/* HERO MATCH CARD */}
                <section
                    className="rounded-xl border border-[#FFFFFF33] bg-linear-to-b from-[#FFFFFF33] via-[#FFFFFF0D] to-[#FFFFFF1A] backdrop-blur-[10px] py-8 px-6 transition-all duration-300 relative flex flex-col gap-5 w-full"

                >
                    <span
                        className={`absolute top-0 left-1/2 -translate-x-1/2 text-[12px] px-3 py-1 rounded-b-sm ${statusStyles[match.status]} flex items-center gap-2`}
                    >
                        {match.status.toUpperCase()}
                        {match.status === "live" && (
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF0107] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EF0107]"></span>
                            </span>
                        )}
                    </span>

                    {/* SCORE */}
                    <div className="relative flex items-start justify-between text-[14px] font-medium">

                        {/* TEAM A */}
                        <div className="flex flex-col items-center gap-2 w-[35%] text-center">
                            <img
                                src="/teamA.png"
                                alt={match.teamA}
                                className="w-14 h-14 object-cover"
                            />

                            <span>{match.teamA}</span>

                            {/* SCORERS */}
                            {teamAScorers.length > 0 && (
                                <div className="items-start justify-start  gap-1 mt-1">
                                    {teamAScorers.map((scorer: any, index: number) => (
                                        <span
                                            key={scorer.id ?? index}
                                            className="text-[11px] text-[#A1A1AA] flex items-center gap-1"
                                        >
                                            <SportsSoccer
                                                sx={{ fontSize: 13 }}
                                            />
                                            {scorer.player}
                                            {scorer.minute && (
                                                <span className="text-[#71717A]">
                                                    '{scorer.minute}'
                                                </span>
                                            )}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* SCORE */}
                        <div className="flex flex-col items-center justify-center pt-5">
                            <div className="text-[32px] font-bold">
                                {match.scoreA} : {match.scoreB}
                            </div>
                        </div>

                        {/* TEAM B */}
                        <div className="flex flex-col items-center gap-2 w-[35%] text-center">
                            <img
                                src="/teamB.png"
                                alt={match.teamB}
                                className="w-14 h-14 object-cover bg-white rounded-full"
                            />

                            <span>{match.teamB}</span>

                            {/* SCORERS */}
                            {teamBScorers.length > 0 && (
                                <div className="flex flex-col items-start justify-start gap-1 mt-1">
                                    {teamBScorers.map((scorer: any, index: number) => (
                                        <span
                                            key={scorer.id ?? index}
                                            className="text-[11px] text-[#A1A1AA] flex items-center gap-1"
                                        >
                                            <SportsSoccer
                                                sx={{ fontSize: 13 }}
                                            />
                                            {scorer.player}
                                            {scorer.minute && (
                                                <span className="text-[#71717A]">
                                                    '{scorer.minute}'
                                                </span>
                                            )}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                    {/* DIVIDER */}
                    <div className="h-px max-w-75.5 w-full mx-auto bg-[#FFFFFF1A] to-transparent opacity-40 " />

                    {/* FOOTER */}
                    <div className="flex justify-between text-[12px] text-[#A1A1AA] gap-4">

                        <span className="flex items-center gap-1">
                            {new Date(match.date).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                            })}{" "}
                            - {match.time}
                        </span>

                        <span className=" text-[#FB831C]">

                            {match.location}
                        </span>
                    </div>

                </section>

                {/* EVENTS TABS / SECTION */}
                <div className="flex items-center justify-center gap-3 border-b border-[#FFFFFF1A] pb-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 px-4 py-2 rounded-lg text-[12px] font-medium transition cursor-pointer ${activeTab === tab
                                ? "bg-[#FFFFFF] text-[#171717]"
                                : "bg-[#FFFFFF1A] text-white"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                {activeTab === 'Events' && <div className="flex flex-col gap-3">

                    {match.events && match.events.length > 0 ? (
                        <div className="space-y-2">
                            {match.events
                                .slice()
                                .map((e: any) => (
                                    <div
                                        key={e.id}
                                        className="text-sm bg-[#131313] py-4 px-8 rounded-xl border border-[#FFFFFF33] flex items-center gap-3 text-[#A1A1AA] text-[12px] font-medium"
                                    >
                                        {e.type === "goal" && (
                                            <span>
                                                <SportsSoccer fontSize="small" /> {e.player} (
                                                {e.team === "A"
                                                    ? match.teamA
                                                    : match.teamB}
                                                )
                                            </span>
                                        )}

                                        {e.type === "yellow" && (
                                            <span className="flex gap-3 items-center">
                                                {<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8 13.5H16M8 8.5H12" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M6.09881 19C4.7987 18.8721 3.82475 18.4816 3.17157 17.8284C2 16.6569 2 14.7712 2 11V10.5C2 6.72876 2 4.84315 3.17157 3.67157C4.34315 2.5 6.22876 2.5 10 2.5H14C17.7712 2.5 19.6569 2.5 20.8284 3.67157C22 4.84315 22 6.72876 22 10.5V11C22 14.7712 22 16.6569 20.8284 17.8284C19.6569 19 17.7712 19 14 19C13.4395 19.0125 12.9931 19.0551 12.5546 19.155C11.3562 19.4309 10.2465 20.0441 9.14987 20.5789C7.58729 21.3408 6.806 21.7218 6.31569 21.3651C5.37769 20.6665 6.29454 18.5019 6.5 17.5" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                                                </svg>
                                                }
                                                🟨 {e.player}</span>
                                        )}

                                        {e.type === "red" && (
                                            <span className="flex gap-3 items-center">
                                                {<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8 13.5H16M8 8.5H12" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M6.09881 19C4.7987 18.8721 3.82475 18.4816 3.17157 17.8284C2 16.6569 2 14.7712 2 11V10.5C2 6.72876 2 4.84315 3.17157 3.67157C4.34315 2.5 6.22876 2.5 10 2.5H14C17.7712 2.5 19.6569 2.5 20.8284 3.67157C22 4.84315 22 6.72876 22 10.5V11C22 14.7712 22 16.6569 20.8284 17.8284C19.6569 19 17.7712 19 14 19C13.4395 19.0125 12.9931 19.0551 12.5546 19.155C11.3562 19.4309 10.2465 20.0441 9.14987 20.5789C7.58729 21.3408 6.806 21.7218 6.31569 21.3651C5.37769 20.6665 6.29454 18.5019 6.5 17.5" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                                                </svg>
                                                }🟥 {e.player}</span>
                                        )}

                                        {e.type === "commentary" && (
                                            <span className="flex gap-3 items-center text-wrap">{<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 2C9.79086 2 8 3.79086 8 6V11C8 13.2091 9.79086 15 12 15C14.2091 15 16 13.2091 16 11V10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M12 18V22M12 22H15M12 22H9" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M19 12C18.7174 15.3914 15.8824 18 12.4792 18H11.5208C8.11765 18 5.28262 15.3914 5 12" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M15 4V7.5L17 6H19C19.9428 6 20.4142 6 20.7071 5.70711C21 5.41421 21 4.94281 21 4C21 3.05719 21 2.58579 20.7071 2.29289C20.4142 2 19.9428 2 19 2H17C16.0572 2 15.5858 2 15.2929 2.29289C15 2.58579 15 3.05719 15 4Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            } {e.text}</span>
                                        )}
                                        {e.minute && (
                                            <strong className="text-gray-300">
                                                '{e.minute}'
                                            </strong>
                                        )}{" "}
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <Empty />
                    )}
                </div>}

                {activeTab === "Lineups" && (
                    <div className="grid grid-cols-2 gap-4">

                        {/* TEAM A */}
                        <div>
                            {/* Squad */}
                            <div>
                                {teamA?.squad?.length ? (
                                    <div className="space-y-2">
                                        {teamA.squad.map((player, index) => (
                                            <div
                                                key={player.id}
                                                className="flex items-center justify-between py-3"
                                            >
                                                <div className="flex items-center gap-3">

                                                    {/* Jersey */}
                                                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FFFFFF0D] text-[11px] font-semibold text-[#A1A1AA]">
                                                        {player.jerseyNumber ?? index + 1}
                                                    </span>

                                                    {/* Player */}
                                                    <div>
                                                        <p className="text-[13px] font-medium text-white">
                                                            {player.name}
                                                        </p>

                                                        {player.position && (
                                                            <p className="text-[11px] text-[#71717A]">
                                                                {player.position}
                                                            </p>
                                                        )}
                                                    </div>

                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-8 text-center">
                                        <p className="text-sm font-medium text-white">
                                            No lineup available
                                        </p>
                                        <p className="mt-1 text-xs text-[#71717A]">
                                            No players have been added to this team yet.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>


                        {/* TEAM B */}
                        <div>
                            {/* Squad */}
                            <div>
                                {teamB?.squad?.length ? (
                                    <div className="space-y-2">
                                        {teamB.squad.map((player, index) => (
                                            <div
                                                key={player.id}
                                                className="flex items-center justify-between py-3"
                                            >
                                                <div className="flex items-center gap-3">

                                                    {/* Jersey */}
                                                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FFFFFF0D] text-[11px] font-semibold text-[#A1A1AA]">
                                                        {player.jerseyNumber ?? index + 1}
                                                    </span>

                                                    {/* Player */}
                                                    <div>
                                                        <p className="text-[13px] font-medium text-white">
                                                            {player.name}
                                                        </p>

                                                        {player.position && (
                                                            <p className="text-[11px] text-[#71717A]">
                                                                {player.position}
                                                            </p>
                                                        )}
                                                    </div>

                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-8 text-center">
                                        <p className="text-sm font-medium text-white">
                                            No lineup available
                                        </p>
                                        <p className="mt-1 text-xs text-[#71717A]">
                                            No players have been added to this team yet.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                )}
                {activeTab === "Formation" && (
                    <div className="space-y-6">

                        {/* FORMATION HEADERS */}
                        <div className="grid grid-cols-2 gap-4">

                            <div className="rounded-xl border border-[#FFFFFF1A] bg-[#131313] p-4 text-center">
                                <p className="text-sm font-semibold text-white">
                                    {match.teamA}
                                </p>

                                <p className="text-xs text-[#71717A] mt-1">
                                    {match.formationA || "Formation not set"}
                                </p>
                            </div>

                            <div className="rounded-xl border border-[#FFFFFF1A] bg-[#131313] p-4 text-center">
                                <p className="text-sm font-semibold text-white">
                                    {match.teamB}
                                </p>

                                <p className="text-xs text-[#71717A] mt-1">
                                    {match.formationB || "Formation not set"}
                                </p>
                            </div>

                        </div>

                        {/* PITCHES */}
                        <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-[#FFFFFF33] bg-[#17451F]">

                            {/* SHARED PITCH */}

                            <div className="absolute inset-0">

                                {/* Outer pitch */}
                                <div className="absolute inset-4 border border-white/30 rounded-lg" />

                                {/* Halfway line */}
                                <div className="absolute left-4 right-4 top-1/2 h-px bg-white/30" />

                                {/* Centre circle */}
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[28%] aspect-square border border-white/30 rounded-full" />

                                {/* Centre spot */}
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full" />

                                {/* Top penalty area */}
                                <div className="absolute left-[25%] right-[25%] top-4 h-[18%] border border-white/30 border-t-0" />

                                {/* Bottom penalty area */}
                                <div className="absolute left-[25%] right-[25%] bottom-4 h-[18%] border border-white/30 border-b-0" />

                            </div>


                            {/* TEAM A — ORANGE — ATTACKS UP */}

                            {match.formationA && (
                                <div className="absolute inset-0">

                                    {(() => {

                                        const formationLines = match.formationA
                                            .split("-")
                                            .map(Number)
                                            .filter((n) => !Number.isNaN(n));

                                        const players = [...teamASquad];

                                        const getPositionType = (position?: string) => {

                                            const p =
                                                position?.toLowerCase().trim() || "";

                                            if (
                                                p === "gk" ||
                                                p === "gk." ||
                                                p.includes("goalkeeper") ||
                                                p.includes("keeper") ||
                                                p === "goal"
                                            ) {
                                                return "goalkeeper";
                                            }

                                            if (
                                                p === "df" ||
                                                p === "cb" ||
                                                p === "lb" ||
                                                p === "rb" ||
                                                p === "lwb" ||
                                                p === "rwb" ||
                                                p.includes("defender") ||
                                                p.includes("defence") ||
                                                p.includes("defense")
                                            ) {
                                                return "defender";
                                            }

                                            if (
                                                p === "mf" ||
                                                p === "cm" ||
                                                p === "cdm" ||
                                                p === "dm" ||
                                                p === "am" ||
                                                p === "lm" ||
                                                p === "rm" ||
                                                p.includes("midfielder") ||
                                                p.includes("midfield")
                                            ) {
                                                return "midfielder";
                                            }

                                            if (
                                                p === "fw" ||
                                                p === "st" ||
                                                p === "cf" ||
                                                p === "lw" ||
                                                p === "rw" ||
                                                p.includes("forward") ||
                                                p.includes("striker") ||
                                                p.includes("attacker") ||
                                                p.includes("attack") ||
                                                p.includes("winger")
                                            ) {
                                                return "forward";
                                            }

                                            return "other";
                                        };


                                        //    GOALKEEPER

                                        const goalkeeper = players.find(
                                            (player) =>
                                                getPositionType(player.position) ===
                                                "goalkeeper"
                                        );


                                        const assignedIds = new Set<string>();

                                        if (goalkeeper?.id) {
                                            assignedIds.add(goalkeeper.id);
                                        }


                                        //    PLAYER POOLS

                                        const defenders = players.filter(
                                            (player) =>
                                                !assignedIds.has(player.id) &&
                                                getPositionType(player.position) ===
                                                "defender"
                                        );

                                        const midfielders = players.filter(
                                            (player) =>
                                                !assignedIds.has(player.id) &&
                                                getPositionType(player.position) ===
                                                "midfielder"
                                        );

                                        const forwards = players.filter(
                                            (player) =>
                                                !assignedIds.has(player.id) &&
                                                getPositionType(player.position) ===
                                                "forward"
                                        );

                                        const otherPlayers = players.filter(
                                            (player) =>
                                                !assignedIds.has(player.id) &&
                                                getPositionType(player.position) ===
                                                "other"
                                        );


                                        //    TAKE PLAYERS

                                        const takePlayers = (
                                            pool: any[],
                                            count: number
                                        ) => {

                                            const result: any[] = [];

                                            for (const player of pool) {

                                                if (result.length >= count) break;
                                                if (!player?.id) continue;
                                                if (assignedIds.has(player.id)) continue;

                                                result.push(player);
                                                assignedIds.add(player.id);
                                            }

                                            return result;
                                        };


                                        //    BUILD FORMATION

                                        const outfieldLines: any[][] = [];

                                        formationLines.forEach(
                                            (count, lineIndex) => {

                                                if (count <= 0) {
                                                    outfieldLines.push([]);
                                                    return;
                                                }

                                                let linePlayers: any[] = [];

                                                // DEFENCE
                                                if (lineIndex === 0) {

                                                    linePlayers = takePlayers(
                                                        defenders,
                                                        count
                                                    );

                                                }

                                                // ATTACK
                                                else if (
                                                    lineIndex ===
                                                    formationLines.length - 1
                                                ) {

                                                    linePlayers = takePlayers(
                                                        forwards,
                                                        count
                                                    );

                                                }

                                                // MIDFIELD
                                                else {

                                                    linePlayers = takePlayers(
                                                        midfielders,
                                                        count
                                                    );

                                                    // Forward fallback
                                                    if (
                                                        linePlayers.length <
                                                        count
                                                    ) {

                                                        linePlayers.push(
                                                            ...takePlayers(
                                                                forwards,
                                                                count -
                                                                linePlayers.length
                                                            )
                                                        );
                                                    }

                                                    // Unknown position fallback
                                                    if (
                                                        linePlayers.length <
                                                        count
                                                    ) {

                                                        linePlayers.push(
                                                            ...takePlayers(
                                                                otherPlayers,
                                                                count -
                                                                linePlayers.length
                                                            )
                                                        );
                                                    }
                                                }


                                                // Final fallback
                                                if (
                                                    linePlayers.length <
                                                    count
                                                ) {

                                                    linePlayers.push(
                                                        ...takePlayers(
                                                            players,
                                                            count -
                                                            linePlayers.length
                                                        )
                                                    );
                                                }

                                                outfieldLines.push(
                                                    linePlayers
                                                );
                                            }
                                        );


                                        //    PLAYER RENDER

                                        const renderPlayer = (
                                            player: any,
                                            left: number,
                                            bottom: number
                                        ) => {

                                            if (!player) return null;

                                            return (
                                                <div
                                                    key={`team-a-${player.id}`}
                                                    className="absolute -translate-x-1/2 -translate-y-1/2"
                                                    style={{
                                                        left: `${left}%`,
                                                        bottom: `${bottom}%`,
                                                    }}
                                                >

                                                    <div
                                                        className="
                                    w-7 h-7
                                    sm:w-10 sm:h-10
                                    rounded-full
                                    bg-orange-500
                                    text-white
                                    flex items-center justify-center
                                    shadow-lg
                                    border-2 border-orange-300
                                "
                                                    >
                                                        <Person
                                                            sx={{
                                                                fontSize: {
                                                                    xs: 18,
                                                                    sm: 24,
                                                                },
                                                            }}
                                                        />
                                                    </div>

                                                </div>
                                            );
                                        };


                                        //    LINE RENDER

                                        const renderLine = (
                                            linePlayers: any[],
                                            bottom: number
                                        ) => {

                                            if (!linePlayers.length)
                                                return null;

                                            return linePlayers.map(
                                                (player, index) => {

                                                    const left =
                                                        ((index + 1) /
                                                            (linePlayers.length + 1)) *
                                                        100;

                                                    return renderPlayer(
                                                        player,
                                                        left,
                                                        bottom
                                                    );
                                                }
                                            );
                                        };


                                        //    TEAM A GK

                                        const goalkeeperElement =
                                            goalkeeper
                                                ? renderPlayer(
                                                    goalkeeper,
                                                    50,
                                                    8
                                                )
                                                : null;


                                        //    TEAM A LINES

                                        const lineCount =
                                            outfieldLines.length;

                                        const renderedLines =
                                            outfieldLines.map(
                                                (linePlayers, index) => {

                                                    if (!linePlayers.length)
                                                        return null;

                                                    const progress =
                                                        lineCount <= 1
                                                            ? 0
                                                            : index /
                                                            (lineCount - 1);

                                                    const bottom =
                                                        25 +
                                                        progress * 53;

                                                    return (
                                                        <React.Fragment
                                                            key={`team-a-line-${index}`}
                                                        >
                                                            {renderLine(
                                                                linePlayers,
                                                                bottom
                                                            )}
                                                        </React.Fragment>
                                                    );
                                                }
                                            );


                                        return (
                                            <>
                                                {goalkeeperElement}
                                                {renderedLines}
                                            </>
                                        );

                                    })()}

                                </div>
                            )}


                            {/* TEAM B — WHITE — ATTACKS DOWN */}

                            {match.formationB && (
                                <div className="absolute inset-0">

                                    {(() => {

                                        const formationLines = match.formationB
                                            .split("-")
                                            .map(Number)
                                            .filter((n) => !Number.isNaN(n));

                                        const players = [...teamBSquad];

                                        const getPositionType = (
                                            position?: string
                                        ) => {

                                            const p =
                                                position?.toLowerCase().trim() || "";

                                            if (
                                                p === "gk" ||
                                                p === "gk." ||
                                                p.includes("goalkeeper") ||
                                                p.includes("keeper") ||
                                                p === "goal"
                                            ) {
                                                return "goalkeeper";
                                            }

                                            if (
                                                p === "df" ||
                                                p === "cb" ||
                                                p === "lb" ||
                                                p === "rb" ||
                                                p === "lwb" ||
                                                p === "rwb" ||
                                                p.includes("defender") ||
                                                p.includes("defence") ||
                                                p.includes("defense")
                                            ) {
                                                return "defender";
                                            }

                                            if (
                                                p === "mf" ||
                                                p === "cm" ||
                                                p === "cdm" ||
                                                p === "dm" ||
                                                p === "am" ||
                                                p === "lm" ||
                                                p === "rm" ||
                                                p.includes("midfielder") ||
                                                p.includes("midfield")
                                            ) {
                                                return "midfielder";
                                            }

                                            if (
                                                p === "fw" ||
                                                p === "st" ||
                                                p === "cf" ||
                                                p === "lw" ||
                                                p === "rw" ||
                                                p.includes("forward") ||
                                                p.includes("striker") ||
                                                p.includes("attacker") ||
                                                p.includes("attack") ||
                                                p.includes("winger")
                                            ) {
                                                return "forward";
                                            }

                                            return "other";
                                        };


                                        //    GOALKEEPER

                                        const goalkeeper = players.find(
                                            (player) =>
                                                getPositionType(
                                                    player.position
                                                ) === "goalkeeper"
                                        );


                                        const assignedIds = new Set<string>();

                                        if (goalkeeper?.id) {
                                            assignedIds.add(
                                                goalkeeper.id
                                            );
                                        }


                                        //    PLAYER POOLS

                                        const defenders =
                                            players.filter(
                                                (player) =>
                                                    !assignedIds.has(
                                                        player.id
                                                    ) &&
                                                    getPositionType(
                                                        player.position
                                                    ) === "defender"
                                            );

                                        const midfielders =
                                            players.filter(
                                                (player) =>
                                                    !assignedIds.has(
                                                        player.id
                                                    ) &&
                                                    getPositionType(
                                                        player.position
                                                    ) === "midfielder"
                                            );

                                        const forwards =
                                            players.filter(
                                                (player) =>
                                                    !assignedIds.has(
                                                        player.id
                                                    ) &&
                                                    getPositionType(
                                                        player.position
                                                    ) === "forward"
                                            );

                                        const otherPlayers =
                                            players.filter(
                                                (player) =>
                                                    !assignedIds.has(
                                                        player.id
                                                    ) &&
                                                    getPositionType(
                                                        player.position
                                                    ) === "other"
                                            );


                                        //    TAKE PLAYERS

                                        const takePlayers = (
                                            pool: any[],
                                            count: number
                                        ) => {

                                            const result: any[] = [];

                                            for (const player of pool) {

                                                if (
                                                    result.length >=
                                                    count
                                                )
                                                    break;

                                                if (!player?.id)
                                                    continue;

                                                if (
                                                    assignedIds.has(
                                                        player.id
                                                    )
                                                )
                                                    continue;

                                                result.push(player);

                                                assignedIds.add(
                                                    player.id
                                                );
                                            }

                                            return result;
                                        };


                                        //    BUILD FORMATION

                                        const outfieldLines: any[][] = [];

                                        formationLines.forEach(
                                            (count, lineIndex) => {

                                                if (count <= 0) {

                                                    outfieldLines.push(
                                                        []
                                                    );

                                                    return;
                                                }

                                                let linePlayers: any[] =
                                                    [];

                                                // DEFENCE
                                                if (
                                                    lineIndex === 0
                                                ) {

                                                    linePlayers =
                                                        takePlayers(
                                                            defenders,
                                                            count
                                                        );
                                                }

                                                // ATTACK
                                                else if (
                                                    lineIndex ===
                                                    formationLines.length -
                                                    1
                                                ) {

                                                    linePlayers =
                                                        takePlayers(
                                                            forwards,
                                                            count
                                                        );
                                                }

                                                // MIDFIELD
                                                else {

                                                    linePlayers =
                                                        takePlayers(
                                                            midfielders,
                                                            count
                                                        );

                                                    // Forward fallback
                                                    if (
                                                        linePlayers.length <
                                                        count
                                                    ) {

                                                        linePlayers.push(
                                                            ...takePlayers(
                                                                forwards,
                                                                count -
                                                                linePlayers.length
                                                            )
                                                        );
                                                    }

                                                    // Unknown position fallback
                                                    if (
                                                        linePlayers.length <
                                                        count
                                                    ) {

                                                        linePlayers.push(
                                                            ...takePlayers(
                                                                otherPlayers,
                                                                count -
                                                                linePlayers.length
                                                            )
                                                        );
                                                    }
                                                }


                                                // Final fallback
                                                if (
                                                    linePlayers.length <
                                                    count
                                                ) {

                                                    linePlayers.push(
                                                        ...takePlayers(
                                                            players,
                                                            count -
                                                            linePlayers.length
                                                        )
                                                    );
                                                }

                                                outfieldLines.push(
                                                    linePlayers
                                                );
                                            }
                                        );


                                        //    PLAYER RENDER

                                        const renderPlayer = (
                                            player: any,
                                            left: number,
                                            top: number
                                        ) => {

                                            if (!player) return null;

                                            return (
                                                <div
                                                    key={`team-b-${player.id}`}
                                                    className="absolute -translate-x-1/2 -translate-y-1/2"
                                                    style={{
                                                        left: `${left}%`,
                                                        top: `${top}%`,
                                                    }}
                                                >

                                                    <div
                                                        className="
                                    w-7 h-7
                                    sm:w-10 sm:h-10
                                    rounded-full
                                    bg-white
                                    text-black
                                    flex items-center justify-center
                                    shadow-lg
                                    border-2 border-gray-300
                                "
                                                    >
                                                        <Person2
                                                            sx={{
                                                                fontSize: {
                                                                    xs: 18,
                                                                    sm: 24,
                                                                },
                                                            }}
                                                        />
                                                    </div>

                                                </div>
                                            );
                                        };


                                        //    LINE RENDER

                                        const renderLine = (
                                            linePlayers: any[],
                                            top: number
                                        ) => {

                                            if (!linePlayers.length)
                                                return null;

                                            return linePlayers.map(
                                                (player, index) => {

                                                    const left =
                                                        ((index + 1) /
                                                            (linePlayers.length + 1)) *
                                                        100;

                                                    return renderPlayer(
                                                        player,
                                                        left,
                                                        top
                                                    );
                                                }
                                            );
                                        };


                                        //    TEAM B GK

                                        const goalkeeperElement =
                                            goalkeeper
                                                ? renderPlayer(
                                                    goalkeeper,
                                                    50,
                                                    8
                                                )
                                                : null;


                                        //    TEAM B LINES

                                        const lineCount =
                                            outfieldLines.length;

                                        const renderedLines =
                                            outfieldLines.map(
                                                (linePlayers, index) => {

                                                    if (!linePlayers.length)
                                                        return null;

                                                    const progress =
                                                        lineCount <= 1
                                                            ? 0
                                                            : index /
                                                            (lineCount - 1);

                                                    const top =
                                                        25 +
                                                        progress * 53;

                                                    return (
                                                        <React.Fragment
                                                            key={`team-b-line-${index}`}
                                                        >
                                                            {renderLine(
                                                                linePlayers,
                                                                top
                                                            )}
                                                        </React.Fragment>
                                                    );
                                                }
                                            );


                                        return (
                                            <>
                                                {goalkeeperElement}
                                                {renderedLines}
                                            </>
                                        );

                                    })()}

                                </div>
                            )}


                            {/* OPTIONAL TEAM LABELS */}

                            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
                                <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-[10px] sm:text-xs font-semibold">
                                    {teamB?.name}
                                </div>
                            </div>

                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
                                <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-orange-400 text-[10px] sm:text-xs font-semibold">
                                    {teamA?.name}
                                </div>
                            </div>

                        </div>

                    </div>
                )}

            </div>
        </main>
    );
}