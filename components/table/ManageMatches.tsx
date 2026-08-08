"use client";

import React from "react";

import { motion } from "framer-motion";

import CloseIcon from "@mui/icons-material/Close";

import Button from "../ui/Button";
import Input from "../ui/Input";

import useMatchesInfo from "@/utils/logics/usematchesinfo";
import FootballManager from "../categories/FootballManager";
import BasketballManager from "../categories/BasketballManager";
import VolleyballManager from "../categories/VolleyballManager";
import TennisManager from "../categories/TennisManager";
import ChessManager from "../categories/ChessManager";

type ManageMatchesProps = {
    matchId: string;
    onClose: () => void;
};

export default function ManageMatches({
    matchId,
    onClose,
}: ManageMatchesProps) {

    const {
        loading,
        match,
    } = useMatchesInfo(
        onClose,
        matchId
    );

    if (!match) {

        return (
            <div className="fixed inset-0 bg-black/60 z-50 flex justify-end">

                <div className="bg-[#0F172A] sm:w-[650px] mt-16 w-full h-full flex items-center justify-center">

                    <p className="text-gray-400">

                        {loading
                            ? "Loading match..."
                            : "Match not found"}

                    </p>

                </div>

            </div>
        );
    }

    switch (match.category) {
        case "football":
            return <FootballManager matchId={matchId} onClose={onClose} />

        case "basketball":
            return <BasketballManager matchId={matchId} onClose={onClose} />

        case "volleyball":
            return <VolleyballManager />

        case "tennis":
            return <TennisManager />

        case "chess":
            return <ChessManager />
    }
    return;
}