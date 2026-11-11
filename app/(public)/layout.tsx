"use client"

import Header from '@/components/Header';
import React from 'react'

function Publiclayout({ children }: { children: React.ReactNode; }) {
    return (
        <>
            <Header />
            <main className="bg-[#0B0B0B] text-white min-h-screen pt-20">{children}</main>
        </>
    )
}

export default Publiclayout