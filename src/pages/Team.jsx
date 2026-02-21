import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { Mail, Phone, MoreHorizontal } from 'lucide-react';

const Team = () => {
    const { members, openModal, deleteMember } = useData();
    const [activeDropdown, setActiveDropdown] = useState(null);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Team Members</h2>
                    <p className="text-muted">Manage user roles and access.</p>
                </div>
                <button
                    onClick={() => openModal('member')}
                    className="px-4 py-2 bg-[#6366f1] text-white rounded-lg hover:bg-[#4f46e5] transition-colors font-medium"
                >
                    + Add Member
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => (
                    <Card key={member.id} className="group hover:border-[#6366f1]/50 transition-colors relative">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-foreground font-bold text-lg border border-border">
                                {member.name.charAt(0)}
                            </div>
                            <div className="relative">
                                <button
                                    onClick={() => setActiveDropdown(activeDropdown === member.id ? null : member.id)}
                                    className="text-muted hover:text-foreground p-1 hover:bg-[#2d3142] rounded-lg transition-colors"
                                >
                                    <MoreHorizontal size={20} />
                                </button>

                                {activeDropdown === member.id && (
                                    <div className="absolute right-0 top-8 w-36 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-20 animate-in fade-in zoom-in-95">
                                        <button
                                            onClick={() => { openModal('edit_member', member); setActiveDropdown(null); }}
                                            className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-[#2d3142] transition-colors"
                                        >
                                            Edit Member
                                        </button>
                                        <button
                                            onClick={() => {
                                                deleteMember(member.id);
                                                setActiveDropdown(null);
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-rose-500 hover:bg-rose-500/10 transition-colors border-t border-border/50"
                                        >
                                            Delete Member
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                        <p className="text-[#6366f1] text-sm font-medium mb-4">{member.role}</p>

                        <div className="space-y-2 mb-6">
                            <div className="flex items-center gap-2 text-muted text-sm">
                                <Mail size={16} /> {member.email}
                            </div>
                            <div className="flex items-center gap-2 text-muted text-sm">
                                <Phone size={16} /> +1 234 567 890
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-border pt-4">
                            <Badge variant={member.status === 'Active' ? 'success' : 'warning'}>{member.status}</Badge>
                            <span className="text-xs text-muted">Joined Oct 2023</span>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Team;
