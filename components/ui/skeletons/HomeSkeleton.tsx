import React from "react";

function HomeSkeleton() {
    return (
        <div className="animate-pulse space-y-10 max-w-7xl mx-auto sm:pt-28">

            {/* HERO SKELETON */}
            <section className="rounded-[30px] border border-white/10 bg-[#1B2230] p-6 sm:p-10 space-y-6">

                {/* top badge */}
                <div className="h-4 w-40 bg-white/10 rounded-full" />

                <div className="grid lg:grid-cols-2 gap-8 items-center">

                    {/* LEFT */}
                    <div className="space-y-5">

                        <div className="h-4 w-32 bg-white/10 rounded" />

                        <div className="space-y-3">
                            <div className="h-12 w-3/4 bg-white/10 rounded" />
                            <div className="h-12 w-2/3 bg-white/10 rounded" />
                        </div>

                        <div className="h-4 w-full bg-white/10 rounded" />
                        <div className="h-4 w-5/6 bg-white/10 rounded" />

                        {/* hero match skeleton */}
                        <div className="mt-6 h-20 w-full max-w-md bg-white/10 rounded-2xl" />
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="h-[300px] sm:h-[420px] bg-white/10 rounded-3xl" />
                </div>
            </section>

            {/* TABS */}
            <div className="flex gap-3 border-b border-white/10 pb-3">
                <div className="h-10 w-24 bg-white/10 rounded-full" />
                <div className="h-10 w-28 bg-white/10 rounded-full" />
            </div>

            {/* GRID CARDS */}
            <div className="grid sm:grid-cols-2 gap-4">

                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="rounded-2xl border border-white/10 bg-[#1B2230] p-5 space-y-4"
                    >
                        {/* top */}
                        <div className="flex justify-between items-center">
                            <div className="flex gap-3 items-center">
                                <div className="h-10 w-10 bg-white/10 rounded-lg" />
                                <div className="space-y-2">
                                    <div className="h-3 w-32 bg-white/10 rounded" />
                                    <div className="h-2 w-20 bg-white/10 rounded" />
                                </div>
                            </div>

                            <div className="h-6 w-16 bg-white/10 rounded-full" />
                        </div>

                        {/* divider */}
                        <div className="h-px bg-white/10" />

                        {/* bottom */}
                        <div className="flex justify-between">
                            <div className="space-y-2">
                                <div className="h-3 w-20 bg-white/10 rounded" />
                                <div className="h-3 w-24 bg-white/10 rounded" />
                            </div>

                            <div className="h-8 w-24 bg-white/10 rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>

            {/* FEATURES */}
            <div className="grid md:grid-cols-3 gap-6 mt-10">

                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="h-32 bg-[#1B2230] border border-white/10 rounded-3xl"
                    />
                ))}
            </div>
        </div>
    );
}

export default HomeSkeleton;