import React from 'react';
import lang from '../../locales/fr.json';

export default function SlotCard({ slot }) {
    const isConfirmed = slot.status === 'confirmed';
    const isFull = slot.bookingsCount >= slot.capacity;
    const remainingSpots = slot.capacity - slot.bookingsCount;

    const cardStyle = isConfirmed
        ? "bg-daisy-purple text-daisy-cream"
        : "bg-white text-gray-800 border border-gray-200";

    return (
        <div className={`p-5 rounded-xl flex flex-col h-30 shadow-sm transition-shadow hover:shadow-md ${cardStyle}`}>

            <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg leading-snug line-clamp-2 pr-2" title={slot.workshopTitle}>
                    {slot.workshopTitle}
                </h3>
                <span className="text-sm font-medium opacity-80 whitespace-nowrap mt-1">
                    {slot.time}
                </span>
            </div>

            <div className="flex items-center justify-between mt-auto">
                <p className="text-sm font-medium">
                    {slot.bookingsCount} / {slot.capacity} <span className="opacity-80 font-normal">{lang.participants}</span>
                </p>

                {isConfirmed ? (
                    isFull ? (
                        <span className="bg-daisy-coral text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
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