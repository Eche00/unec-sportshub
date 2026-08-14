"use client";

import Empty from "@/components/ui/Empty";
import Loader from "@/components/ui/Loader";
import useTournamentInfo from "@/utils/logics/usetournamentinfo";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";



export default function Page() {
    const router = useRouter()
    const {
        filteredTournaments,
        loading,
    } = useTournamentInfo();

    return (
        <div className="min-h-screen sm:p-6 max-w-[90%] mx-auto space-y-6 mt-6">
            {/* Head  */}
            <div className="relative flex items-center">
                <button
                    onClick={() => router.push('/')}
                    className=" bg-[#FFFFFF1A] w-[40px] h-[40px] flex items-center justify-center border border-[#FFFFFF4D] rounded-full cursor-pointer"
                >
                    <ArrowBackIos fontSize="small" />
                </button>

                <p className="absolute left-1/2 -translate-x-1/2 text-[#FFFFFF] whitespace-nowrap text-[20px] font-medium">
                    Tournaments
                </p>
            </div>

            {/* Tournament List */}
            <section className="space-y-4">

                {/* LOADING */}
                {loading && <Loader />}

                {/* LIST */}
                <div className="flex flex-col sm:grid sm:grid-cols-2 ">

                    {!loading && filteredTournaments.length > 0 ? (
                        filteredTournaments.map((tournament) => {
                            return (
                                <div
                                    key={tournament.id}
                                    className="flex items-center justify-between py-4 px-3 border-b border-[#FFFFFF1A]"
                                >
                                    <span className="text-sm font-medium text-gray-200 block capitalize">
                                        {tournament.name} - {tournament.category}
                                    </span>

                                    <Link href={`/tournaments/${tournament.id}`}><ArrowForwardIos fontSize="small" /></Link>
                                </div>
                            );
                        })
                    ) : !loading ? (
                        <div className="flex items-center justify-center">
                            <Empty />
                        </div>
                    ) : null}
                </div>
            </section>
        </div>
    );
}