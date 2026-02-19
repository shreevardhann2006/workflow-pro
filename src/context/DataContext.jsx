import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    // Initial Data
    const initialTasks = [
        { id: 1, title: 'Design System Update v2.0', assignee: 'Alex Morgan', due: 'Oct 24', status: 'Completed', priority: 'High', type: 'Design' },
        { id: 2, title: 'Integration with Payment Gateway', assignee: 'Sarah Smith', due: 'Oct 26', status: 'In Progress', priority: 'Critical', type: 'Backend' },
        { id: 3, title: 'Mobile Responsive Fixes', assignee: 'John Doe', due: 'Oct 28', status: 'Pending', priority: 'Medium', type: 'Frontend' },
        { id: 4, title: 'User Onboarding Flow', assignee: 'Emily Chen', due: 'Oct 30', status: 'In Progress', priority: 'High', type: 'UX' },
        { id: 5, title: 'API Documentation', assignee: 'Mike Ross', due: 'Nov 02', status: 'Review', priority: 'Low', type: 'Docs' },
    ];

    const initialMembers = [
        { id: 1, name: 'Alex Morgan', role: 'Project Manager', email: 'alex@company.com', status: 'Active' },
        { id: 2, name: 'Sarah Smith', role: 'Backend Lead', email: 'sarah@company.com', status: 'Active' },
        { id: 3, name: 'John Doe', role: 'Frontend Developer', email: 'john@company.com', status: 'On Leave' },
        { id: 4, name: 'Emily Chen', role: 'UI/UX Designer', email: 'emily@company.com', status: 'Active' },
        { id: 5, name: 'Mike Ross', role: 'QA Engineer', email: 'mike@company.com', status: 'Active' },
    ];

    const initialActivities = [
        { id: 1, action: 'Task Completed', item: 'Design System Update v2.0', user: 'Alex Morgan', time: '2 hours ago' },
        { id: 2, action: 'New Comment', item: 'API Documentation', user: 'Mike Ross', time: '5 hours ago' },
        { id: 3, action: 'Status Updated', item: 'User Onboarding Flow', user: 'Emily Chen', time: '1 day ago' }
    ];

    const [tasks, setTasks] = useState(initialTasks);
    const [members, setMembers] = useState(initialMembers);
    const [activities, setActivities] = useState(initialActivities);

    // Derived State
    const [stats, setStats] = useState({
        totalTasks: 0,
        inProgress: 0,
        completed: 0,
        efficiency: 0,
        activeProjects: 0
    });

    useEffect(() => {
        const total = tasks.length;
        const completed = tasks.filter(t => t.status === 'Completed').length;
        const inProgress = tasks.filter(t => t.status === 'In Progress').length;
        const efficiency = total > 0 ? Math.round((completed / total) * 100) : 0;

        // Active projects based on unique types of non-completed tasks
        const activeTypes = new Set(tasks.filter(t => t.status !== 'Completed').map(t => t.type));
        const activeProjects = activeTypes.size;

        setStats({
            totalTasks: total,
            inProgress,
            completed,
            efficiency,
            activeProjects
        });
    }, [tasks]);

    const addTask = (newTask) => {
        const task = { ...newTask, id: tasks.length + 1, status: 'Pending' };
        setTasks([task, ...tasks]);
        addActivity('Task Created', task.title, 'You'); // "You" as current user
    };

    const updateTaskStatus = (taskId, newStatus) => {
        const task = tasks.find(t => t.id === taskId);
        if (task && task.status !== newStatus) {
            const updatedTasks = tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t);
            setTasks(updatedTasks);
            addActivity('Status Updated', `${task.title} to ${newStatus}`, 'You');
        }
    };

    const addActivity = (action, item, user) => {
        const newActivity = {
            id: Date.now(),
            action,
            item,
            user,
            time: 'Just now'
        };
        setActivities([newActivity, ...activities.slice(0, 9)]); // Keep last 10
    };

    return (
        <DataContext.Provider value={{
            tasks,
            members,
            activities,
            stats,
            addTask,
            updateTaskStatus
        }}>
            {children}
        </DataContext.Provider>
    );
};
