'use client'

import AddIcon from "@mui/icons-material/Add";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import PaidIcon from "@mui/icons-material/Paid";
import Link from "next/link";

export default function Page() {
    return (
        <div className="min-h-screen bg-[#0A0F1C] text-white flex flex-col gap-8">
            {/* CTA */}
            <Link href='/admin/Tournaments' className="flex items-center gap-2 w-fit px-5 py-2 rounded-xl font-medium 
                bg-linear-to-r from-cyan-400 to-purple-500 text-black 
                hover:scale-105 transition shadow-lg cursor-pointer">
                <AddIcon fontSize="small" />
                New Tournament
            </Link>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    label="Tournaments"
                    value="128"
                    icon={<EmojiEventsIcon />}
                />
                <StatCard
                    label="Active Tournaments"
                    value="14"
                    icon={<EmojiEventsIcon />}
                />
                <StatCard
                    label="Active Matches"
                    value="4"
                    icon={<GroupsIcon />}
                />
                <StatCard
                    label="Teams"
                    value="14"
                    icon={<SportsEsportsIcon />}
                />
            </div>

            {/* Active Tournaments */}
            <div>
                <h3 className="text-lg font-semibold mb-4 bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    Active Tournaments
                </h3>

                <div className="relative group bg-gradient-to-b from-[#111827] to-[#0B0F19]  rounded-2xl p-6 border border-gray-800 
        hover:border-purple-400/40 transition overflow-hidden">

                    {/* Glow Layer */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition 
            bg-linear-to-r from-cyan-500/10 to-purple-500/10 blur-xl" />

                    {/* Top Row */}
                    <div className="flex justify-between items-start relative z-10">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                                Tournament
                            </p>

                            <h4 className="text-xl sm:text-2xl font-bold mt-1">
                                Neon Strike Masters
                            </h4>
                        </div>

                        {/* Status Badge */}
                        <span className="px-3 py-1 text-xs rounded-full 
                bg-green-400/10 text-green-400 border border-green-400/20">
                            Live
                        </span>
                    </div>

                    {/* Divider */}
                    <div className="my-4 h-[1px] bg-gray-800" />

                    {/* Bottom Row */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">

                        {/* Left Info */}
                        <div className="flex items-center gap-6 text-sm text-gray-400">
                            <div>
                                <p className="text-xs">Stage</p>
                                <p className="text-white font-medium">Round 3</p>
                            </div>

                            <div>
                                <p className="text-xs">Teams</p>
                                <p className="text-white font-medium">16</p>
                            </div>

                            <div>
                                <p className="text-xs">Matches</p>
                                <p className="text-white font-medium">8 Active</p>
                            </div>
                        </div>

                        {/* CTA */}
                        <Link href='/admin/Tournaments' className="group/btn flex items-center gap-2 text-sm font-medium">
                            <span className="bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                                View All
                            </span>

                            <span className="transform group-hover/btn:translate-x-1 transition">
                                →
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Upcoming Matches */}
            <div>
                <h3 className="text-lg font-semibold mb-4 bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    Upcoming Matches
                </h3>

                <div className="relative group bg-gradient-to-b from-[#111827] to-[#0B0F19]  rounded-2xl p-5 border border-gray-800 
        hover:border-cyan-400/40 transition flex justify-between items-center overflow-hidden">

                    {/* Glow hover effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition 
            bg-linear-to-r from-cyan-500/10 to-purple-500/10 blur-xl" />

                    {/* Left Content */}
                    <div className="relative z-10">
                        <p className="text-xs text-gray-500 tracking-wide uppercase">
                            Match #32
                        </p>

                        <h4 className="font-semibold text-lg mt-1">
                            Cyber Circuit Pro
                        </h4>

                        {/* Optional status badge */}
                        <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full 
                bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
                            Upcoming
                        </span>
                    </div>

                    {/* Right Content */}
                    <div className="relative z-10 text-right">
                        <p className="text-sm text-gray-400">Tomorrow</p>
                        <p className="text-lg font-semibold">8:00 PM</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/*  STAT CARD  */

function StatCard({
    label,
    value,
    icon,
}: {
    label: string;
    value: string;
    icon: React.ReactNode;
}) {
    return (
        <div className="relative bg-[#111827] p-5 rounded-2xl border border-gray-800 
            hover:border-cyan-400/40 transition group overflow-hidden">

            {/* glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition 
                bg-linear-to-r from-cyan-500/10 to-purple-500/10 blur" />

            <div className="relative z-10 flex flex-col gap-2">
                <div className="text-cyan-400">
                    {icon}
                </div>

                <p className="text-gray-400 text-sm">{label}</p>

                <h2 className="text-xl sm:text-2xl font-bold">
                    {value}
                </h2>
            </div>
        </div>
    );
}