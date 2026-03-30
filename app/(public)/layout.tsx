import Header from '@/components/Header';
import React from 'react'

function Publiclayout({ children }: { children: React.ReactNode; }) {
    return (
        <>
            <Header />
            <main className="bg-[#0A0F1C] text-white min-h-screen ">{children}</main>
        </>
    )
}

export default Publiclayout