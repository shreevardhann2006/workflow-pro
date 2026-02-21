import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children, currentView, onNavigate }) => {
    // Check if we are missing Supabase variables
    const isMissingEnvVars = !import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('placeholder');

    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            {isMissingEnvVars && (
                <div className="bg-red-500/20 border-b border-red-500/50 text-red-200 px-6 py-4 flex flex-col items-center justify-center text-center z-50">
                    <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        CRITICAL ERROR: Missing Database Connection
                    </h3>
                    <p className="text-sm">
                        This application is currently running without connecting to the database. The <strong>VITE_SUPABASE_URL</strong> and <strong>VITE_SUPABASE_ANON_KEY</strong> environment variables are missing.
                    </p>
                    <p className="text-sm mt-2 font-semibold">
                        How to fix (Vercel): Go to your Vercel Project Settings &rarr; Environment Variables &rarr; Add both variables &rarr; <u>Redeploy your app</u>.
                    </p>
                </div>
            )}
            <div className="flex flex-1 relative overflow-hidden">
                <Sidebar currentView={currentView} onNavigate={onNavigate} className="flex-shrink-0" />
                <div className="flex-1 flex flex-col ml-64 min-w-0 h-full overflow-y-auto">
                    <Header />
                    <main className="flex-1 p-8">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Layout;
