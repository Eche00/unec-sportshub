/* app/matches/loading.tsx */

import SearchIcon from "@mui/icons-material/Search";

export default function MatchesSkeleton() {
    return (
        <div className="min-h-screen sm:p-6 mt-22 animate-pulse">
            <div className="max-w-[90%] mx-auto space-y-6">

                {/* SEARCH BAR */}
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

                    <div className="w-full h-12 rounded-xl bg-[#1F2933] border border-gray-800" />
                </div>

                {/* MATCH GRID */}
                <div className="grid gap-4 sm:grid-cols-2">

                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-gray-800 bg-[#0F172A] p-5 space-y-4"
                        >

                            {/* top */}
                            <div className="flex items-center justify-between">
                                <div className="h-4 w-24 bg-gray-800 rounded" />

                                <div className="h-6 w-16 bg-gray-800 rounded-full" />
                            </div>

                            {/* teams */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <div className="h-5 w-28 bg-gray-700 rounded" />

                                    <div className="h-8 w-14 bg-gray-700 rounded" />
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="h-5 w-28 bg-gray-700 rounded" />

                                    <div className="h-8 w-14 bg-gray-700 rounded" />
                                </div>
                            </div>

                            {/* divider */}
                            <div className="h-px bg-gray-800" />

                            {/* footer */}
                            <div className="flex justify-between">
                                <div className="h-4 w-24 bg-gray-800 rounded" />
                                <div className="h-4 w-20 bg-gray-800 rounded" />
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}