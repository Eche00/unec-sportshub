"use client";


import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

function Header() {
    const router = useRouter()
    const user = auth.currentUser;

    const handleNavigate = () => {
        if (user) {
            router.push("/")
        }
        router.push("/get-started")
    }

    return (
        <div className="fixed top-0 left-0 w-full h-fit z-50 bg-[var(--background)] py-[12px]">
            <section className="flex items-center gap-[12px] w-[90%] mx-auto">
                <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.99609 5H20.9961" stroke-width="1.5" stroke-linecap="round" stroke="white" />
                        <path d="M2.99609 11.9951H20.9961" stroke-width="1.5" stroke-linecap="round" stroke="white" />
                        <path d="M10.9961 19H2.99609" stroke-width="1.5" stroke-linecap="round" stroke="white" />
                        <path d="M20.9961 18.9902H14.9961" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
                    </svg>

                </span>
                <div className="bg-[#141414] flex flex-1 items-center gap-2 px-[16px] py-[12px] rounded-[24px]">
                    <span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.3333 11.3333L13.9999 14" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="#8C8C8C" />
                            <path d="M12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="#8C8C8C" />
                        </svg>
                    </span>
                    <input type="text" placeholder="Search" className="bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none w-full" />
                </div>
                <span className="bg-[#141414] p-[14px] rounded-full cursor-pointer" onClick={handleNavigate}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
                        <path d="M12 14C7 14 4 16.5 4 19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19C20 16.5 17 14 12 14Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
                    </svg>

                </span>
            </section>
        </div>
    );
}

export default Header;