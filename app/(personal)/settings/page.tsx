"use client";

import { useColorTheme } from "@/components/providers/color-theme-provider";
import DeleteAccount from "@/components/ui/DeleteAccount";
import Loader from "@/components/ui/Loader";
import Logout from "@/components/ui/Logout";
import { usePlayerProfile, useUserInfo } from "@/utils/logics/userinfo";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function page() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const { userInfo, isLoading: userLoading } = useUserInfo();
  const { player, isLoading: playerLoading } = usePlayerProfile(userInfo?.userName || "");
  const { colorTheme, setColorTheme } = useColorTheme();
  const [logOut, setLogOut] = useState<boolean>(false);
  const [deleteAccount, setDeleteAccount] = useState<boolean>(false);
  const themes = [
    { name: "Orange", value: "orange", color: "#ea580c" },
    { name: "Blue", value: "blue", color: "#2563eb" },
    { name: "Red", value: "red", color: "#b91c1c" },
    { name: "Green", value: "green", color: "#16a34a" },
    { name: "Purple", value: "purple", color: "#7e22ce" },
  ] as const;

  const handleBack = () => {
    if (step <= 0) router.push("/profile");
    else setStep(step - 1);
  };

  if (userLoading || (userInfo?.userName && playerLoading)) return <Loader />;
  if (!userInfo) return <div>Profile not found.</div>;

  return (
    <div className="py-6 flex flex-col gap-6">
      {/* header */}
      <div className="text-center relative">
        <button onClick={handleBack} className="absolute -top-1 left-2 z-30 flex items-center justify-center w-11 h-11 rounded-full cursor-pointer touch-manipulation">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 12.002H19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
            <path d="M10.9999 18.002C10.9999 18.002 5.00001 13.583 5 12.0019C4.99999 10.4208 11 6.00195 11 6.00195" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
          </svg>
        </button>

        <h2 className="text-[20px] font-medium tracking-tight text-[var(--foreground)]">
          {step === 0 && "Settings"}
          {step === 1 && "Academic"}
          {step === 2 && "Sports"}
        </h2>
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="absolute -top-1 right-2 z-30 flex items-center justify-center w-11 h-11 rounded-full cursor-pointer touch-manipulation">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
            </svg>
          </button>
        )}
      </div>

      <section className="w-[90%] mx-auto flex flex-col gap-6">
        {/* profile  */}
        <div className="p-[12px] bg-[#141414] border border-[#18191B] rounded-xl flex items-center justify-between">
          <div className=" flex items-center  gap-[12px]">
            <img src={userInfo?.profileImage || (userInfo?.gender === "male" ? "/male.png" : "/female.png")} alt="" className="w-[36px] h-[36px] object-cover rounded-full" />
            <p className="text-white text-[12px] flex flex-col">
              {userInfo?.fullName}
              <span className="text-[var(--muted)] text-[10px] ">{player?.position}</span>
            </p>
          </div>
          <div onClick={() => setStep(step + 1)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.44771 13.2189L13.219 5.44771C13.5824 5.08421 13.7642 4.90247 13.8614 4.7064C14.0462 4.33337 14.0462 3.8954 13.8614 3.52236C13.7642 3.3263 13.5824 3.14455 13.219 2.78105C12.8554 2.41755 12.6737 2.2358 12.4776 2.13864C12.1046 1.95379 11.6666 1.95379 11.2936 2.13864C11.0975 2.2358 10.9158 2.41755 10.5523 2.78105L2.78105 10.5523C2.39567 10.9376 2.20299 11.1303 2.10149 11.3753C2 11.6203 2 11.8929 2 12.4379V13.9999H3.56209C4.1071 13.9999 4.3796 13.9999 4.62463 13.8985C4.86965 13.797 5.06234 13.6043 5.44771 13.2189Z"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke="#6B6B6B"
              />
              <path d="M8 14H12" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="#6B6B6B" />
              <path d="M9.66699 3.66602L12.3337 6.33268" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="#6B6B6B" />
            </svg>
          </div>
        </div>

        {/* other settings  */}
        <div className="p-[12px] bg-[#141414] border border-[#18191B] rounded-xl flex flex-col items-center justify-between">
          {/* 1 */}
          <div className="w-full p-[12px] border-b border-[#18191B]  flex items-center justify-between ">
            <div className=" flex items-center  gap-[12px]">
              <span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.3337 12C10.3337 13.2887 9.28899 14.3333 8.00033 14.3333C6.71166 14.3333 5.66699 13.2887 5.66699 12" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="#E8E8E8" />
                  <path
                    d="M12.8207 11.9993H3.17925C2.52797 11.9993 2 11.4713 2 10.8201C2 10.5073 2.12424 10.2074 2.34539 9.98622L2.74755 9.58408C3.12262 9.20902 3.33333 8.70028 3.33333 8.16988V6.33268C3.33333 3.75536 5.42267 1.66602 8 1.66602C10.5773 1.66602 12.6667 3.75535 12.6667 6.33268V8.16988C12.6667 8.70028 12.8774 9.20902 13.2525 9.58408L13.6546 9.98622C13.8757 10.2074 14 10.5073 14 10.8201C14 11.4713 13.472 11.9993 12.8207 11.9993Z"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="#E8E8E8"
                  />
                </svg>
              </span>
              <p>Push notifications</p>
            </div>
            <span>
              <input type="radio" name="" id="" />
            </span>
          </div>

          {/* 2 */}
          <div className="w-full p-[12px] border-b border-[#18191B]  flex items-center justify-between ">
            <div className=" flex items-center  gap-[12px]">
              <span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.66667 10.9995L12.144 11.7446C13.0689 12.0277 13.7561 12.7696 13.9842 13.6727C14.0743 14.0299 13.7659 14.3328 13.3957 14.3328H2.60426C2.23405 14.3328 1.92563 14.0299 2.01583 13.6727C2.24395 12.7696 2.93106 12.0277 3.85601 11.7446L6.33333 10.9995V9.7076C5.14611 8.7784 4.33333 7.666 4.33333 5.27722C4.33333 2.88399 5.63649 1.66602 7.66153 1.66602C9.09553 1.66602 9.69233 2.33268 9.69233 2.33268C11.3846 2.33268 11.6667 3.73081 11.6667 5.27722C11.6667 7.666 10.8539 8.7784 9.66667 9.7076V10.9995Z"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                    stroke="#E8E8E8"
                  />
                </svg>
              </span>
              <p>Player discoverability </p>
            </div>
            <span>
              <svg width="46" height="24" viewBox="0 0 46 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="46" height="24" rx="12" fill="#FF6201" />
                <rect x="24" y="2" width="20" height="20" rx="10" fill="white" />
              </svg>
            </span>
          </div>

          {/* 3 */}
          <div className="w-full p-[12px] border-b border-[#18191B]  flex items-center justify-between ">
            <div className=" flex items-center  gap-[12px]">
              <span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.66699 4.99935C5.66699 4.32434 6.26395 3.66602 7.00033 3.66602C7.73673 3.66602 8.33366 4.21322 8.33366 4.88824C8.33366 5.13156 8.25613 5.35826 8.12239 5.54872C7.72393 6.11637 7.00033 6.65767 7.00033 7.33268"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke="#E8E8E8"
                  />
                  <path d="M7 9H7.006" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="#E8E8E8" />
                  <path
                    d="M5.33301 13C6.03326 13.5798 6.87601 13.9492 7.84201 14.0125C8.60314 14.0625 9.39774 14.0624 10.1573 14.0125C10.4189 13.9954 10.704 13.9338 10.9495 13.834C11.2227 13.723 11.3593 13.6675 11.4288 13.6759C11.4982 13.6843 11.5988 13.7575 11.7999 13.9039L11.8004 13.9042C12.1556 14.1627 12.6031 14.3483 13.2667 14.3324C13.6022 14.3243 13.77 14.3203 13.8451 14.1939C13.9202 14.0675 13.8267 13.8926 13.6395 13.5427C13.3801 13.0575 13.2157 12.5019 13.4648 12.0568C13.8939 11.421 14.2583 10.6681 14.3115 9.85487C14.3401 9.41793 14.3401 8.9654 14.3115 8.52847C14.2761 7.9866 14.1445 7.47153 13.9338 7"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="#E8E8E8"
                  />
                  <path
                    d="M8.15799 11.3452C10.3889 11.1989 12.166 9.42035 12.3122 7.18755C12.3408 6.75062 12.3408 6.29808 12.3122 5.86114C12.166 3.62832 10.3889 1.84977 8.15799 1.70342C7.39686 1.6535 6.60223 1.6536 5.84267 1.70342C3.61173 1.84977 1.83468 3.62832 1.68845 5.86114C1.65984 6.29808 1.65984 6.75062 1.68845 7.18755C1.74171 8.00075 2.10616 8.75368 2.53521 9.38948C2.78433 9.83462 2.61992 10.3901 2.36044 10.8754C2.17335 11.2253 2.0798 11.4002 2.15491 11.5266C2.23002 11.6529 2.3978 11.657 2.73335 11.6651C3.39695 11.681 3.84443 11.4953 4.19962 11.2369C4.40107 11.0903 4.5018 11.0169 4.57123 11.0085C4.64065 11.0001 4.77727 11.0557 5.05047 11.1667C5.29601 11.2665 5.58111 11.3281 5.84267 11.3452C6.60223 11.3951 7.39686 11.3951 8.15799 11.3452Z"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                    stroke="#E8E8E8"
                  />
                </svg>
              </span>
              <p>Feedback</p>
            </div>
            <span>
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.750033 0.75C0.750033 0.75 4.75 3.69593 4.75 4.75C4.75 5.80413 0.75 8.75 0.75 8.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="#6B6B6B" />
              </svg>
            </span>
          </div>

          {/* 4 */}
          <div className="w-full p-[12px] border-b border-[#18191B]  flex items-center justify-between ">
            <div className=" flex items-center  gap-[12px]">
              <span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14.6663 7.4555C14.6663 10.7446 11.6815 13.5059 7.99967 13.5059C7.53514 13.5059 7.10407 13.3887 6.66634 13.3079C6.1429 13.9514 5.37008 14.4958 4.02639 14.5C3.61665 14.5012 3.41179 14.5019 3.31176 14.3608C3.21173 14.2198 3.2973 13.9781 3.46844 13.4948C3.69437 12.8566 3.71456 12.1627 3.16663 11.6593C2.03048 10.5712 1.33301 9.0451 1.33301 7.4555C1.33301 4.16637 4.31777 1.5 7.99967 1.5C11.6815 1.5 14.6663 4.16637 14.6663 7.4555Z"
                    stroke-width="1.5"
                    stroke-linecap="square"
                    stroke-linejoin="round"
                    stroke="#E8E8E8"
                  />
                  <path
                    d="M6.66699 5.99935C6.66699 5.26297 7.26393 4.66602 8.00033 4.66602C8.73673 4.66602 9.33366 5.26297 9.33366 5.99935C9.33366 6.38453 9.17033 6.73158 8.90913 6.97498C8.50513 7.35152 8.00033 7.83265 8.00033 8.16598M8.08366 10.166H8.00033M8.16699 10.166C8.16699 10.258 8.09239 10.3326 8.00033 10.3326C7.90826 10.3326 7.83366 10.258 7.83366 10.166C7.83366 10.074 7.90826 9.99932 8.00033 9.99932C8.09239 9.99932 8.16699 10.074 8.16699 10.166Z"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="#E8E8E8"
                  />
                </svg>
              </span>
              <p>FAQ</p>
            </div>
            <span>
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.750033 0.75C0.750033 0.75 4.75 3.69593 4.75 4.75C4.75 5.80413 0.75 8.75 0.75 8.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="#6B6B6B" />
              </svg>
            </span>
          </div>

          {/* 5 */}
          <div className="w-full p-[12px] border-b border-[#18191B]  flex items-center justify-between ">
            <div className=" flex items-center  gap-[12px]">
              <span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14.6663 8.00065C14.6663 4.31875 11.6815 1.33398 7.99967 1.33398C4.31777 1.33398 1.33301 4.31875 1.33301 8.00065C1.33301 11.6825 4.31777 14.6673 7.99967 14.6673C8.56081 14.6673 9.33301 14.7449 9.33301 14.0007C9.33301 13.5947 9.12181 13.2815 8.91207 12.9703C8.60514 12.515 8.30121 12.0642 8.66634 11.334C9.11081 10.4451 9.85154 10.4451 10.9873 10.4451C11.5553 10.4451 12.2219 10.4451 12.9997 10.334C14.4003 10.1339 14.6663 9.27292 14.6663 8.00065Z"
                    stroke-width="1.5"
                    stroke="#E8E8E8"
                  />
                  <path
                    d="M7.33301 5.66602C7.33301 6.2183 6.88529 6.66602 6.33301 6.66602C5.78072 6.66602 5.33301 6.2183 5.33301 5.66602C5.33301 5.11373 5.78072 4.66602 6.33301 4.66602C6.88529 4.66602 7.33301 5.11373 7.33301 5.66602Z"
                    stroke-width="1.5"
                    stroke="#E8E8E8"
                  />
                  <path d="M12 6.33398C12 6.88627 11.5523 7.33398 11 7.33398C10.4477 7.33398 10 6.88627 10 6.33398C10 5.7817 10.4477 5.33398 11 5.33398C11.5523 5.33398 12 5.7817 12 6.33398Z" stroke-width="1.5" stroke="#E8E8E8" />
                  <path
                    d="M4.75 10.0007H4.66667M4.83333 10.0007C4.83333 10.0927 4.75871 10.1673 4.66667 10.1673C4.57462 10.1673 4.5 10.0927 4.5 10.0007C4.5 9.90858 4.57462 9.83398 4.66667 9.83398C4.75871 9.83398 4.83333 9.90858 4.83333 10.0007Z"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="#E8E8E8"
                  />
                </svg>
              </span>
              <p>App theme</p>
            </div>
            <div className="flex items-center gap-[10px]">
              {themes.map((item) => (
                <input
                  key={item.value}
                  type="radio"
                  name="colorTheme"
                  title={item.name}
                  value={item.value}
                  checked={colorTheme === item.value}
                  onChange={() => setColorTheme(item.value)}
                  className="h-[18px] w-[18px] cursor-pointer"
                  style={{ accentColor: item.color }}
                />
              ))}
            </div>
          </div>

          {/* 6 */}
          <div className="w-full p-[12px] flex items-center justify-between ">
            <div className=" flex items-center  gap-[12px]">
              <span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.4725 2.33088C11.211 1.7032 9.66727 1.33398 8 1.33398C6.33273 1.33398 4.789 1.7032 3.52744 2.33088C2.90879 2.63869 2.59946 2.7926 2.29973 3.2765C2 3.76042 2 4.22897 2 5.16608V7.49205C2 11.281 5.02824 13.3876 6.782 14.2899C7.27113 14.5415 7.51567 14.6673 8 14.6673C8.48433 14.6673 8.72887 14.5415 9.21793 14.2899C10.9717 13.3876 14 11.281 14 7.49205V5.16608C14 4.22898 14 3.76042 13.7003 3.2765C13.4005 2.79259 13.0912 2.63869 12.4725 2.33088Z"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="#E8E8E8"
                  />
                  <path
                    d="M8.08301 7.33268H7.99967M8.16634 7.33268C8.16634 7.42475 8.09174 7.49935 7.99967 7.49935C7.90761 7.49935 7.83301 7.42475 7.83301 7.33268C7.83301 7.24062 7.90761 7.16602 7.99967 7.16602C8.09174 7.16602 8.16634 7.24062 8.16634 7.33268Z"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke="#E8E8E8"
                  />
                  <path
                    d="M10.75 7.33268H10.6667M10.8333 7.33268C10.8333 7.42475 10.7587 7.49935 10.6667 7.49935C10.5746 7.49935 10.5 7.42475 10.5 7.33268C10.5 7.24062 10.5746 7.16602 10.6667 7.16602C10.7587 7.16602 10.8333 7.24062 10.8333 7.33268Z"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke="#E8E8E8"
                  />
                  <path
                    d="M5.41699 7.33268H5.33366M5.50033 7.33268C5.50033 7.42475 5.42571 7.49935 5.33366 7.49935C5.24161 7.49935 5.16699 7.42475 5.16699 7.33268C5.16699 7.24062 5.24161 7.16602 5.33366 7.16602C5.42571 7.16602 5.50033 7.24062 5.50033 7.33268Z"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke="#E8E8E8"
                  />
                </svg>
              </span>
              <p className=" text-[14px] text-[var(--muted)]">Privacy policy</p>
            </div>
            <span>
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.750033 0.75C0.750033 0.75 4.75 3.69593 4.75 4.75C4.75 5.80413 0.75 8.75 0.75 8.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="#6B6B6B" />
              </svg>
            </span>
          </div>
        </div>
        {/* account settings  */}
        <div className="p-[12px] bg-[#141414] border border-[#18191B] rounded-xl flex flex-col items-center justify-between">
          {/* 1 */}
          <div className="w-full p-[12px] border-b border-[#18191B]  flex items-center justify-between " onClick={() => setLogOut(true)}>
            <div className=" flex items-center  gap-[12px]">
              <span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.3337 5.3603C10.3062 4.58648 10.2147 4.10301 9.90999 3.72447C9.4746 3.18358 8.72994 3.01376 7.2407 2.67415L7.24066 2.67414L6.57309 2.52191C4.31026 2.00588 3.17884 1.74787 2.42291 2.34211C1.66699 2.93636 1.66699 4.0838 1.66699 6.37869V9.62133C1.66699 11.9162 1.66699 13.0637 2.42291 13.6579C3.17884 14.2521 4.31026 13.9941 6.57309 13.4781L7.24066 13.3259C8.72993 12.9863 9.47459 12.8164 9.90999 12.2755C10.2147 11.897 10.3062 11.4135 10.3337 10.6397"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="#E8E8E8"
                  />
                  <path d="M12.3337 6.00781C12.3337 6.00781 14.3337 7.4808 14.3337 8.0078C14.3337 8.53487 12.3337 10.0078 12.3337 10.0078M14.0003 8.0078H5.66699" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="#E8E8E8" />
                </svg>
              </span>
              <p>Log out</p>
            </div>
            <span>
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.750033 0.75C0.750033 0.75 4.75 3.69593 4.75 4.75C4.75 5.80413 0.75 8.75 0.75 8.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="#6B6B6B" />
              </svg>
            </span>
          </div>

          {/* delete */}
          <div className="w-full p-[12px] flex items-center justify-between " onClick={() => setDeleteAccount(true)}>
            <div className=" flex items-center  gap-[12px]">
              <span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.5677 10.9162L13 4H3L3.43226 10.9162C3.54333 12.6934 3.59887 13.582 4.17617 14.1243C4.75347 14.6667 5.64381 14.6667 7.42447 14.6667H8.57553C10.3562 14.6667 11.2465 14.6667 11.8238 14.1243C12.4011 13.582 12.4567 12.6934 12.5677 10.9162Z"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="#B00020"
                  />
                  <path
                    d="M10.6667 4.00065H14M10.6667 4.00065L10.2519 2.89453L10.2517 2.89413C10.0004 2.22401 9.87475 1.88891 9.6268 1.66926C9.54753 1.59908 9.46027 1.53858 9.36673 1.48905C9.07393 1.33398 8.716 1.33398 8 1.33398C7.284 1.33398 6.92607 1.33398 6.63327 1.48905C6.53973 1.53858 6.45243 1.59908 6.37321 1.66926C6.12522 1.88895 5.99952 2.22414 5.74813 2.89453L5.33333 4.00065M10.6667 4.00065H5.33333M5.33333 4.00065H2"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="#B00020"
                  />
                  <path d="M6.33301 7.33398V11.334M9.66634 7.33398V11.334" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="#B00020" />
                </svg>
              </span>
              <p>Delete account</p>
            </div>
            <span>
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.750033 0.75C0.750033 0.75 4.75 3.69593 4.75 4.75C4.75 5.80413 0.75 8.75 0.75 8.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="#6B6B6B" />
              </svg>
            </span>
          </div>
        </div>
      </section>
      {logOut && <Logout setLogOut={setLogOut} />}
      {deleteAccount && <DeleteAccount setDeleteAccount={setDeleteAccount} />}
    </div>
  );
}

export default page;
