import React, { useState, useEffect } from 'react';
import WidgetLayout from '../components/dashboard/WidgetLayout';
import PageLayout from '../components/dashboard/PageLayout';
import lang from '../locales/fr.json';

export default function Dashboard() {
    const [slots, setSlots] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isWidgetMode, setIsWidgetMode] = useState(false);

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

    return (
        <div className="flex-1 flex flex-col w-full">

            <div className="w-full flex justify-center py-6 bg-transparent">
                <div className="bg-gray-200/60 p-1 rounded-xl flex gap-1 shadow-inner">
                    <button onClick={() => setIsWidgetMode(false)} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${!isWidgetMode ? 'bg-white shadow-sm text-daisy-purple' : 'text-gray-500 hover:text-gray-700'}`}>
                        Page View
                    </button>
                    <button onClick={() => setIsWidgetMode(true)} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${isWidgetMode ? 'bg-white shadow-sm text-daisy-purple' : 'text-gray-500 hover:text-gray-700'}`} >
                        Widget View
                    </button>
                </div>
            </div>

            {isWidgetMode ? (
                <WidgetLayout slots={slots} isLoading={isLoading} error={error} />
            ) : (
                <PageLayout slots={slots} isLoading={isLoading} error={error} />
            )}

        </div>
    );
}
