import React from "react";
import Button from "./Button";
import { handleSignOut } from "@/utils/logics/userinfo";
import { useRouter } from "next/navigation";

interface setDeleteAccountProps {
  setDeleteAccount: React.Dispatch<React.SetStateAction<boolean>>;
}
function DeleteAccount({ setDeleteAccount }: setDeleteAccountProps) {
  const router = useRouter();

  return (
    <div className="z-50 fixed top-0 left-0 w-full h-screen bg-[#0B0B0B]/60 backdrop-blur-xs flex items-center justify-center">
      <section className="bg-[#141414] max-h-[242px] h-full border border-[#18191B] w-[90%] mx-auto pb-[12px] pt-[20px] rounded-xl flex flex-col items-center justify-between text-center">
        <div className="flex items-end justify-end w-full pr-4">
          <span onClick={() => setDeleteAccount(false)}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.75 0.75L6.75 6.75M6.75 6.75L0.75 12.75M6.75 6.75L12.75 12.75M6.75 6.75L0.75 0.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
            </svg>
          </span>
        </div>
        <span>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="#434343" />
            <path
              d="M26.8516 24.3743L27.5 14H12.5L13.1484 24.3743C13.315 27.0401 13.3983 28.373 14.2643 29.1865C15.1302 30 16.4657 30 19.1367 30H20.8633C23.5343 30 24.8698 30 25.7357 29.1865C26.6017 28.373 26.685 27.0401 26.8516 24.3743Z"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke="white"
            />
            <path
              d="M24 14H29M24 14L23.3778 12.3408L23.3776 12.3402C23.0006 11.335 22.8121 10.8324 22.4402 10.5029C22.3213 10.3976 22.1904 10.3069 22.0501 10.2326C21.6109 10 21.074 10 20 10C18.926 10 18.3891 10 17.9499 10.2326C17.8096 10.3069 17.6787 10.3976 17.5598 10.5029C17.1878 10.8324 16.9993 11.3352 16.6222 12.3408L16 14M24 14H16M16 14H11"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke="white"
            />
            <path d="M17.5 19V25M22.5 19V25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
          </svg>
        </span>
        <div className="flex flex-col gap-[4px]">
          <p className="text-white text-[14px]">Delete account?</p>
          <span className="text-[var(--muted)] text-[12px]">
            Deleting account will lead to loss of account and <br /> cannot be recovered
          </span>
        </div>
        <Button type="button" variant="primary" onClick={() => handleSignOut(router)} className="!w-[90%] !bg-[#B00020] mx-auto py-3 flex items-center justify-center gap-2">
          Delete
        </Button>
      </section>
    </div>
  );
}

export default DeleteAccount;
