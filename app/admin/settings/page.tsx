"use client";

import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import Tournaments from "./tabs/Tournaments";
import Matches from "./tabs/Matches";
import { useUserInfo } from "@/utils/logics/userinfo";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";
import Users from "./tabs/Users";

type AdminTab = "users" | "tournaments" | "matches";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<AdminTab>("users");
    const userInfo = useUserInfo();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);

            if (!userInfo || userInfo.role !== "superadmin") {
                router.replace("/");
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [userInfo, router]);

    if (loading) {
        return <Loader />;
    }

    const tabs = [
        {
            id: "users" as AdminTab,
            label: "Users",
        },
        {
            id: "tournaments" as AdminTab,
            label: "Tournaments",
        },
        {
            id: "matches" as AdminTab,
            label: "Matches",
        },
    ];

    return (
        <div className="w-full space-y-6 ">
            {/* HEADER */}
            <div className="flex items-center justify-between gap-2 ">

                <h1 className="text-2xl font-semibold flex items-center gap-2">
                    Admin Management
                </h1>

                <Button
                    variant="primary"
                >
                    USH
                </Button>
            </div>

            {/* Tabs */}
            <div className="sticky top-0 z-40 pt-2 flex items-center gap-6 border-b border-[#FFFFFF1A] bg-[#0B0B0B]">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative pb-2 text-[14px] font-semibold uppercase transition-colors cursor-pointer ${activeTab === tab.id
                            ? "text-white"
                            : "text-[#A1A1AA] hover:text-gray-300"
                            }`}
                    >
                        {tab.label}

                        {activeTab === tab.id && (
                            <span className="absolute bottom-0 left-0 h-0.75 w-full bg-[#FB831C] rounded-full" />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === "users" && (
                    <Users />
                )}

                {activeTab === "tournaments" && (
                    <Tournaments />
                )}

                {activeTab === "matches" && (
                    <Matches />
                )}
            </div>
        </div>
    );
}