import React from 'react';
import SlotCard from './SlotCard';
import lang from '../../locales/fr.json';

export default function PageLayout({ slots, isLoading, error }) {
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center py-12 w-full">
                    <div className="w-8 h-8 border-4 border-daisy-cream border-t-daisy-purple rounded-full animate-spin mb-4"></div>
                    <p className="text-daisy-purple font-medium animate-pulse">{lang.loading}</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="p-4 bg-red-50 text-daisy-coral rounded-2xl border border-red-100 text-sm w-full max-w-md mx-auto">
                    <p className="font-bold mb-1">Error</p>
                    <p>{error}</p>
                </div>
            );
        }

        if (slots.length === 0) {
            return (
                <div className="text-center py-12 w-full">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                        <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <p className="text-gray-500 font-medium">{lang.empty}</p>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {slots.map(slot => (
                    <SlotCard key={slot.id} slot={slot} />
                ))}
            </div>
        );
    };

    return (
        <div className="flex-1 w-full max-w-6xl mx-auto px-6 pb-16 pt-4">
            <div className="flex items-center justify-between mb-8 border-b border-gray-200/60 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-daisy-purple mb-1">{lang.pageTitle}</h1>
                    <p className="text-gray-500 text-sm">{lang.manageBookings}</p>
                </div>
                <button className="bg-daisy-coral text-white px-5 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity shadow-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    {lang.newWorkshop}
                </button>
            </div>

            {renderContent()}
        </div>
    );
}
