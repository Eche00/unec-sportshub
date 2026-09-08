'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export const UseAdminGuard = () => {
    const router = useRouter();

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            timeoutId = setTimeout(async () => {
                if (!user) {
                    router.replace("/");
                    return;
                }

                try {
                    const userRef = doc(db, "users", user.uid);
                    const snap = await getDoc(userRef);

                    if (!snap.exists()) {
                        router.replace("/");
                        return;
                    }

                    const data = snap.data();

                    if (data.role !== "admin" && data.role !== "superadmin") {
                        router.replace("/");
                    }
                } catch (error) {
                    console.error("Admin guard error:", error);
                    router.replace("/");
                }
            }, 2000);
        });

        return () => {
            unsubscribe();

            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [router]);
};