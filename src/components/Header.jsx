import React, { useState, useEffect } from 'react';
import { Search, Bell, Sun, Moon } from 'lucide-react';
import Button from './Button';
import { useData } from '../context/DataContext';

const Header = () => {
    const { openModal } = useData();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <header className="h-20 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-20 px-8 flex items-center justify-between">
            <div className="flex items-center gap-4 w-96">
                <div className="relative w-full group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-[#6366f1] transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search tasks, projects..."
                        className="w-full bg-card border-none rounded-xl py-2.5 pl-10 pr-4 text-sm text-foreground focus:ring-2 focus:ring-[#6366f1] transition-all placeholder-[#475569]"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={toggleTheme}
                    className="relative p-2.5 rounded-xl hover:bg-card text-muted hover:text-foreground transition-colors"
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button
                    onClick={() => openModal('notification')}
                    className="relative p-2.5 rounded-xl hover:bg-card text-muted hover:text-foreground transition-colors"
                >
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#ef4444] rounded-full border-2 border-[#0f111a]"></span>
                </button>
                <Button variant="primary" className="!py-2 !px-4 !text-sm" onClick={() => openModal('project')}>
                    + New Project
                </Button>
            </div>
        </header>
    );
};

export default Header;
