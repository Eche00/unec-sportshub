"use client";

import Loader from "@/components/ui/Loader";
import CreateProfileCta from "./home/CreateProfileCta";
import Hero from "./home/Hero";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";

type MatchTabs = "all" | "live" | "upcoming" | "completed";

const tabs: MatchTabs[] = ["all", "live", "upcoming", "completed"];

export default function Page() {
    const user = auth.currentUser;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [])


    if (loading) return <Loader />;

    return (
        <main className="relative min-h-screen text-white">
            <div className=" max-w-[90%] mx-auto flex flex-col gap-5">
                {!user && <CreateProfileCta />}
                <Hero />

            </div>
        </main>
    );
}