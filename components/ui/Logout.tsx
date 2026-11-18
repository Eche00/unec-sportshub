import React from "react";
import Button from "./Button";
import { handleSignOut } from "@/utils/logics/userinfo";
import { useRouter } from "next/navigation";

interface LogOutProps {
  setLogOut: React.Dispatch<React.SetStateAction<boolean>>;
}
function Logout({ setLogOut }: LogOutProps) {
  const router = useRouter();

  return (
    <div className="z-50 fixed top-0 left-0 w-full h-screen bg-[#0B0B0B]/60 backdrop-blur-xs flex items-center justify-center">
      <section className="bg-[#141414] max-h-[242px] h-full border border-[#18191B] w-[90%] mx-auto pb-[12px] pt-[20px] rounded-xl flex flex-col items-center justify-between text-center">
        <div className="flex items-end justify-end w-full pr-4">
          <span onClick={() => setLogOut(false)}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.75 0.75L6.75 6.75M6.75 6.75L0.75 12.75M6.75 6.75L12.75 12.75M6.75 6.75L0.75 0.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
            </svg>
          </span>
        </div>
        <span>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="#434343" />
            <path
              d="M23.5 16.0404C23.4588 14.8797 23.3216 14.1545 22.8645 13.5867C22.2114 12.7754 21.0944 12.5206 18.8606 12.0112L18.8605 12.0112L17.8591 11.7829C14.4649 11.0088 12.7678 10.6218 11.6339 11.5132C10.5 12.4045 10.5 14.1257 10.5 17.568V22.432C10.5 25.8743 10.5 27.5955 11.6339 28.4868C12.7678 29.3782 14.4649 28.9912 17.8591 28.2171L18.8605 27.9888C21.0944 27.4794 22.2114 27.2246 22.8645 26.4133C23.3216 25.8455 23.4588 25.1203 23.5 23.9595"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke="#E8E8E8"
            />
            <path d="M26.5 17.0117C26.5 17.0117 29.5 19.2212 29.5 20.0117C29.5 20.8023 26.5 23.0117 26.5 23.0117M29 20.0117H16.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
          </svg>
        </span>
        <div className="flex flex-col gap-[4px]">
          <p className="text-white text-[14px]">Log out?</p>
          <span className="text-[var(--muted)] text-[12px]">Are you sure you want to log out</span>
        </div>
        <Button type="button" variant="primary" onClick={() => handleSignOut(router)} className="!w-[90%] mx-auto py-3 flex items-center justify-center gap-2">
          Log out
        </Button>
      </section>
    </div>
  );
}

export default Logout;
