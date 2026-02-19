import React from 'react';
import { useData } from '../context/DataContext';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { Mail, Phone, MoreHorizontal } from 'lucide-react';

const Team = () => {
    const { members } = useData();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white">Team Members</h2>
                    <p className="text-[#94a3b8]">Manage user roles and access.</p>
                </div>
                <button className="px-4 py-2 bg-[#6366f1] text-white rounded-lg hover:bg-[#4f46e5] transition-colors font-medium">
                    + Add Member
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => (
                    <Card key={member.id} className="group hover:border-[#6366f1]/50 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold text-lg border border-[#2d3142]">
                                {member.name.charAt(0)}
                            </div>
                            <button className="text-[#94a3b8] hover:text-white"><MoreHorizontal size={20} /></button>
                        </div>
                        <h3 className="text-lg font-bold text-white">{member.name}</h3>
                        <p className="text-[#6366f1] text-sm font-medium mb-4">{member.role}</p>

                        <div className="space-y-2 mb-6">
                            <div className="flex items-center gap-2 text-[#94a3b8] text-sm">
                                <Mail size={16} /> {member.email}
                            </div>
                            <div className="flex items-center gap-2 text-[#94a3b8] text-sm">
                                <Phone size={16} /> +1 234 567 890
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-[#2d3142] pt-4">
                            <Badge variant={member.status === 'Active' ? 'success' : 'warning'}>{member.status}</Badge>
                            <span className="text-xs text-[#94a3b8]">Joined Oct 2023</span>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Team;
