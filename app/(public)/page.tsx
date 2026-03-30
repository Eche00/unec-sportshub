'use client'

import Link from "next/link";
import { motion } from "framer-motion";

export default function Page() {
    return (
        <main className="relative min-h-screen bg-[#0B0F14] text-white overflow-hidden flex items-center justify-center flex-col">

            {/* Animated Background Blobs */}
            <div className="absolute inset-0 z-10 overflow-hidden">

                {/* Blob 1 */}
                <div className="absolute w-75 h-75 bg-linear-to-r from-cyan-500 to-purple-500 
        opacity-20 blur-[120px] rounded-full -top-12.5 -left-12.5 animate-pulse" />

                {/* Blob 2 */}
                <div className="absolute w-62.5 h-62.5 bg-linear-to-r from-purple-500 to-pink-500 
        opacity-20 blur-[120px] rounded-full -bottom-15 -right-10 animate-[float_8s_ease-in-out_infinite]" >22</div>

                {/* Blob 3 */}
                <div className="absolute w-50 h-50 bg-linear-to-r from-cyan-400 to-blue-500 
        opacity-20 blur-[100px] rounded-full top-[40%] left-[10%] animate-[float_10s_ease-in-out_infinite]" />

                {/* Blob 4 */}
                <div className="absolute w-55 h-55 bg-linear-to-r from-indigo-500 to-purple-500 
        opacity-20 blur-[110px] rounded-full top-[20%] right-[15%] animate-[float_12s_ease-in-out_infinite]" />

                {/* Blob 5 */}
                <div className="absolute w-45 h-45 bg-linear-to-r from-cyan-300 to-purple-400 
        opacity-20 blur-[90px] rounded-full bottom-[20%] left-[30%] animate-[float_9s_ease-in-out_infinite]" />
            </div>


            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center gap-6 z-20">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-bold leading-tight"
                >
                    <span className="bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                        Sports
                    </span>{" "}
                    Manager
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 max-w-2xl"
                >
                    Create, manage, and track tournaments in real-time. Control matches
                    live and let users follow every moment.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-4 mt-4"
                >
                    <Link
                        href="/Tournaments"
                        className="px-6 py-3 rounded-2xl bg-linear-to-r from-cyan-400 to-purple-500 text-black font-semibold hover:scale-105 transition"
                    >
                        View Tournaments
                    </Link>

                    <Link
                        href="/tournament/create"
                        className="px-6 py-3 rounded-2xl border border-gray-600 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition"
                    >
                        Create Tournament
                    </Link>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="max-w-6xl mx-auto px-6 pb-20 flex flex-wrap items-center justify-center gap-6 z-20">
                {features.map((feature, i) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15 }}
                        viewport={{ once: true }}
                        className="max-w-[320px] w-full relative bg-[#111827] p-6 rounded-2xl border border-gray-800 hover:border-cyan-400/50 transition group"
                    >
                        {/* Glow Effect */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-linear-to-r from-cyan-500/10 to-purple-500/10 blur" />

                        <h3 className="text-xl font-semibold mb-2 bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                            {feature.title}
                        </h3>

                        <p className="text-gray-400 text-sm relative z-10">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </section>
        </main>
    );
}

const features = [
    {
        title: "Create Matches",
        description:
            "Set up matches with teams, real-time updates, and schedules.",
    },
    {
        title: "Create Tournaments",
        description:
            "Quickly set up tournaments with teams, formats, and schedules.",
    },
    {
        title: "Live Match Control",
        description:
            "Update scores, events, and match status in real-time from the admin panel.",
    },
    {
        title: "Team & Player Management",
        description:
            "Add, edit, and manage teams and players with full control over lineups.",
    },
    {
        title: "Real-Time Viewing",
        description:
            "Users can follow match progress live with instant updates (coming soon...).",
    },
];