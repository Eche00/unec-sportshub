'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import HomeIcon from "@mui/icons-material/OtherHouses";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { handleSignOut, useUserInfo } from '@/utils/logics/userinfo';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';


// Sidebar type
type SideBarItem = {
    name: string;
    link: string;
    icon: React.ReactNode;
};


export const sidebarNav: SideBarItem[] = [
    {
        name: "Overview", link: "/", icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 9.99101V12.083C2.5 14.8328 2.5 16.2078 3.35427 17.0621C4.20854 17.9163 5.58347 17.9163 8.33333 17.9163H11.6667C14.4165 17.9163 15.7914 17.9163 16.6457 17.0621C17.5 16.2078 17.5 14.8328 17.5 12.083V9.99101C17.5 8.58992 17.5 7.88945 17.2034 7.28305C16.9068 6.67665 16.3539 6.24657 15.248 5.38643L13.5813 4.09013C11.8609 2.75205 11.0007 2.08301 10 2.08301C8.99925 2.08301 8.13908 2.75205 6.41868 4.09013L4.75201 5.38643C3.64611 6.24657 3.09316 6.67665 2.79658 7.28305C2.5 7.88945 2.5 8.58992 2.5 9.99101Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="var(--primary)" />
            <path d="M13.3333 14.167H6.66663" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="var(--primary)" />
        </svg>
        ,
    },
    {
        name: "Players", link: "/players", icon:
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3333 5.83333C13.3333 7.67428 11.8409 9.16667 9.99996 9.16667C8.15901 9.16667 6.66663 7.67428 6.66663 5.83333C6.66663 3.99238 8.15901 2.5 9.99996 2.5C11.8409 2.5 13.3333 3.99238 13.3333 5.83333Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="var(--primary)" />
                <path d="M10 11.667C5.83337 11.667 3.33337 13.7503 3.33337 15.8337C3.33337 16.7542 4.07957 17.5003 5.00004 17.5003H15C15.9205 17.5003 16.6667 16.7542 16.6667 15.8337C16.6667 13.7503 14.1667 11.667 10 11.667Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="var(--primary)" />
            </svg>
        ,
    },
    {
        name: "Teams", link: "/teams", icon:
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.4162 17.0833C15.2219 14.6404 13.2014 12.7064 10.6733 12.5434L9.99954 12.5C9.75888 12.5063 9.53463 12.5148 9.32304 12.5248C6.81725 12.6436 4.77529 14.6645 4.58289 17.0833" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="var(--primary)" />
                <path d="M12.7079 7.70833C12.7079 9.20408 11.4953 10.4167 9.99958 10.4167C8.50383 10.4167 7.29126 9.20408 7.29126 7.70833C7.29126 6.21256 8.50383 5 9.99958 5C11.4953 5 12.7079 6.21256 12.7079 7.70833Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="var(--primary)" />
                <path d="M4.58543 7.08366C4.31592 6.6627 4.15967 6.16226 4.15967 5.62533C4.15967 4.12955 5.37223 2.91699 6.86799 2.91699C7.23962 2.91699 7.59377 2.99184 7.91618 3.12728" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="var(--primary)" />
                <path d="M15.4136 7.08366C15.6831 6.6627 15.8394 6.16226 15.8394 5.62533C15.8394 4.12955 14.6268 2.91699 13.1311 2.91699C12.7595 2.91699 12.4053 2.99184 12.0829 3.12728" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="var(--primary)" />
                <path d="M18.334 14.9993C18.1841 13.1142 16.6663 11.2497 14.9996 10.833" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="var(--primary)" />
                <path d="M1.66602 14.9993C1.81598 13.1142 3.3337 11.2497 5.00037 10.833" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="var(--primary)" />
            </svg>
        ,
    },
    {
        name: "Tournaments", link: "/tournaments", icon:
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.8337 14.166C10.8306 15.7175 11.5526 16.5468 12.3246 17.3263C12.4347 17.4375 12.4971 17.5873 12.4971 17.7437C12.4971 18.0693 12.233 18.3334 11.9073 18.3334H8.08685C7.76112 18.3334 7.49707 18.0693 7.49707 17.7437C7.49707 17.5873 7.55946 17.4375 7.66954 17.3263C8.4416 16.5468 9.16394 15.7175 9.16702 14.166" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="var(--primary)" />
                <path d="M15.0556 3.33301H16.3056C17.2258 3.33301 17.9935 4.07963 17.91 4.99607C17.7121 7.16929 16.825 10.2975 13.3336 11.2497" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="var(--primary)" />
                <path d="M4.94425 3.33301H3.69425C2.77402 3.33301 2.00639 4.07963 2.08984 4.99607C2.28774 7.16929 3.17488 10.2975 6.66626 11.2497" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="var(--primary)" />
                <path d="M10.0735 14.166C13.3454 14.166 14.6839 7.71243 14.9956 3.34977C15.0618 2.42403 14.3008 1.66602 13.3599 1.66602H6.64047C5.69991 1.66602 4.93815 2.42342 5.00355 3.34888C5.31278 7.72427 6.64599 14.166 9.86004 14.166H10.0735Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="var(--primary)" />
            </svg>
        ,
    },
    {
        name: "Live Matches", link: "/matches", icon:
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.66663 7.14253C1.66663 5.34671 1.66663 4.44879 2.15478 3.8909C2.64293 3.33301 3.42861 3.33301 4.99996 3.33301H15C16.5713 3.33301 17.357 3.33301 17.8451 3.8909C18.3333 4.44879 18.3333 5.34671 18.3333 7.14253V12.8568C18.3333 14.6527 18.3333 15.5506 17.8451 16.1084C17.357 16.6663 16.5713 16.6663 15 16.6663H4.99996C3.42861 16.6663 2.64293 16.6663 2.15478 16.1084C1.66663 15.5506 1.66663 14.6527 1.66663 12.8568V7.14253Z" stroke-width="1.5" stroke-linejoin="round" stroke="var(--primary)" />
                <path d="M11.6667 9.99967C11.6667 10.9201 10.9205 11.6663 10 11.6663C9.07957 11.6663 8.33337 10.9201 8.33337 9.99967C8.33337 9.0792 9.07957 8.33301 10 8.33301C10.9205 8.33301 11.6667 9.0792 11.6667 9.99967Z" stroke-width="1.5" stroke-linejoin="round" stroke="var(--primary)" />
                <path d="M10 8.33366V4.16699M10 11.667V15.8337" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="var(--primary)" />
                <path d="M18.3333 7.5H16.25C15.7897 7.5 15.4166 7.8731 15.4166 8.33333V11.6667C15.4166 12.1269 15.7897 12.5 16.25 12.5H18.3333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="var(--primary)" />
                <path d="M1.66663 7.5H3.74996C4.21019 7.5 4.58329 7.8731 4.58329 8.33333V11.6667C4.58329 12.1269 4.21019 12.5 3.74996 12.5H1.66663" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="var(--primary)" />
            </svg>
        ,
    },
    {
        name: "Settings", link: "/settings", icon:
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.9167 9.99967C12.9167 11.6105 11.6109 12.9163 10 12.9163C8.38921 12.9163 7.08337 11.6105 7.08337 9.99967C7.08337 8.38884 8.38921 7.08301 10 7.08301C11.6109 7.08301 12.9167 8.38884 12.9167 9.99967Z" stroke-width="1.5" stroke="var(--primary)" />
                <path d="M17.5091 11.7473C17.944 11.6301 18.1615 11.5714 18.2474 11.4593C18.3333 11.3472 18.3333 11.1668 18.3333 10.806V9.19459C18.3333 8.83384 18.3333 8.65343 18.2474 8.54134C18.1615 8.42918 17.944 8.37051 17.5091 8.25324C15.8838 7.81492 14.8665 6.11568 15.286 4.50098C15.4014 4.05692 15.459 3.83489 15.404 3.70467C15.3489 3.57444 15.1909 3.48471 14.8747 3.30523L13.4375 2.4892C13.1273 2.31308 12.9722 2.22503 12.833 2.24378C12.6938 2.26253 12.5368 2.4192 12.2226 2.73253C11.0066 3.94566 8.99463 3.94561 7.77858 2.73246C7.46448 2.41912 7.30744 2.26245 7.16823 2.24369C7.02903 2.22494 6.87393 2.313 6.56373 2.48912L5.12649 3.30515C4.8104 3.48462 4.65235 3.57435 4.59728 3.70455C4.54219 3.83476 4.59985 4.05682 4.71517 4.50093C5.13443 6.11568 4.11639 7.81495 2.49081 8.25326C2.05589 8.37051 1.83843 8.42918 1.75253 8.54126C1.66663 8.65343 1.66663 8.83384 1.66663 9.19459V10.806C1.66663 11.1668 1.66663 11.3472 1.75253 11.4593C1.83842 11.5714 2.05588 11.6301 2.49081 11.7473C4.11613 12.1857 5.13336 13.8849 4.71389 15.4996C4.59853 15.9437 4.54085 16.1657 4.59593 16.2959C4.65101 16.4262 4.80906 16.5159 5.12517 16.6953L6.56242 17.5114C6.87263 17.6875 7.02774 17.7756 7.16696 17.7568C7.30618 17.7381 7.46319 17.5813 7.77722 17.268C8.99388 16.0539 11.0073 16.0538 12.224 17.2679C12.538 17.5813 12.695 17.738 12.8343 17.7568C12.9735 17.7755 13.1286 17.6874 13.4388 17.5113L14.876 16.6953C15.1922 16.5158 15.3503 16.4261 15.4053 16.2958C15.4604 16.1656 15.4027 15.9436 15.2873 15.4995C14.8676 13.8849 15.884 12.1858 17.5091 11.7473Z" stroke-width="1.5" stroke-linecap="round" stroke="var(--primary)" />
            </svg>
        ,
    },
];

//  OPTIONAL EXTRA (future expansion)
export const adminSecondary: SideBarItem[] = [{
    name: "Home",
    link: "/",
    icon: <HomeIcon />,
},
];
interface SidebarProps {
    setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}
function Sidebar({ setOpenSideBar }: SidebarProps) {
    const currentUser = auth.currentUser
    const pathname = usePathname()
    const { userInfo } = useUserInfo();
    const router = useRouter()
    return (
        <main onClick={() => setOpenSideBar(false)} className='fixed bg-black/60 backdrop-blur-xs top-0 left-0 w-full h-screen z-50 font-medium'>
            <div onClick={(e) => e.stopPropagation()} className="bg-[var(--background)] absolute top-0 left-0 text-white  w-[85%] h-screen flex flex-col gap-[12px] py-[16px] px-[24px] rounded-tr-[24px] rounded-br-[24px]">

                {/* Logo Section  */}
                <div className="flex items-center">
                    <span className="flex items-center gap-[8px] w-full rounded-lg  text-2xl font-extrabold  tracking-wide">
                        <img src="/logo.png" alt="" className=' w-8 h-8 object-cover' />
                        <p className="text-[14px]">Versity Sports</p>
                    </span>
                </div>

                <hr className='h-[1px] w-full bg-[#141414] border-none' />
                {/*  profile information  */}
                {currentUser && <section className=' flex flex-col gap-[12px]'>

                    {/* profile image */}
                    <img src={userInfo?.profileImage || "/logo.png"} alt="" className='w-[56px] h-[56px] rounded-full object-cover bg-[var(--background)]' />

                    {/* full name and verification status */}
                    <p className='flex items-center  gap-[8px] text-[18px] text-nowrap'>
                        {userInfo?.fullName || "player"}

                        {userInfo?.status === "pending" ? (
                            <span className='flex items-center justify-center gap-[8px] text-[12px] font-medium text-[#339933] bg-[#00800033] px-[8px] py-[2px] rounded-full'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.99756 2V4" stroke-width="1.5" stroke-linecap="round" stroke="#339933" />
                                    <path d="M7.99756 12V14" stroke-width="1.5" stroke-linecap="round" stroke="#339933" />
                                    <path d="M13.9976 8H11.9976" stroke-width="1.5" stroke-linecap="round" stroke="#339933" />
                                    <path d="M3.99756 8H1.99756" stroke-width="1.5" stroke-linecap="round" stroke="#339933" />
                                    <path d="M12.2399 3.75781L10.8257 5.17203" stroke-width="1.5" stroke-linecap="round" stroke="#339933" />
                                    <path d="M5.16958 10.8281L3.75537 12.2423" stroke-width="1.5" stroke-linecap="round" stroke="#339933" />
                                    <path d="M12.2399 12.2423L10.8257 10.8281" stroke-width="1.5" stroke-linecap="round" stroke="#339933" />
                                    <path d="M5.16958 5.17203L3.75537 3.75781" stroke-width="1.5" stroke-linecap="round" stroke="#339933" />
                                </svg>
                                Verification pending
                            </span>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 8.00033L7.33333 9.33366L10 6.66699" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="#54AA54" />
                                <path d="M9.5963 2.00023L9.43223 1.86044C8.60703 1.1572 7.3933 1.1572 6.56809 1.86044L6.40406 2.00023C5.97695 2.3642 5.44591 2.58417 4.88654 2.62881L4.6717 2.64595C3.59092 2.7322 2.73268 3.59043 2.64644 4.67122L2.6293 4.88605C2.58466 5.44542 2.36469 5.97646 2.00072 6.40357L1.86093 6.5676C1.15768 7.39281 1.15768 8.60654 1.86093 9.43174L2.00072 9.59581C2.36469 10.0229 2.58466 10.5539 2.6293 11.1133L2.64644 11.3281C2.73268 12.4089 3.59092 13.2671 4.6717 13.3534L4.88654 13.3705C5.44591 13.4152 5.97695 13.6351 6.40406 13.9991L6.56808 14.1389C7.3933 14.8421 8.60703 14.8421 9.43223 14.1389L9.5963 13.9991C10.0234 13.6351 10.5544 13.4152 11.1138 13.3705L11.3286 13.3534C12.4094 13.2671 13.2676 12.4089 13.3539 11.3281L13.371 11.1133C13.4157 10.5539 13.6356 10.0229 13.9996 9.59581L14.1394 9.43174C14.8426 8.60654 14.8426 7.39281 14.1394 6.5676L13.9996 6.40357C13.6356 6.0229 13.4157 5.44542 13.371 4.88605L13.3539 4.67122C13.2676 3.59043 12.4094 3.2671 11.3286 2.64595L11.1138 2.62881C10.5544 2.58417 10.0234 2.3642 9.5963 2.00023Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="#54AA54" />
                            </svg>
                        )}
                    </p>
                </section>
                }
                <hr className='h-[1px] w-full bg-[#141414] border-none' />

                {/* Sidebar Container */}
                <section className="w-full mx-auto flex flex-col gap-2 relative text-[16px]">
                    {sidebarNav.map((item) =>
                        <Link href={item.link} key={item.name} onClick={() => setOpenSideBar(false)} className={pathname === item.link ? 'text-[#FF6201] font-bold bg-[#FF62011A] p-[12px] rounded-lg flex items-center gap-2' : 'text-gray-400 p-[12px] rounded-lg hover:bg-[#FF62011A]/10 flex items-center gap-2'}>{item.icon} {item.name}</Link>)
                    }
                    {userInfo?.role === "superadmin" && (
                        <Link href="/admin/settings" className={pathname === "/admin/settings" ? 'text-[#FF6201] font-bold bg-[#FF62011A] p-[12px] rounded-lg flex items-center gap-2' : 'text-gray-400 p-[12px] rounded-lg hover:bg-[#FF62011A]/10 flex items-center gap-2'}>
                            <AdminPanelSettingsIcon /> Settings
                        </Link>
                    )}
                </section>

                {/* logout button  */}
                {currentUser && <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] mx-auto p-3 border-t border-[#141414] z-20">
                    <button
                        className="w-fit flex items-center justify-center gap-2"
                        onClick={() => { handleSignOut(router), setOpenSideBar(false) }}
                    >
                        <span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.3334 5.3603C10.3059 4.58648 10.2145 4.10301 9.90975 3.72447C9.47435 3.18358 8.7297 3.01376 7.24046 2.67415L7.24041 2.67414L6.57285 2.52191C4.31001 2.00588 3.17859 1.74787 2.42267 2.34211C1.66675 2.93636 1.66675 4.0838 1.66675 6.37869V9.62133C1.66675 11.9162 1.66675 13.0637 2.42267 13.6579C3.17859 14.2521 4.31001 13.9941 6.57285 13.4781L7.24041 13.3259C8.72968 12.9863 9.47435 12.8164 9.90975 12.2755C10.2145 11.897 10.3059 11.4135 10.3334 10.6397" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
                                <path d="M12.3334 6.00781C12.3334 6.00781 14.3334 7.4808 14.3334 8.0078C14.3334 8.53487 12.3334 10.0078 12.3334 10.0078M14.0001 8.0078H5.66675" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
                            </svg>

                        </span>
                        Logout
                    </button>
                </div>}

            </div>
        </main>
    )
}

export default Sidebar