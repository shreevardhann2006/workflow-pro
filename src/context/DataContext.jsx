import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [members, setMembers] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    // Derived State
    const [stats, setStats] = useState({
        totalTasks: 0,
        inProgress: 0,
        completed: 0,
        efficiency: 0,
        activeProjects: 0
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);

            // Check if we are using the placeholder client
            if (supabase.supabaseUrl === 'https://placeholder.supabase.co') {
                console.warn('Supabase URL is missing. Using local empty state. Please configure your .env or Vercel Environment Variables.');
                setTasks([]);
                setMembers([]);
                setActivities([]);
                setLoading(false);
                return;
            }

            const { data: tasksData, error: tasksError } = await supabase
                .from('tasks')
                .select('*')
                .order('id', { ascending: false });

            const { data: membersData, error: membersError } = await supabase
                .from('members')
                .select('*');

            const { data: activitiesData, error: activitiesError } = await supabase
                .from('activities')
                .select('*')
                .order('id', { ascending: false })
                .limit(10);

            if (tasksError) throw tasksError;
            if (membersError) throw membersError;
            if (activitiesError) throw activitiesError;

            // Map DB fields to UI fields if necessary
            const formattedTasks = tasksData.map(t => ({
                ...t,
                due: t.due_date // Map due_date from DB to due for UI
            }));

            const formattedActivities = activitiesData.map(a => ({
                ...a,
                user: a.user_name, // Map user_name from DB to user for UI
                time: a.time_text  // Map time_text from DB to time for UI
            }));

            setTasks(formattedTasks || []);
            setMembers(membersData || []);
            setActivities(formattedActivities || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Fallback to empty arrays on error to prevent crashing the UI completely
            setTasks([]);
            setMembers([]);
            setActivities([]);
        } finally {
            setLoading(false);
        }
    };

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

    const addTask = async (newTask) => {
        try {
            const { data, error } = await supabase
                .from('tasks')
                .insert([{
                    title: newTask.title,
                    assignee: newTask.assignee,
                    due_date: newTask.due,
                    status: 'Pending',
                    priority: newTask.priority,
                    type: newTask.type
                }])
                .select();

            if (error) throw error;

            if (data) {
                const createdTask = { ...data[0], due: data[0].due_date };
                setTasks([createdTask, ...tasks]);
                addActivity('Task Created', createdTask.title, 'You');
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            const { error } = await supabase
                .from('tasks')
                .update({ status: newStatus })
                .eq('id', taskId);

            if (error) throw error;

            const updatedTasks = tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t);
            setTasks(updatedTasks);

            const task = tasks.find(t => t.id === taskId);
            if (task) {
                addActivity('Status Updated', `${task.title} to ${newStatus}`, 'You');
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const addActivity = async (action, item, user) => {
        try {
            const { data, error } = await supabase
                .from('activities')
                .insert([{
                    action,
                    item,
                    user_name: user,
                    time_text: 'Just now'
                }])
                .select();

            if (error) throw error;

            if (data) {
                const newActivity = { ...data[0], user: data[0].user_name, time: data[0].time_text };
                setActivities([newActivity, ...activities.slice(0, 9)]);
            }
        } catch (error) {
            console.error('Error adding activity:', error);
        }
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
