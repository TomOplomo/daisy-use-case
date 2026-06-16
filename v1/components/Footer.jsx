import React from 'react';
import lang from '../locales/fr.json';

export default function Footer() {
    return (
        <footer className="bg-daisy-cream pt-8 pb-8 px-6 md:px-12 border-t border-gray-200/60 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

                <div className="text-xl font-bold text-daisy-purple tracking-tighter">
                    {lang.brandName}
                </div>

                <div className="text-xs text-gray-500 font-medium text-center">
                    {lang.footerCopyright}
                </div>

                <div className="flex gap-6 text-xs text-gray-500 font-medium">
                    <span className="cursor-pointer hover:text-gray-800 transition-colors">{lang.footerTerms}</span>
                    <span className="cursor-pointer hover:text-gray-800 transition-colors">{lang.footerPrivacy}</span>
                </div>

            </div>
        </footer>
    );
}
