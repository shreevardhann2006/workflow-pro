import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { X, Calendar, AlignLeft, Flag, Target } from 'lucide-react';

const Modal = () => {
    const { activeModal, closeModal, addTask } = useData();

    // Form States
    const [titleStr, setTitleStr] = useState('');
    const [assignee, setAssignee] = useState('You');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [type, setType] = useState('Frontend');

    const handleCreateTask = () => {
        if (!titleStr.trim()) return;
        addTask({
            title: titleStr,
            assignee: assignee,
            due: dueDate || 'TBD',
            status: 'Pending',
            priority: priority,
            type: type
        });
        setTitleStr('');
        closeModal();
    };

    const handleCreateProject = () => {
        if (!titleStr.trim()) return;
        // Treat as a new project type by adding an initialization task
        addTask({
            title: 'Project Setup & Planning',
            assignee: 'You',
            due: 'TBD',
            status: 'Pending',
            priority: 'Medium',
            type: titleStr
        });
        setTitleStr('');
        closeModal();
    };

    if (!activeModal) return null;

    let title = '';
    let content = null;

    if (activeModal === 'task') {
        title = 'New Task';
        content = (
            <div className="space-y-4 text-foreground">
                <div>
                    <label className="text-xs text-muted font-semibold uppercase tracking-wider mb-1 block">Task Title</label>
                    <input
                        type="text"
                        value={titleStr}
                        onChange={(e) => setTitleStr(e.target.value)}
                        placeholder="e.g., Design Landing Page"
                        className="w-full bg-background border border-border rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[#6366f1] transition-colors"
                        autoFocus
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-muted font-semibold uppercase tracking-wider mb-1 block">Due Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                            <input
                                type="text"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                placeholder="e.g., Tomorrow"
                                className="w-full bg-background border border-border rounded-lg py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:border-[#6366f1] transition-colors"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-muted font-semibold uppercase tracking-wider mb-1 block">Priority</label>
                        <div className="relative">
                            <Flag className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full bg-background border border-border rounded-lg py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:border-[#6366f1] transition-colors appearance-none cursor-pointer text-foreground"
                            >
                                <option className="bg-card">Low</option>
                                <option className="bg-card">Medium</option>
                                <option className="bg-card">High</option>
                                <option className="bg-card">Critical</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="text-xs text-muted font-semibold uppercase tracking-wider mb-1 block">Project / Type</label>
                    <div className="relative">
                        <Target className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                        <input
                            type="text"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            placeholder="e.g., Frontend"
                            className="w-full bg-background border border-border rounded-lg py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:border-[#6366f1] transition-colors"
                        />
                    </div>
                </div>
            </div>
        );
    } else if (activeModal === 'project') {
        title = 'New Project';
        content = (
            <div className="space-y-4 text-foreground">
                <div>
                    <label className="text-xs text-muted font-semibold uppercase tracking-wider mb-1 block">Project Name</label>
                    <input
                        type="text"
                        value={titleStr}
                        onChange={(e) => setTitleStr(e.target.value)}
                        placeholder="e.g., Q3 Marketing Push"
                        className="w-full bg-background border border-border rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[#6366f1] transition-colors"
                        autoFocus
                    />
                </div>
                <p className="text-xs text-muted leading-relaxed">
                    Creating a project will initialize a new task type that you can filter by, helping organize your workspace and assign team members.
                </p>
            </div>
        );
    } else if (activeModal === 'notification') {
        title = 'Notifications';
        content = (
            <div className="space-y-3">
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                    <p className="text-sm text-indigo-200">System <span className="text-muted text-xs px-2">1m ago</span></p>
                    <p className="text-[13px] text-foreground mt-1">Welcome to WorkTracker! Complete your profile.</p>
                </div>
                <div className="p-3 bg-background border border-border rounded-xl">
                    <p className="text-sm text-muted">System <span className="text-muted/50 text-xs px-2">1h ago</span></p>
                    <p className="text-[13px] text-muted mt-1">Dark mode integration is on its way.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-all duration-300" onClick={closeModal}>
            <div
                className="bg-card w-full max-w-md rounded-2xl border border-border shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-muted hover:text-foreground p-1 hover:bg-[#2d3142] rounded-lg transition-colors"
                >
                    <X size={20} />
                </button>
                <h3 className="text-xl font-bold text-foreground mb-6 w-full pr-8 border-b border-border pb-4">{title}</h3>
                {content}
                <div className="mt-8 flex justify-end gap-3">
                    <button onClick={closeModal} className="px-4 py-2 rounded-xl text-sm font-medium text-muted hover:text-foreground hover:bg-[#2d3142] transition-colors">
                        Cancel
                    </button>
                    {(activeModal === 'task' || activeModal === 'project') && (
                        <button
                            onClick={activeModal === 'task' ? handleCreateTask : handleCreateProject}
                            disabled={!titleStr.trim()}
                            className="px-4 py-2 rounded-xl text-sm font-medium bg-[#6366f1] text-white hover:bg-[#4f46e5] disabled:bg-[#6366f1]/50 disabled:cursor-not-allowed shadow-lg shadow-[#6366f1]/25 transition-all"
                        >
                            Create {activeModal === 'task' ? 'Task' : 'Project'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
