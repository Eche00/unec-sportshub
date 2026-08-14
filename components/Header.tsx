"use client";

import useTournamentInfo from "@/utils/logics/usetournamentinfo";
import { ArrowBackIos, EmojiEvents } from "@mui/icons-material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Header() {
    const pathname = usePathname()
    const router = useRouter()
    const {
        tournaments,
    } = useTournamentInfo();
    const images = [
        "/home.jpg",
        "/home1.jpg",
    ];
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {

            setCurrentImage((prev) =>
                (prev + 1) % images.length
            );

        }, 10000);

        return () => clearInterval(interval);

    }, [images.length]);
    return (
        <div className="">
            <section className="relative w-full h-fit">
                {pathname.startsWith("/tournaments/") ? (
                    <div className="flex flex-col gap-7 absolute w-[95%] mx-auto top-5 left-1/2 -translate-x-1/2  z-40">

                        <button
                            onClick={() => router.push('/tournaments')}
                            className=" bg-[#FFFFFF1A] backdrop-blur-[10px] text-white w-10 h-10 flex items-center justify-center border border-[#FFFFFF4D] rounded-full cursor-pointer"
                        >
                            <ArrowBackIos fontSize="small" />
                        </button>

                        <h1 className="absolute top-2 left-1/2 -translate-x-1/2 text-[#FFFFFF] whitespace-nowrap text-[20px] font-medium">
                            {tournaments.find((tournament) =>
                                pathname.includes(tournament.id)
                            )?.name}
                        </h1>
                    </div>

                ) : pathname.startsWith("/matches/") ? (<div className="flex flex-col gap-7 absolute w-[95%] mx-auto top-5 left-1/2 -translate-x-1/2  z-40">

                    <button
                        onClick={() => router.push('/')}
                        className=" bg-[#FFFFFF1A] backdrop-blur-[10px] text-white w-10 h-10 flex items-center justify-center border border-[#FFFFFF4D] rounded-full cursor-pointer"
                    >
                        <ArrowBackIos fontSize="small" />
                    </button>

                </div>) : (
                    <div className="flex flex-col gap-7 absolute w-[95%] mx-auto top-5 left-1/2 -translate-x-1/2  z-40">
                        <div className=" flex flex-1 items-center justify-between">
                            <span className="">
                                <Link
                                    href="/"
                                    className="bg-white rounded-full flex items-center justify-center"
                                >
                                    <img src="/logo.png" alt="" className="w-8 h-8 object-cover" />
                                </Link>
                            </span>
                            <Link href="/tournaments" className=" bg-[#FFFFFF1A] backdrop-blur-[10px] text-white w-10 h-10 flex items-center justify-center border border-[#FFFFFF4D] rounded-full"><EmojiEvents fontSize="small" /></Link>
                        </div>
                        <h1 className=" text-[32px] font-semibold">Unec Sports Hub</h1>
                    </div>
                )}
                <img src={images[currentImage]} alt="" className={`w-full h-35.75 object-bottom object-cover z-10`} />
                <div className={`absolute top-0 left-0 w-full h-35.75 bg-linear-to-b from-[#0B0B0B00] to-[#0B0B0B] z-30`}></div>
            </section>
        </div>
    );
}

export default Header;