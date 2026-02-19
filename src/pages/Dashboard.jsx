import React from 'react';
import { useData } from '../context/DataContext';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { TrendingUp, Users, CheckCircle, Clock, MoreHorizontal } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
    { name: 'Mon', completed: 4, pending: 2 },
    { name: 'Tue', completed: 3, pending: 4 },
    { name: 'Wed', completed: 2, pending: 6 },
    { name: 'Thu', completed: 6, pending: 1 },
    { name: 'Fri', completed: 8, pending: 3 },
    { name: 'Sat', completed: 5, pending: 2 },
    { name: 'Sun', completed: 4, pending: 1 },
];

const StatCard = ({ title, value, change, icon: Icon, trend }) => (
    <Card className="flex items-center justify-between !p-5">
        <div>
            <p className="text-[#94a3b8] text-sm font-medium mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
            <div className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {trend === 'up' ? '+' : '-'}{change}% from last week
            </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-[#2d3142]/50 flex items-center justify-center text-[#6366f1]">
            <Icon size={24} />
        </div>
    </Card>
);

const Dashboard = () => {
    const { stats, activities } = useData();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
                    <p className="text-[#94a3b8]">Track your team's performance and workflow progress.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-[#1e2130] text-sm text-white rounded-lg border border-[#2d3142]">This Week</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Tasks" value={stats.totalTasks} change="12.5" icon={CheckCircle} trend="up" />
                <StatCard title="In Progress" value={stats.inProgress} change="8.1" icon={Clock} trend="down" />
                <StatCard title="Team Efficiency" value={`${stats.efficiency}%`} change="3.2" icon={TrendingUp} trend="up" />
                <StatCard title="Active Projects" value={stats.activeProjects} change="0" icon={Users} trend="neutral" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card title="Productivity Trends" className="lg:col-span-2">
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2d3142" vertical={false} />
                                <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e2130', borderColor: '#2d3142', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="completed" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCompleted)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="Task Distribution">
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2d3142" vertical={false} />
                                <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                                <Tooltip
                                    cursor={{ fill: '#2d3142', opacity: 0.4 }}
                                    contentStyle={{ backgroundColor: '#1e2130', borderColor: '#2d3142', color: '#fff' }}
                                />
                                <Bar dataKey="pending" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            <Card title="Recent System Updates">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-[#94a3b8] text-sm border-b border-[#2d3142]">
                                <th className="py-3 font-medium">Action</th>
                                <th className="py-3 font-medium">Item</th>
                                <th className="py-3 font-medium">User</th>
                                <th className="py-3 font-medium">Time</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {activities.map((activity) => (
                                <tr key={activity.id} className="group hover:bg-[#252836] transition-colors border-b border-[#2d3142]/50 last:border-0">
                                    <td className="py-3.5 text-white font-medium">
                                        <Badge variant={activity.action === 'Task Completed' ? 'success' : 'primary'}>{activity.action}</Badge>
                                    </td>
                                    <td className="py-3.5 text-[#cbd5e1]">{activity.item}</td>
                                    <td className="py-3.5 text-[#94a3b8]">{activity.user}</td>
                                    <td className="py-3.5 text-[#94a3b8]">{activity.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default Dashboard;
