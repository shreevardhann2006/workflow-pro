
import React from 'react';
import { LayoutDashboard, CheckSquare, Target, Users, BarChart3, Settings, Hexagon } from 'lucide-react';

const Sidebar = ({ currentView, onNavigate }) => {
    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard' },
        { icon: CheckSquare, label: 'Task Board' },
        { icon: Target, label: 'Goals & Targets' },
        { icon: Users, label: 'Team' },
        { icon: BarChart3, label: 'Reports' },
        { icon: Settings, label: 'Settings' },
    ];

    return (
        <aside className="w-64 bg-card border-r border-border h-screen fixed left-0 top-0 flex flex-col z-10 transition-all duration-300">
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-tr from-[#6366f1] to-[#a855f7] rounded-lg text-foreground shadow-lg shadow-[#6366f1]/30">
                    <Hexagon size={20} className="fill-white/20" />
                </div>
                <h1 className="text-xl font-bold tracking-tight text-foreground">WorkTracker</h1>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">
                {menuItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => onNavigate(item.label)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 group ${currentView === item.label
                            ? 'bg-[#6366f1] text-white shadow-lg shadow-[#6366f1]/20'
                            : 'text-muted hover:bg-[#2d3142] hover:text-foreground'
                            } `}
                    >
                        <item.icon size={20} className={currentView === item.label ? 'text-foreground' : 'text-[#6366f1] group-hover:text-foreground'} />
                        <span className="font-medium">{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="p-6 border-t border-border">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border transition-transform duration-300 hover:scale-[1.02] cursor-pointer active:scale-95">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366f1] to-[#a855f7] text-white font-bold flex items-center justify-center">S</div>
                    <div>
                        <p className="text-sm font-medium text-foreground">Sharvesh</p>
                        <p className="text-xs text-muted">Project Manager</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
