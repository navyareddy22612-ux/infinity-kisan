import React, { useState } from 'react';
import Navbar from './Navbar';
import BottomNav from './BottomNav';

const Layout = ({ children }) => {
    const [lang, setLang] = useState('en');

    const toggleLang = () => {
        setLang(prev => prev === 'en' ? 'hi' : 'en');
    };

    return (
        <div className="layout">
            {/* Navbar for Desktop/Tablet */}
            <Navbar lang={lang} toggleLang={toggleLang} />

            {/* Main Content Area */}
            <main style={{ minHeight: '100vh', paddingBottom: '80px' }}>
                {children}
            </main>

            {/* Bottom Nav for Mobile */}
            <BottomNav />
        </div>
    );
};

export default Layout;
