"use client"

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react'

function Publiclayout({ children }: { children: React.ReactNode; }) {
    const [openSideBar, setOpenSideBar] = useState<boolean>(false)

    return (
        <main>
            <Header openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />

            <AnimatePresence>
                {openSideBar && (
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-50"
                    >
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30
                            }}
                        >
                            <Sidebar setOpenSideBar={setOpenSideBar} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="bg-[var(--background)] min-h-screen pt-20">
                {children}
            </main>
        </main>
    )
}

export default Publiclayout