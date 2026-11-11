
'use client';

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

const AUTH_ROUTES = [
    "/signin",
    "/signup",
    "/verify",
    "/get-started",
];

const ONBOARDING_ROUTES = [
    "/verify",
    "/profile-setup",
];

const isProfileIncomplete = (data: Record<string, any>) => {
    return (
        !data.userName ||
        !data.phone ||
        !data.gender ||
        !data.universityId ||
        !data.facultyId ||
        !data.departmentId ||
        !data.classId
    );
};

export const UseUserGuard = () => {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        let isActive = true;

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!isActive) return;

            const isAuthRoute = AUTH_ROUTES.includes(pathname);
            const isOnboardingRoute = ONBOARDING_ROUTES.includes(pathname);

            // 1. No authenticated user
            if (!user) {
                if (isOnboardingRoute) {
                    router.replace("/get-started");
                }
                return;
            }

            // 2. Email not verified
            if (!user.emailVerified) {
                if (pathname !== "/verify") {
                    router.replace("/verify");
                }
                return;
            }

            try {
                // 3. Fetch user profile
                const userRef = doc(db, "users", user.uid);
                const snap = await getDoc(userRef);

                if (!isActive) return;

                if (!snap.exists()) {
                    router.replace("/profile-setup");
                    return;
                }

                const data = snap.data();

                // 4. Check profile completion
                if (isProfileIncomplete(data)) {
                    if (pathname !== "/profile-setup") {
                        router.replace("/profile-setup");
                    }
                    return;
                }

                // 5. Profile complete: block auth and onboarding pages
                if (isAuthRoute || isOnboardingRoute) {
                    router.replace("/");
                }

            } catch (error) {
                console.error("User guard error:", error);
            }
        });

        return () => {
            isActive = false;
            unsubscribe();
        };
    }, [router, pathname]);
};
