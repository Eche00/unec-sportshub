import React from "react";

type Event = {
    minute: number;
    text: string;
};

type Props = {
    events: Event[];
};

function MatchEvents({ events }: Props) {
    return (
        <div className="bg-[#1F2933] p-5 rounded-2xl border border-gray-800">
            <h3 className="mb-4 font-semibold">Match Events</h3>

            <div className="flex flex-col gap-3">
                {events.length === 0 && (
                    <p className="text-gray-400 text-sm">
                        No events yet
                    </p>
                )}

                {events.map((event, index) => (
                    <div
                        key={index}
                        className="flex gap-3 text-sm text-gray-300"
                    >
                        <span className="text-[#3B82F6] font-semibold">
                            {event.minute}'
                        </span>
                        <span>{event.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MatchEvents;