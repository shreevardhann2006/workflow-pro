import React from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

const data = [
    { name: 'Jan', performance: 85, tasks: 45, delayed: 2 },
    { name: 'Feb', performance: 88, tasks: 52, delayed: 1 },
    { name: 'Mar', performance: 92, tasks: 48, delayed: 0 },
    { name: 'Apr', performance: 90, tasks: 61, delayed: 3 },
    { name: 'May', performance: 95, tasks: 55, delayed: 1 },
    { name: 'Jun', performance: 94, tasks: 67, delayed: 1 },
];

const TrackRecord = () => {
    const handleExport = () => {
        let csv = 'Month,Efficiency Score,Tasks Delivered,Delayed\n';
        data.forEach(row => {
            csv += `${row.name},${row.performance},${row.tasks},${row.delayed}\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'performance_report.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Performance Track Record</h2>
                    <p className="text-muted">Historical analysis of team performance and delivery timelines.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleExport}
                        className="px-3 py-1.5 bg-card text-sm text-foreground rounded-lg border border-border hover:bg-[#2d3142] transition-colors hover:text-white"
                    >
                        Export Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2" title="Performance History (6 Months)">
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2d3142" vertical={false} />
                                <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e2130', borderColor: '#2d3142', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="performance" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} name="Efficiency Score" />
                                <Line type="monotone" dataKey="tasks" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1' }} name="Tasks Completed" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <div className="space-y-6">
                    <Card title="Key Metrics">
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-muted">On-Time Delivery</span>
                                    <span className="text-foreground font-bold">96%</span>
                                </div>
                                <div className="h-2 bg-[#2d3142] rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[96%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-muted">Task Completion Rate</span>
                                    <span className="text-foreground font-bold">92%</span>
                                </div>
                                <div className="h-2 bg-[#2d3142] rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[92%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-muted">Client Satisfaction</span>
                                    <span className="text-foreground font-bold">4.8/5.0</span>
                                </div>
                                <div className="h-2 bg-[#2d3142] rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-500 w-[85%]"></div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="text-lg font-semibold text-foreground mb-4">Risk Analysis</h3>
                        <div className="flex items-center gap-3 mb-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <AlertTriangle className="text-red-500" size={20} />
                            <div>
                                <p className="text-red-400 font-medium text-sm">Deployment Delay</p>
                                <p className="text-xs text-red-400/70">Frontend team is lagging by 2 days</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            <CheckCircle className="text-emerald-500" size={20} />
                            <div>
                                <p className="text-emerald-400 font-medium text-sm">Design Phase</p>
                                <p className="text-xs text-emerald-400/70">Completed 3 days ahead of schedule</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <Card title="Employee Contributions">
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2d3142" vertical={false} />
                            <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                            <Tooltip
                                cursor={{ fill: '#2d3142', opacity: 0.4 }}
                                contentStyle={{ backgroundColor: '#1e2130', borderColor: '#2d3142', color: '#fff' }}
                            />
                            <Bar dataKey="tasks" fill="#6366f1" radius={[4, 4, 0, 0]} name="Tasks Delivered" />
                            <Bar dataKey="delayed" fill="#ef4444" radius={[4, 4, 0, 0]} name="Delayed" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
};

export default TrackRecord;
