"use client"

import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function Authlayout({ children }: { children: React.ReactNode; }) {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user && user.emailVerified) {
                router.push("/admin");
                return;
            }
        });

        return () => unsubscribe();
    }, [router]);
    return (
        <main >{children}</main>
    )
}

export default Authlayout