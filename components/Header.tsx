"use client";

import { publicItems } from "@/utils/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Close, DashboardRounded, EmojiEventsRounded, HomeRounded, LeaderboardRounded, SportsSoccerRounded } from "@mui/icons-material";

function Header() {
    const pathname = usePathname();
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    return (
        <div className="bg-[#020C17] text-white md:py-3 py-2  fixed md:top-0 top-2 md:left-0 md:right-0 left-2 right-2 md:w-full z-50 md:rounded-none rounded-[28px] ">
            {/* container  */}
            <section className="flex items-center justify-center gap-2 md:w-[90%] w-[98%] mx-auto">
                {/* Logo   */}
                <div className="flex flex-1 items-center relative ">
                    <span className="flex items-center md:w-full w-fit rounded-full px-4 md:text-2xl text-xl font-extrabold text-[#3B82F6] tracking-wide md:mx-0 mx-auto">
                        <Link
                            href="/"
                            className=" border-2 border-[#3B82F6] rounded-full p-2 mr-2 flex items-center justify-center"
                        >
                            <img src="/logo.png" alt="" className=" md:w-8 md:h-8 w-6 h-6 object-cover" />
                        </Link>
                    </span>
                </div>

                {/* Navigation */}
                <div className="md:flex hidden flex-1 items-center justify-center">
                    <nav className="w-fit bg-[#151B23] flex items-center gap-4 py-2 px-6 rounded-full">
                        {publicItems.map((item) => (
                            <Link
                                href={item.link}
                                key={item.name}
                                className={
                                    item.link === pathname
                                        ? "text-[#3B82F6] text-[16px] font-semibold duration-300"
                                        : " text-white hover:text-gray-300 duration-100"
                                }
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Auth Button  */}
                <div className="md:flex hidden flex-1 items-center justify-end gap-5  ">
                    <Link
                        href="/auth"
                        className=" text-white bg-[#3B82F6] hover:bg-[#3B82F6]/90 font-bold  md:py-2 py-1.5 md:px-7 px-3 rounded-full cursor-pointer w-fit"
                    >
                        Get Started
                    </Link>
                </div>

            </section>
            {/* Mobile menu */}
            <AnimatePresence>
                <section
                    className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 md:hidden w-fit "
                >
                    <motion.aside
                        initial={{ y: 120, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 120, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative overflow-hidden rounded-full border border-white/10 bg-[#0B1220]/95 backdrop-blur-2xl shadow-2xl p-1"
                    >
                        {/* Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 pointer-events-none" />

                        <div className="relative z-10 flex items-center justify-between gap-2">

                            {publicItems.map((item) => {

                                const isActive = pathname === item.link;

                                const icon =
                                    item.name.toLowerCase() === "home" ? (
                                        <HomeRounded />
                                    ) : item.name.toLowerCase() === "matches" ? (
                                        <SportsSoccerRounded />
                                    ) : item.name.toLowerCase() === "tournaments" ? (
                                        <EmojiEventsRounded />
                                    ) : item.name.toLowerCase() === "standings" ? (
                                        <LeaderboardRounded />
                                    ) : (
                                        <DashboardRounded />
                                    );

                                return (
                                    <Link
                                        href={item.link}
                                        key={item.name}
                                        onClick={() => setOpenMenu(false)}
                                        className={`relative h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 ${isActive
                                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-purple-500/30 scale-105"
                                            : "bg-gray-400/10 text-gray-400 hover:text-white hover:bg-white/5"
                                            }`}
                                    >
                                        {icon}

                                        {/* Active Dot */}
                                        {/* {isActive && (
                                            <span className="absolute bottom-1 h-2 w-2 rounded-full bg-white animate-pulse" />
                                        )} */}
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.aside>
                </section>
            </AnimatePresence>
        </div>
    );
}

export default Header;