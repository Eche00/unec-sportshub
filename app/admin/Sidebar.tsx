'use client';

// import { adminSidebar, adminSecondary } from '@/utils/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import HomeIcon from "@mui/icons-material/OtherHouses";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

// Sidebar type
type SideBarItem = {
    name: string;
    link: string;
    icon: React.ReactNode;
};


export const adminSidebar: SideBarItem[] = [
    {
        name: "Dashboard",
        link: "/admin",
        icon: <AdminPanelSettingsIcon />,
    },
    {
        name: "Tournaments",
        link: "/admin/Tournaments",
        icon: <EmojiEventsIcon />,
    },
    {
        name: "Matches",
        link: "/admin/Match",
        icon: <SportsSoccerIcon />,
    },
];

//  OPTIONAL EXTRA (future expansion)
export const adminSecondary: SideBarItem[] = [
    {
        name: "Home",
        link: "/",
        icon: <HomeIcon />,
    },
];
function Sidebar() {
    const pathname = usePathname()


    return (
        <div className="bg-[#020C17] text-white fixed top-0 left-0 w-67.5 h-screen flex flex-col  py-2 gap-10 z-10">
            {/* Sidebar Container */}
            <section className="w-[80%] mx-auto flex flex-col gap-2">
                {/* Logo Section  */}
                <div className="flex items-center relative pb-6">
                    <span className="flex items-center w-full rounded-lg px-4 text-2xl font-extrabold text-[#3B82F6] tracking-wide">
                        <Link href='/' className=' border-2 border-[#3B82F6] rounded-full p-2 mr-2 flex items-center justify-center'><img src="/logo.png" alt="" className=' w-8 h-8 object-cover' /></Link>
                        <p className="text-white md:flex hidden ">S.</p>Hub
                    </span>
                </div>

                {/* Link Section  */}
                {adminSidebar.map((item) =>
                    <Link href={item.link} key={item.name} className={pathname === item.link ? 'text-white font-bold bg-[#3B82F6] py-3 px-4 rounded-lg flex items-center gap-3' : 'text-gray-400 py-3 px-4 rounded-lg hover:bg-[#3B82F6]/10 flex items-center gap-3'}>{item.icon} {item.name}</Link>)
                }
                <hr className=' w-full h-[0.1px] bg-gray-600 border-none' />
                {adminSecondary.map((item) =>
                    <Link href={item.link} key={item.name} className={pathname === item.link ? 'text-white font-bold bg-[#3B82F6] py-3 px-4 rounded-lg flex items-center gap-3' : 'text-gray-400 py-3 px-4 rounded-lg hover:bg-[#3B82F6]/10 flex items-center gap-3'}>{item.icon} {item.name}</Link>)
                }


            </section>
        </div>
    )
}

export default Sidebar