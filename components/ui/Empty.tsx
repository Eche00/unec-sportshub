import React from "react";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import StadiumIcon from "@mui/icons-material/Stadium";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

function Empty() {
    return (
        <div className="border border-gray-800 rounded-3xl p-12 text-center bg-gradient-to-b from-[#0B0F19] to-[#0F172A] shadow-xl relative overflow-hidden">

            {/* subtle glow effect */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.4),transparent_60%)]" />

            <div className="relative flex flex-col items-center justify-center">

                {/* ICON STACK */}
                <div className="flex items-center gap-3 mb-4">
                    <StadiumIcon sx={{ fontSize: 40 }} className="text-gray-400" />
                    <SportsSoccerIcon sx={{ fontSize: 55 }} className="text-green-400 animate-pulse" />
                    <EmojiEventsIcon sx={{ fontSize: 40 }} className="text-gray-400" />
                </div>

                {/* TITLE */}
                <h2 className="text-xl font-semibold text-gray-100">
                    No Matches Yet
                </h2>

                {/* SUBTEXT */}
                <p className="text-sm text-gray-400 mt-2 max-w-md">
                    The pitch is empty right now. Create your first match and start tracking live scores, events, and highlights in real time.
                </p>

                {/* SMALL STATUS DOT (PURE DECORATION) */}
                <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
                    <span className="h-2 w-2 rounded-full bg-gray-600 animate-pulse" />
                    Waiting for kickoff
                </div>
            </div>
        </div>
    );
}

export default Empty;