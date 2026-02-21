import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { User, Lock, Bell, Shield, Key, Smartphone, LogOut } from 'lucide-react';
import { useData } from '../context/DataContext';

const Settings = () => {
    const { currentUser } = useData();
    const [activeTab, setActiveTab] = useState('security');

    const tabs = [
        { id: 'general', label: 'General', icon: User },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-foreground">Settings</h2>
                <p className="text-muted">Manage your account preferences and security settings.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar Navigation */}
                <Card className="w-full md:w-64 flex-shrink-0 !p-2 h-fit">
                    <nav className="flex flex-col space-y-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${activeTab === tab.id
                                    ? 'bg-[#6366f1]/10 text-[#6366f1] shadow-sm'
                                    : 'text-muted hover:bg-card-hover hover:text-foreground'
                                    }`}
                            >
                                <tab.icon size={18} className={activeTab === tab.id ? 'text-[#6366f1]' : 'text-muted'} />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </Card>

                {/* Main Content Area */}
                <div className="flex-1 space-y-6">
                    {activeTab === 'general' && (
                        <Card title="Profile Information" className="space-y-6">
                            <div className="flex items-center gap-6 pb-6 border-b border-border">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#a855f7] text-white font-bold flex items-center justify-center text-2xl shadow-lg shadow-[#6366f1]/20">
                                    {currentUser?.full_name ? currentUser.full_name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground">{currentUser?.full_name || 'User'}</h3>
                                    <p className="text-muted text-sm">{currentUser?.role || 'Member'}</p>
                                    <div className="mt-3 flex gap-2">
                                        <Button variant="outline" className="!py-1.5 !text-xs">Change Avatar</Button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Full Name</label>
                                    <input
                                        type="text"
                                        defaultValue={currentUser?.full_name || ''}
                                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#6366f1] focus:border-transparent outline-none transition-all placeholder-muted text-foreground"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Email Address</label>
                                    <input
                                        type="email"
                                        defaultValue={currentUser?.username || ''}
                                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#6366f1] focus:border-transparent outline-none transition-all placeholder-muted text-foreground"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Role</label>
                                    <input
                                        type="text"
                                        defaultValue={currentUser?.role || 'Member'}
                                        disabled
                                        className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-sm outline-none text-muted cursor-not-allowed"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end pt-4">
                                <Button variant="primary">Save Changes</Button>
                            </div>
                        </Card>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            <Card title="Password" className="space-y-6">
                                <p className="text-sm text-muted mb-4">Update your password to keep your account secure.</p>
                                <div className="space-y-4 max-w-md">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                                            <Lock size={16} className="text-muted" />
                                            Current Password
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#6366f1] focus:border-transparent outline-none transition-all placeholder-muted text-foreground"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                                            <Key size={16} className="text-muted" />
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#6366f1] focus:border-transparent outline-none transition-all placeholder-muted text-foreground"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                                            <Key size={16} className="text-muted" />
                                            Confirm New Password
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#6366f1] focus:border-transparent outline-none transition-all placeholder-muted text-foreground"
                                        />
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <Button variant="primary">Update Password</Button>
                                </div>
                            </Card>

                            <Card title="Two-Factor Authentication" className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-background border border-border rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#6366f1]/10 flex items-center justify-center text-[#6366f1]">
                                            <Smartphone size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-foreground">SMS Recovery</h4>
                                            <p className="text-xs text-muted">Use your mobile phone to receive security codes.</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="!py-1.5 !px-3 text-sm">Enable</Button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-background border border-border rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#10b981]/10 flex items-center justify-center text-[#10b981]">
                                            <Shield size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-foreground">Authenticator App</h4>
                                            <p className="text-xs text-muted">Use an app like Google Authenticator to generate codes.</p>
                                        </div>
                                    </div>
                                    <span className="px-2.5 py-1 bg-[#10b981]/10 text-[#10b981] text-xs font-medium rounded-lg border border-[#10b981]/20">Active</span>
                                </div>
                            </Card>

                            <Card title="Active Sessions" className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-background border border-border rounded-xl relative overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#10b981]"></div>
                                    <div className="flex items-center gap-4 pl-2">
                                        <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground border border-border">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                                                Windows • Chrome
                                                <span className="text-[10px] uppercase tracking-wider bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-bold">Current Session</span>
                                            </h4>
                                            <p className="text-xs text-muted mt-0.5">Coimbatore, India • Active now</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-background border border-border rounded-xl">
                                    <div className="flex items-center gap-4 pl-2">
                                        <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground border border-border">
                                            <Smartphone size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-foreground">iPhone 13 • Safari</h4>
                                            <p className="text-xs text-muted mt-0.5">Chennai, India • Last active 2 hours ago</p>
                                        </div>
                                    </div>
                                    <button className="p-2 text-muted hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-colors" title="Revoke Session">
                                        <LogOut size={16} />
                                    </button>
                                </div>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <Card title="Notification Preferences" className="space-y-6">
                            <div className="space-y-4 border-b border-border pb-6">
                                <h3 className="text-sm font-semibold text-foreground mb-4 text-[#6366f1]">Email Notifications</h3>

                                <label className="flex items-center justify-between cursor-pointer group">
                                    <div>
                                        <h4 className="text-sm font-medium text-foreground group-hover:text-[#6366f1] transition-colors">Task Assignments</h4>
                                        <p className="text-xs text-muted">Get notified when you are assigned a new task</p>
                                    </div>
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                        <input type="checkbox" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-[#2d3142] checked:right-0 checked:border-[#6366f1] transition-all duration-200" />
                                        <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[#2d3142] checked:bg-[#6366f1] cursor-pointer"></label>
                                    </div>
                                </label>

                                <label className="flex items-center justify-between cursor-pointer group">
                                    <div>
                                        <h4 className="text-sm font-medium text-foreground group-hover:text-[#6366f1] transition-colors">Project Updates</h4>
                                        <p className="text-xs text-muted">Daily summary of project progress</p>
                                    </div>
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                        <input type="checkbox" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-[#2d3142] checked:right-0 checked:border-[#6366f1] transition-all duration-200" />
                                        <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[#2d3142] cursor-pointer"></label>
                                    </div>
                                </label>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-foreground mb-4 text-[#6366f1]">Push Notifications</h3>

                                <label className="flex items-center justify-between cursor-pointer group">
                                    <div>
                                        <h4 className="text-sm font-medium text-foreground group-hover:text-[#6366f1] transition-colors">Direct Messages</h4>
                                        <p className="text-xs text-muted">Receive alerts for direct messages</p>
                                    </div>
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                        <input type="checkbox" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-[#2d3142] checked:right-0 checked:border-[#6366f1] transition-all duration-200" />
                                        <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[#2d3142] checked:bg-[#6366f1] cursor-pointer"></label>
                                    </div>
                                </label>

                                <label className="flex items-center justify-between cursor-pointer group">
                                    <div>
                                        <h4 className="text-sm font-medium text-foreground group-hover:text-[#6366f1] transition-colors">Mentions</h4>
                                        <p className="text-xs text-muted">Get notified when someone @mentions you</p>
                                    </div>
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                        <input type="checkbox" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-[#2d3142] checked:right-0 checked:border-[#6366f1] transition-all duration-200" />
                                        <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[#2d3142] checked:bg-[#6366f1] cursor-pointer"></label>
                                    </div>
                                </label>
                            </div>

                            {/* CSS for custom toggle switches, hidden utility */}
                            <style jsx>{`
                                .toggle-checkbox:checked {
                                    right: 0;
                                    border-color: #6366f1;
                                }
                                .toggle-checkbox:checked + .toggle-label {
                                    background-color: #6366f1;
                                }
                            `}</style>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
