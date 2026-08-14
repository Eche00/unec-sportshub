"use client";


import MatchCard from "@/components/match/MatchCard";
import Empty from "@/components/ui/Empty";

import useMatchesInfo, { Matches } from "@/utils/logics/usematchesinfo";
import { useMemo, useState } from "react";
import { ArrowForwardIos } from "@mui/icons-material";
import Link from "next/link";
import useTournamentInfo from "@/utils/logics/usetournamentinfo";
import Loader from "@/components/ui/Loader";

type MatchTabs =
    | "all"
    | "live"
    | "upcoming"
    | "completed";

const tabs: MatchTabs[] = [
    "all",
    "live",
    "upcoming",
    "completed",
];

export default function Page() {
    const { loading, filteredMatches } = useMatchesInfo();
    const { tournaments } = useTournamentInfo();
    const [activeTab, setActiveTab] = useState<MatchTabs>("all");

    // FILTER MATCHES BY TAB
    const tabFilteredMatches = useMemo(() => {

        let matches = filteredMatches;

        // FILTER BY TAB

        if (activeTab !== "all") {

            matches = filteredMatches.filter((match) => {

                switch (activeTab) {

                    case "live":
                        return match.status === "live";

                    case "upcoming":
                        return match.status === "upcoming";

                    case "completed":
                        return match.status === "finished";

                    default:
                        return true;
                }

            });
        }

        // SORT BY DATE + TIME

        return [...matches].sort((a, b) => {

            const dateTimeA = new Date(
                `${a.date} ${a.time}`
            ).getTime();

            const dateTimeB = new Date(
                `${b.date} ${b.time}`
            ).getTime();

            return dateTimeA - dateTimeB;
        });

    }, [
        filteredMatches,
        activeTab,
    ]);

    // GROUP FILTERED MATCHES
    const groupedMatches = useMemo(() => {

        const tournamentGroups: Record<
            string,
            Matches[]
        > = {};

        const standaloneMatches: Matches[] = [];

        tabFilteredMatches.forEach((match) => {

            if (!match.tournamentId) {

                standaloneMatches.push(match);

                return;
            }

            if (!tournamentGroups[match.tournamentId]) {

                tournamentGroups[
                    match.tournamentId
                ] = [];

            }

            tournamentGroups[
                match.tournamentId
            ].push(match);

        });

        return {
            tournamentGroups,
            standaloneMatches,
        };

    }, [
        tabFilteredMatches,
    ]);

    if (loading) {
        return (
            <Loader />
        );
    }

    return (
        <main className="relative min-h-screen text-white">

            <div className="smLmax-w-7xl max-w-[95%] mx-auto ">
                {/* MATCHES */}
                <div>



                    <div className="flex flex-col gap-10 pb-10">
                        <div className="sticky top-0 z-40 pt-2 flex items-center gap-6 border-b border-[#FFFFFF1A] bg-[#0B0B0B]">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    type="button"
                                    onClick={() => setActiveTab(tab)}
                                    className={`relative pb-2 text-[14px] font-semibold uppercase transition-colors cursor-pointer ${activeTab === tab
                                        ? "text-white"
                                        : "text-[#A1A1AA] hover:text-gray-300"
                                        }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}

                                    {activeTab === tab && (
                                        <span className="absolute bottom-0 left-0 h-0.75 w-full bg-white rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>
                        {/* TOURNAMENT MATCHES */}
                        {tabFilteredMatches.length > 0 && Object.entries(groupedMatches.tournamentGroups).map(
                            ([tournamentId, tournamentMatches]) => {

                                const tournament = tournaments.find(
                                    (t) => t.id === tournamentId
                                );

                                if (!tournament) return null;

                                return (
                                    <section
                                        key={tournamentId}
                                        className="flex flex-col gap-5"
                                    >

                                        <div className="flex items-center justify-between">

                                            <div className="flex items-center gap-2">

                                                <img
                                                    src="/logo.png"
                                                    alt=""
                                                    className="w-8 h-8 object-cover rounded-full bg-white"
                                                />

                                                <h2 className="text-sm font-semibold uppercase">
                                                    {tournament.name}
                                                </h2>

                                            </div>

                                            <Link
                                                href={`/tournaments/${tournament.id}`}
                                            >
                                                <ArrowForwardIos fontSize="small" />
                                            </Link>

                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                            {tournamentMatches.map((match) => (
                                                <MatchCard
                                                    key={match.id}
                                                    {...match}
                                                />
                                            ))}

                                        </div>

                                    </section>
                                );
                            }
                        )}

                        {/* MATCHES WITH NO TOURNAMENT */}
                        {groupedMatches.standaloneMatches.length > 0 && (
                            <section className="flex flex-col gap-5">

                                <h2 className="text-sm font-semibold uppercase text-gray-400">
                                    Matches
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                    {groupedMatches.standaloneMatches.map((match) => (
                                        <MatchCard
                                            key={match.id}
                                            {...match}
                                        />
                                    ))}

                                </div>

                            </section>
                        )}

                    </div>

                    {/* Empty Tab  */}
                    {!loading && tabFilteredMatches.length === 0 && (
                        <Empty />
                    )}
                </div>
            </div>
        </main>
    );
}

