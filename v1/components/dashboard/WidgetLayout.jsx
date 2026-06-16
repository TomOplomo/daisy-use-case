import React from 'react';
import SlotCard from './SlotCard';
import lang from '../../locales/fr.json';

export default function WidgetLayout({ slots, isLoading, error }) {
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
            <div className="flex flex-col gap-4">
                {slots.map(slot => (
                    <SlotCard key={slot.id} slot={slot} />
                ))}
            </div>
        );
    };

    return (
        <div className="flex-1 flex items-start justify-center pt-4 pb-16 px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col border border-gray-100">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
                    <h1 className="text-xl font-bold text-daisy-purple">{lang.pageTitle}</h1>
                    <button className="text-gray-400 hover:text-daisy-coral transition-colors" aria-label="Close widget">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 max-h-[60vh] overflow-y-auto bg-gray-50/50">
                    {renderContent()}
                </div>

                <div className="px-6 py-4 bg-white border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-400 font-medium flex items-center justify-center gap-1">
                        {lang.poweredBy} <span className="text-daisy-purple font-bold text-sm tracking-tight">{lang.brandName}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
