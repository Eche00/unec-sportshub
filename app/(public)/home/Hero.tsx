import useMatchesInfo from '@/utils/logics/usematchesinfo';
import { useUserInfo } from '@/utils/logics/userinfo';
import { SportsSoccer } from '@mui/icons-material';
import React, { useEffect, useMemo, useState } from 'react'

function Hero() {
    const { filteredMatches, loading } = useMatchesInfo();

    // featured match
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

    useEffect(() => {
        if (!filteredMatches?.length) {
            setCurrentHeroIndex(0);
            return;
        }

        const interval = setInterval(() => {
            setCurrentHeroIndex((prev) => (prev + 1) % filteredMatches.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [filteredMatches?.length]);

    const featuredMatch = useMemo(() => {
        if (!filteredMatches?.length) return null;

        const safeIndex = currentHeroIndex % filteredMatches.length;
        return filteredMatches[safeIndex];
    }, [filteredMatches, currentHeroIndex]);

    return (
        <div className='relative w-full h-[310px] rounded-t-[24px] overflow-hidden'>
            <img src="/home1.jpg" alt="" className='w-full h-full object-cover ' />
            <div className='absolute inset-0 bg-linear-to-b from-transparent via-[var(--background)]/90 to-[var(--background)] z-10' />
            <span className='absolute top-3 right-4 z-20 text-[12px] font-bold text-white bg-[#0B0B0B1A] backdrop-blur-md border-y border-white/50 px-[16px] py-[8px] rounded-full'>
                Featured
            </span>
            {/* Mask wrapper */}
            <div
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                    maskImage: "linear-gradient(to bottom, transparent 50%, black 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent 50%, black 100%)",
                }}
            >
                {/* Actual blur */}
                <div className="absolute inset-0 backdrop-blur-lg z-10" />

            </div>
            <div className='absolute bottom-0 left-0 w-full z-20'>
                {/* match */}
                {loading ? (
                    // Loading skeleton
                    <section className="w-[90%] mx-auto flex flex-col gap-3 animate-pulse">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-white/10" />
                            <div className="h-4 w-40 rounded-md bg-white/10" />
                        </div>

                        <div className="space-y-3">
                            <div className="h-3 w-48 rounded-md bg-white/10" />
                            <div className="h-3 w-36 rounded-md bg-white/10" />
                        </div>
                    </section>
                ) : featuredMatch ? (
                    <section className='w-[90%] mx-auto flex flex-col gap-[12px]'>
                        <div className='flex items-center gap-[12px]'>
                            <img src="/featured-match.png" className='w-[36px] h-[36px]' alt="" />
                            <h2 className='text-[16px] font-medium text-white'>{featuredMatch.name}</h2>
                        </div>

                        <div>
                            <p className='flex items-center gap-[10px] text-[12px] font-medium text-[var(--muted)]'>
                                <span>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.33341 1.16669V3.50002M4.66675 1.16669V3.50002" stroke-linecap="round" stroke-linejoin="round" stroke="#B5B5B5" />
                                        <path d="M7.58333 2.33331H6.41667C4.21678 2.33331 3.11684 2.33331 2.43342 3.01673C1.75 3.70015 1.75 4.80009 1.75 6.99998V8.16665C1.75 10.3665 1.75 11.4665 2.43342 12.1499C3.11684 12.8333 4.21678 12.8333 6.41667 12.8333H7.58333C9.7832 12.8333 10.8832 12.8333 11.5666 12.1499C12.25 11.4665 12.25 10.3665 12.25 8.16665V6.99998C12.25 4.80009 12.25 3.70015 11.5666 3.01673C10.8832 2.33331 9.7832 2.33331 7.58333 2.33331Z" stroke-linecap="round" stroke-linejoin="round" stroke="#B5B5B5" />
                                        <path d="M1.75 5.83331H12.25" stroke-linecap="round" stroke-linejoin="round" stroke="#B5B5B5" />
                                        <path d="M6.41675 8.16669H9.33341M4.66675 8.16669H4.67199M7.58341 10.5H4.66675M9.33341 10.5H9.32816" stroke-linecap="round" stroke-linejoin="round" stroke="#B5B5B5" />
                                    </svg>

                                </span>
                                {featuredMatch.date} • {featuredMatch.time}
                            </p>
                            <p className='flex items-center gap-[10px] text-[12px] font-medium text-[var(--muted)]'>
                                <span>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 5.54169C8.75 6.50821 7.96652 7.29169 7 7.29169C6.03347 7.29169 5.25 6.50821 5.25 5.54169C5.25 4.57519 6.03347 3.79169 7 3.79169C7.96652 3.79169 8.75 4.57519 8.75 5.54169Z" stroke="#B5B5B5" />
                                        <path d="M7 1.16669C9.36763 1.16669 11.375 3.16637 11.375 5.59238C11.375 8.05702 9.33497 9.7866 7.45062 10.9627C7.31331 11.0418 7.15802 11.0834 7 11.0834C6.84197 11.0834 6.68669 11.0418 6.54937 10.9627C4.66856 9.77511 2.625 8.06554 2.625 5.59238C2.625 3.16637 4.63237 1.16669 7 1.16669Z" stroke="#B5B5B5" />
                                        <path d="M10.5 11.6667C10.5 12.311 8.93299 12.8334 7 12.8334C5.067 12.8334 3.5 12.311 3.5 11.6667" stroke-linecap="round" stroke="#B5B5B5" />
                                    </svg>


                                </span>
                                {featuredMatch.location} • {featuredMatch.status}
                            </p>
                        </div>
                    </section>
                ) : (
                    <div className="flex min-h-[220px] items-center justify-center rounded-xl">
                        <div className="text-center">
                            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-gray-700">
                                <SportsSoccer className="text-gray-400" />
                            </div>

                            <p className="text-sm font-semibold text-gray-300">
                                No matches yet
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                Featured match will appear here.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Hero