"use client";

import React, { useState } from "react";
import CreateTeamCta from "./CreateTeamCta";
import { useRouter } from "next/navigation";

interface Team {
  id: number;
  name: string;
  acronym: string;
  players: number;
  admin: string;
  image: string;
}

export const teams: Team[] = [
  { id: 1, name: "ENFORCERS", acronym: "ENFS", players: 22, admin: "Allfather", image: "" },
  { id: 2, name: "BORKUST", acronym: "BORK", players: 20, admin: "Mayor", image: "" },
  { id: 3, name: "CLEANERS", acronym: "CLEAN", players: 16, admin: "Kristen", image: "" },
  { id: 4, name: "TITANS", acronym: "TITN", players: 24, admin: "Spartan", image: "" },
  { id: 5, name: "WARRIORS", acronym: "WRRS", players: 18, admin: "Blaze", image: "" },
  { id: 6, name: "PHANTOMS", acronym: "PHNT", players: 21, admin: "Shadow", image: "" },
  { id: 7, name: "LEGENDS", acronym: "LGND", players: 19, admin: "Phoenix", image: "" },
];
function page() {
  const router = useRouter();
  const [showTeam, setShowTeam] = useState<boolean>(true);

  return (
    <main className="relative min-h-screen text-white">
      {/* cta  */}
      <section className=" max-w-[90%] mx-auto flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-[var(--muted)] text-[14px] uppercase">Team Mates</p>
          <span onClick={() => setShowTeam(!showTeam)} className={`${showTeam ? "rotate-0" : "rotate-180"}`}>
            <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.49997 4C7.49997 4 4.92228 0.500006 3.99997 0.5C3.07766 0.499994 0.5 4 0.5 4" stroke-linecap="round" stroke-linejoin="round" stroke="#B5B5B5" />
            </svg>
          </span>
        </div>
        {showTeam && <CreateTeamCta />}
      </section>

      {/* all teams  */}
      <section className=" max-w-[90%] mx-auto flex flex-col gap-5">
        <div className="sticky top-[60px] bg-[var(--background)] flex items-center justify-between py-5">
          <p className="text-[var(--muted)] text-[14px] uppercase">All Teams</p>
          <span className="flex items-center gap-[8px] text-[12px] text-[var(--muted)]" onClick={() => router.push("/teams/all")}>
            See more
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7915 7H2.9165" stroke-linecap="round" stroke-linejoin="round" stroke="#B5B5B5" />
              <path d="M7.5835 10.5C7.5835 10.5 11.0835 7.92231 11.0835 7C11.0835 6.07763 7.5835 3.5 7.5835 3.5" stroke-linecap="round" stroke-linejoin="round" stroke="#B5B5B5" />
            </svg>
          </span>
        </div>
        <div className="flex flex-col gap-[8px] w-full ">
          {teams.map((team) => (
            <div onClick={() => router.push(`/teams/${team.name}`)} key={team.id} className="p-[12px] border-b border-[#18191B] flex items-center gap-[16px]">
              <img src={team.image || "/logo.png"} alt="" className="w-[24px] h-[24px] object-cover rounded-full" />
              <p className="text-white text-[14px] flex flex-col gap-[2px]">
                {team.name}
                <span className="text-[var(--muted)] text-[12px] ">{team.acronym}</span>
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default page;
