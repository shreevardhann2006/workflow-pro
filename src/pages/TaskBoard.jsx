import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Input from '../components/Input';
import { Plus, Filter, Search, MoreVertical, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const TaskBoard = () => {
    const { tasks, updateTaskStatus, openModal } = useData();
    const [filter, setFilter] = useState('All');

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'success';
            case 'In Progress': return 'primary';
            case 'Review': return 'warning';
            case 'Pending': return 'default';
            default: return 'default';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Critical': return 'text-red-500';
            case 'High': return 'text-orange-500';
            case 'Medium': return 'text-yellow-500';
            case 'Low': return 'text-blue-500';
            default: return 'text-gray-500';
        }
    };

    const handleAddTask = () => {
        openModal('task');
    };

    const handleStatusCycle = (task) => {
        const statuses = ['Pending', 'In Progress', 'Review', 'Completed'];
        const currentIndex = statuses.indexOf(task.status);
        const nextStatus = statuses[(currentIndex + 1) % statuses.length];
        updateTaskStatus(task.id, nextStatus);
    };

    const filteredTasks = filter === 'All' ? tasks : tasks.filter(t => t.status === filter);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Task Board</h2>
                    <p className="text-muted">Manage and track all project tasks in one place.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="!px-3">
                        <Filter size={18} /> Filter
                    </Button>
                    <Button onClick={handleAddTask}>
                        <Plus size={18} /> New Task
                    </Button>
                </div>
            </div>

            {/* Filters & Search */}
            <Card className="!p-4 bg-card/50 backdrop-blur-sm sticky top-24 z-10">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        {['All', 'In Progress', 'Review', 'Completed'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${filter === f
                                    ? 'bg-[#6366f1] text-white shadow-lg shadow-[#6366f1]/20'
                                    : 'text-muted hover:bg-[#2d3142] hover:text-foreground'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="w-full bg-background border border-border rounded-lg py-2 pl-9 pr-4 text-sm text-foreground focus:outline-none focus:border-[#6366f1]"
                        />
                    </div>
                </div>
            </Card>

            {/* Task List */}
            <div className="space-y-4">
                {filteredTasks.map((task) => (
                    <div key={task.id} className="bg-card rounded-xl border border-border p-4 hover:border-[#6366f1]/50 transition-all group">
                        <div className="flex items-center justify-between">
                            <div className="flex items-start gap-4">
                                <div className={`mt-1 p-2 rounded-lg ${task.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-[#2d3142] text-muted'}`}>
                                    {task.status === 'Completed' ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                                </div>
                                <div>
                                    <h3 className="text-foreground font-medium text-lg leading-tight mb-1">{task.title}</h3>
                                    <div className="flex items-center gap-3 text-sm text-muted">
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-bold">
                                                {task.assignee.charAt(0)}
                                            </span>
                                            {task.assignee}
                                        </span>
                                        <span className="w-1 h-1 bg-[#2d3142] rounded-full"></span>
                                        <span>Due {task.due}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className={`text-xs font-bold uppercase tracking-wider ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                </div>
                                <div onClick={() => handleStatusCycle(task)} className="cursor-pointer hover:opacity-80 transition-opacity" title="Click to cycle status">
                                    <Badge variant={getStatusColor(task.status)}>{task.status}</Badge>
                                </div>
                                <button className="text-muted hover:text-foreground p-2 hover:bg-[#2d3142] rounded-lg transition-colors">
                                    <MoreVertical size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskBoard;
