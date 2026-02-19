import React from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { Target, Flag, CalendarCheck, TrendingUp } from 'lucide-react';

const Goals = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white">Goals & Targets</h2>
                    <p className="text-[#94a3b8]">Set and monitor team objectives.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="!p-4 bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20 border-indigo-500/20">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
                            <Target size={24} />
                        </div>
                        <Badge variant="primary">Q4 2023</Badge>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">Revenue Target</h3>
                    <p className="text-sm text-[#94a3b8] mb-4">Achieve $1.2M in recurring revenue</p>
                    <div className="w-full bg-[#1e2130] h-2 rounded-full overflow-hidden mb-2">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-[75%] h-full"></div>
                    </div>
                    <p className="text-xs text-right text-indigo-400 font-medium">75% Achieved</p>
                </Card>

                <Card className="!p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
                            <Flag size={24} />
                        </div>
                        <Badge variant="success">Monthly</Badge>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">Product Launch</h3>
                    <p className="text-sm text-[#94a3b8] mb-4">Release v2.0 Mobile App</p>
                    <div className="w-full bg-[#1e2130] h-2 rounded-full overflow-hidden mb-2">
                        <div className="bg-emerald-500 w-[90%] h-full"></div>
                    </div>
                    <p className="text-xs text-right text-emerald-400 font-medium">90% Done</p>
                </Card>

                <Card className="!p-4 border-dashed border-2 border-[#2d3142] bg-transparent flex flex-col items-center justify-center text-[#94a3b8] hover:border-[#6366f1] hover:text-[#6366f1] hover:bg-[#1e2130] transition-all cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-[#1e2130] flex items-center justify-center mb-3 group-hover:bg-[#6366f1]/20 transition-colors">
                        <Target size={24} />
                    </div>
                    <span className="font-medium">Create New Goal</span>
                </Card>
            </div>

            <h3 className="text-xl font-bold text-white mt-8">Active Targets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                    <Card key={i} className="flex gap-4">
                        <div className="flex flex-col items-center justify-center w-16 text-center border-r border-[#2d3142] pr-4">
                            <span className="text-2xl font-bold text-white">24</span>
                            <span className="text-xs text-[#94a3b8] uppercase">Oct</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-white">Complete Backend Migration</h4>
                                <Badge variant="warning">Ongoing</Badge>
                            </div>
                            <p className="text-sm text-[#94a3b8] mb-4">Migrate all legacy databases to the new cluster.</p>
                            <div className="flex gap-4 text-sm">
                                <div className="flex items-center gap-2 text-[#94a3b8]">
                                    <Users size={16} /> <span>Backend Team</span>
                                </div>
                                <div className="flex items-center gap-2 text-[#94a3b8]">
                                    <TrendingUp size={16} /> <span>High Priority</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Goals;
