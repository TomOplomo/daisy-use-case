import React from 'react';
import lang from '../locales/fr.json';

export default function SlotCard({ slot }) {
    const isConfirmed = slot.status === 'confirmed';
    const isFull = slot.bookingsCount >= slot.capacity;
    const remainingSpots = slot.capacity - slot.bookingsCount;

    const cardStyle = isConfirmed
        ? "bg-daisy-purple text-daisy-cream"
        : "bg-white text-gray-800 border border-gray-200";

    return (
        <div className={`p-4 rounded-lg flex flex-col gap-2 shadow-sm ${cardStyle}`}>
            <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg leading-tight">{slot.workshopTitle}</h3>
                <span className="text-sm opacity-80 whitespace-nowrap ml-2">{slot.time}</span>
            </div>

            <div className="flex items-center justify-between mt-2">
                <p className="text-sm">
                    {slot.bookingsCount} / {slot.capacity} {lang.participants}
                </p>

                {isConfirmed ? (
                    isFull ? (
                        <span className="bg-daisy-coral text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            {lang.fullBadge}
                        </span>
                    ) : (
                        <span className="text-sm opacity-90 font-medium">
                            {remainingSpots} {lang.spotsLeft}
                        </span>
                    )
                ) : (
                    <span className="text-sm text-gray-400 italic">
                        {lang.pending}
                    </span>
                )}
            </div>
        </div>
    );
}
