import React from "react";

type Team = {
    name: string;
};

type Props = {
    teams: Team[];
};

function TeamsTable({ teams }: Props) {
    return (
        <div className="bg-[#1F2933] p-5 rounded-2xl border border-gray-800">
            <h3 className="mb-4 font-semibold">Teams</h3>

            <ul className="flex flex-col gap-2 text-sm text-gray-300">
                {teams.map((team, index) => (
                    <li
                        key={index}
                        className="border-b border-gray-800 pb-2"
                    >
                        {team.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TeamsTable;