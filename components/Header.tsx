"use client";


import { auth } from "@/lib/firebase";
import { useUserInfo } from "@/utils/logics/userinfo";
import { useRouter } from "next/navigation";

interface SidebarProps {
    openSideBar: boolean;
    setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}
function Header({ openSideBar, setOpenSideBar }: SidebarProps) {
    const router = useRouter()
    const user = auth.currentUser;
    const { userInfo } = useUserInfo();
    return (
        <div className="fixed top-0 left-0 w-full h-fit z-50 bg-[var(--background)] py-[12px]">
            <section className="flex items-center gap-[12px] w-[90%] mx-auto">
                <button onClick={() => setOpenSideBar(!openSideBar)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.99609 5H20.9961" stroke-width="1.5" stroke-linecap="round" stroke="white" />
                        <path d="M2.99609 11.9951H20.9961" stroke-width="1.5" stroke-linecap="round" stroke="white" />
                        <path d="M10.9961 19H2.99609" stroke-width="1.5" stroke-linecap="round" stroke="white" />
                        <path d="M20.9961 18.9902H14.9961" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
                    </svg>

                </button>
                <div className="bg-[#141414] flex flex-1 items-center gap-2 px-[16px] py-[12px] rounded-[24px]">
                    <span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.3333 11.3333L13.9999 14" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="#8C8C8C" />
                            <path d="M12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="#8C8C8C" />
                        </svg>
                    </span>
                    <input type="text" placeholder="Search" className="bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none w-full" />
                </div>
                {user ?
                    <div className="flex items-center gap-[12px]">
                        <span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.5 18C15.5 19.933 13.933 21.5 12 21.5C10.067 21.5 8.5 19.933 8.5 18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
                                <path d="M19.2311 18H4.76887C3.79195 18 3 17.208 3 16.2311C3 15.762 3.18636 15.3121 3.51809 14.9803L4.12132 14.3771C4.68393 13.8145 5 13.0514 5 12.2558V9.5C5 5.63401 8.13401 2.5 12 2.5C15.866 2.5 19 5.634 19 9.5V12.2558C19 13.0514 19.3161 13.8145 19.8787 14.3771L20.4819 14.9803C20.8136 15.3121 21 15.762 21 16.2311C21 17.208 20.208 18 19.2311 18Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
                            </svg>


                        </span>
                        <img onClick={() => router.push('/profile')} src={userInfo?.profileImage || userInfo?.gender === "male" ? '/male.png' : '/female.png'} alt="" className="h-[32px] w-[32px] object-cover rounded-full" />
                    </div> :
                    <span className="bg-[#141414] p-[14px] rounded-full cursor-pointer" onClick={() => router.push('/get-started')}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
                            <path d="M12 14C7 14 4 16.5 4 19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19C20 16.5 17 14 12 14Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
                        </svg>

                    </span>

                }
            </section>
        </div>
    );
}

export default Header;