import React from 'react';
import { Search, Bell } from 'lucide-react';
import Button from './Button';

const Header = () => {
    return (
        <header className="h-20 border-b border-[#2d3142] bg-[#0f111a]/80 backdrop-blur-md sticky top-0 z-20 px-8 flex items-center justify-between">
            <div className="flex items-center gap-4 w-96">
                <div className="relative w-full group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#6366f1] transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search tasks, projects..."
                        className="w-full bg-[#1e2130] border-none rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:ring-2 focus:ring-[#6366f1] transition-all placeholder-[#475569]"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2.5 rounded-xl hover:bg-[#1e2130] text-[#94a3b8] hover:text-white transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#ef4444] rounded-full border-2 border-[#0f111a]"></span>
                </button>
                <Button variant="primary" className="!py-2 !px-4 !text-sm">
                    + New Project
                </Button>
            </div>
        </header>
    );
};

export default Header;
