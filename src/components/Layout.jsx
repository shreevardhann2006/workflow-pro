import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children, currentView, onNavigate }) => {
    return (
        <div className="min-h-screen bg-[#0f111a] text-white font-sans">
            <Sidebar currentView={currentView} onNavigate={onNavigate} />
            <div className="ml-64 flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
