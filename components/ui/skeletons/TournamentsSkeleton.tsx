/* app/tournaments/loading.tsx */

import { Search, SportsSoccer } from "@mui/icons-material";

function Skeleton({
    className = "",
}: {
    className?: string;
}) {
    return (
        <div
            className={`bg-gray-800 rounded animate-pulse ${className}`}
        />
    );
}

export default function TournamentsSkeleton() {
    return (
        <div className="min-h-screen">
            <div className=" space-y-6">

                {/* SEARCH BAR */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

                    <div className="w-full h-12 rounded-xl bg-[#1F2933] border border-gray-800 animate-pulse" />
                </div>

                {/* TOURNAMENT SECTION */}
                <section className="space-y-4 pt-6 border-t border-gray-800">

                    {/* GRID */}
                    <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">

                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                style={{
                                    animationDelay: `${index * 120}ms`,
                                }}
                                className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-b from-[#111827] to-[#0B0F19] p-6 space-y-4"
                            >

                                {/* TOP */}
                                <div className="flex items-start justify-between">

                                    <div className="flex items-center gap-3">

                                        {/* ICON */}
                                        <div className="p-2 rounded-lg bg-white/5 border border-gray-700">
                                            <SportsSoccer className="text-gray-600" />
                                        </div>

                                        {/* TITLE */}
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-3 w-20" />
                                        </div>
                                    </div>

                                    {/* STATUS */}
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                </div>

                                {/* DIVIDER */}
                                <div className="h-px bg-gray-800" />

                                {/* BOTTOM */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                                    {/* INFO */}
                                    <div className="flex items-center gap-6 flex-wrap">

                                        <div className="space-y-2">
                                            <Skeleton className="h-3 w-12" />
                                            <Skeleton className="h-4 w-24" />
                                        </div>

                                        <div className="space-y-2">
                                            <Skeleton className="h-3 w-10" />
                                            <Skeleton className="h-4 w-8" />
                                        </div>

                                        <div className="space-y-2">
                                            <Skeleton className="h-3 w-16" />
                                            <Skeleton className="h-4 w-24" />
                                        </div>

                                    </div>

                                    {/* ACTION */}
                                    <div className="flex items-center gap-3">

                                        <div className="h-5 w-[1px] bg-gray-700" />

                                        <Skeleton className="h-4 w-24" />
                                    </div>
                                </div>

                                {/* SHIMMER EFFECT */}
                                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                                </div>
                            </div>
                        ))}

                    </div>
                </section>
            </div>
        </div>
    );
}