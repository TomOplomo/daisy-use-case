import React, { useState, useEffect } from 'react';
import SlotCard from '../components/SlotCard';
import lang from '../locales/fr.json';

export default function Dashboard() {
    const [slots, setSlots] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch('/api/slots');

                if (!response.ok) {
                    throw new Error(lang.error);
                }

                const data = await response.json();
                setSlots(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-daisy-cream flex items-center justify-center p-4">
                <p className="text-daisy-purple font-medium animate-pulse">{lang.loading}</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-daisy-cream p-4 md:p-8">
                <div className="max-w-2xl mx-auto p-4 bg-red-50 text-daisy-coral rounded-lg border border-red-200">
                    <p className="font-bold mb-1">Error</p>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-daisy-cream p-4 md:p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-daisy-purple mb-6">{lang.pageTitle}</h1>

                {slots.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">{lang.empty}</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {slots.map(slot => (
                            <SlotCard key={slot.id} slot={slot} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
