"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { teams } from "../page";

function page() {
  const router = useRouter();
  return (
    <section className="w-[90%] mx-auto pb-5">
      {/* search  */}
      <section className="sticky top-0  bg-[var(--background)] flex items-center gap-4 py-3">
        <span onClick={() => router.push("/teams")} className=" rotate-180">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.7915 7H2.9165" stroke-linecap="round" stroke-linejoin="round" stroke="#B5B5B5" />
            <path d="M7.5835 10.5C7.5835 10.5 11.0835 7.92231 11.0835 7C11.0835 6.07763 7.5835 3.5 7.5835 3.5" stroke-linecap="round" stroke-linejoin="round" stroke="#B5B5B5" />
          </svg>
        </span>
        <div className=" bg-[#141414] flex flex-1 items-center gap-2 px-[16px] h-[42px] rounded-[24px] ">
          <span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.3333 11.3333L13.9999 14" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="#8C8C8C" />
              <path
                d="M12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333Z"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke="#8C8C8C"
              />
            </svg>
          </span>
          <input
            value={""}
            // onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
            type="text"
            placeholder="Search for a team ...."
            className="bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none w-full"
          />
        </div>
      </section>
      {/* players  */}
      <div className="flex flex-col gap-[8px] w-full">
        {teams.map((team) => (
          <div onClick={() => router.push(`/teams/${team.name}`)} key={team.id} className="p-[12px] bg-[#141414] border border-[#18191B] rounded-xl flex items-start justify-between gap-[12px]">
            <div className=" flex flex-1 items-center  gap-[8px]">
              <img src={team?.image || "/logo.png"} alt="" className="w-[64px] h-[64px] object-cover rounded-full" />
              <div className=" flex flex-1 flex-col gap-[8px]">
                <p className="text-white text-[14px] flex flex-col">
                  {team.name}
                  <span className="text-[var(--muted)] text-[12px] ">{team.acronym}</span>
                </p>
                <hr className="w-full h-[1px] border-none bg-[#FFFFFF1A]" />
                <div className=" flex items-center gap-[24px]">
                  <p className=" text-[12px] text-[var(--muted)] flex items-center">
                    <span>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10.7913 11.9583C10.6553 10.2483 9.24095 8.89449 7.47129 8.78039L6.99967 8.75C6.8312 8.75443 6.67423 8.76038 6.52612 8.76738C4.77206 8.85051 3.34269 10.2652 3.20801 11.9583"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke="#8C8C8C"
                        />
                        <path
                          d="M8.89566 5.39583C8.89566 6.44286 8.04685 7.29167 6.99983 7.29167C5.9528 7.29167 5.104 6.44286 5.104 5.39583C5.104 4.34879 5.9528 3.5 6.99983 3.5C8.04685 3.5 8.89566 4.34879 8.89566 5.39583Z"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke="#8C8C8C"
                        />
                        <path
                          d="M3.20965 4.95866C3.021 4.66399 2.91162 4.31368 2.91162 3.93783C2.91162 2.89078 3.76041 2.04199 4.80745 2.04199C5.06759 2.04199 5.31549 2.09439 5.54118 2.1892"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke="#8C8C8C"
                        />
                        <path
                          d="M10.7895 4.95866C10.9782 4.66399 11.0876 4.31368 11.0876 3.93783C11.0876 2.89078 10.2387 2.04199 9.19172 2.04199C8.93162 2.04199 8.6837 2.09439 8.45801 2.1892"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke="#8C8C8C"
                        />
                        <path d="M12.8335 10.4994C12.7286 9.17982 11.6662 7.87467 10.4995 7.58301" stroke-linecap="round" stroke-linejoin="round" stroke="#8C8C8C" />
                        <path d="M1.16602 10.4994C1.27099 9.17982 2.33339 7.87467 3.50006 7.58301" stroke-linecap="round" stroke-linejoin="round" stroke="#8C8C8C" />
                      </svg>
                    </span>
                    {team.players}
                  </p>
                  {/* admin  */}
                  <p className=" text-[12px] text-[var(--muted)] text-[var(--muted)] flex items-center">
                    <span>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M9.33317 4.08333C9.33317 5.372 8.2885 6.41667 6.99984 6.41667C5.71117 6.41667 4.6665 5.372 4.6665 4.08333C4.6665 2.79467 5.71117 1.75 6.99984 1.75C8.2885 1.75 9.33317 2.79467 9.33317 4.08333Z"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke="#8C8C8C"
                        />
                        <path
                          d="M7.00016 8.16699C4.0835 8.16699 2.3335 9.62533 2.3335 11.0837C2.3335 11.728 2.85583 12.2503 3.50016 12.2503H10.5002C11.1445 12.2503 11.6668 11.728 11.6668 11.0837C11.6668 9.62533 9.91683 8.16699 7.00016 8.16699Z"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke="#8C8C8C"
                        />
                      </svg>
                    </span>
                    {team.admin}
                  </p>
                </div>
              </div>
            </div>
            <span className="w-[22px] h-[22px] rounded-full border border-[#FFFFFF1A]"></span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default page;
