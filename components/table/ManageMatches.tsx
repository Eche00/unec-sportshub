"use client";

import useMatchesInfo from "@/utils/logics/usematchesinfo";
import FootballManager from "../categories/FootballManager";
import BasketballManager from "../categories/BasketballManager";
import VolleyballManager from "../categories/VolleyballManager";
import TennisManager from "../categories/TennisManager";
import ChessManager from "../categories/ChessManager";
import Loader from "../ui/Loader";
import Empty from "../ui/Empty";

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

                {loading
                    ? <Loader />
                    : <Empty />}
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