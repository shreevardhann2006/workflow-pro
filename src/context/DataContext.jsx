import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isPlaceholder as envIsPlaceholder } from '../supabaseClient';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [members, setMembers] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeModal, setActiveModal] = useState(null);
    const [isLocalMode, setIsLocalMode] = useState(envIsPlaceholder);

    const openModal = (modalName, payload = null) => {
        setActiveModal(payload ? [modalName, payload] : modalName);
    };
    const closeModal = () => setActiveModal(null);

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

            // Check if we are using the placeholder client OR fell back previously
            if (isLocalMode) {
                console.warn('Supabase URL is missing or unreachable. Using local empty state backed by LocalStorage.');
                const storedTasks = JSON.parse(localStorage.getItem('wt_tasks')) || [];
                const storedMembers = JSON.parse(localStorage.getItem('wt_members')) || [];
                const storedActivities = JSON.parse(localStorage.getItem('wt_activities')) || [];

                setTasks(storedTasks);
                setMembers(storedMembers);
                setActivities(storedActivities);
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
            console.error('Error fetching data from Supabase. Falling back to Local Storage Mode:', error);
            setIsLocalMode(true); // Permanently switch to local state mode for this session

            // Immediately load from local storage since Supabase failed (e.g., missing tables)
            const storedTasks = JSON.parse(localStorage.getItem('wt_tasks')) || [];
            const storedMembers = JSON.parse(localStorage.getItem('wt_members')) || [];
            const storedActivities = JSON.parse(localStorage.getItem('wt_activities')) || [];

            setTasks(storedTasks);
            setMembers(storedMembers);
            setActivities(storedActivities);
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

        // Sync to LocalStorage if using placeholder mode
        if (isLocalMode && !loading) {
            localStorage.setItem('wt_tasks', JSON.stringify(tasks));
        }
    }, [tasks, loading, isLocalMode]);

    useEffect(() => {
        if (isLocalMode && !loading) {
            localStorage.setItem('wt_members', JSON.stringify(members));
        }
    }, [members, loading, isLocalMode]);

    useEffect(() => {
        if (isLocalMode && !loading) {
            localStorage.setItem('wt_activities', JSON.stringify(activities));
        }
    }, [activities, loading, isLocalMode]);

    const addTask = async (newTask) => {
        try {
            if (!isLocalMode) {
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
            } else {
                // Fallback to local memory only
                const localTask = {
                    id: Date.now(),
                    title: newTask.title,
                    assignee: newTask.assignee,
                    due: newTask.due,
                    status: 'Pending',
                    priority: newTask.priority,
                    type: newTask.type
                };
                setTasks([localTask, ...tasks]);
                addActivity('Task Created', localTask.title, 'You');
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const editTask = async (taskId, updatedData) => {
        try {
            if (!isLocalMode) {
                const { error } = await supabase
                    .from('tasks')
                    .update(updatedData)
                    .eq('id', taskId);

                if (error) throw error;
            }

            const updatedTasks = tasks.map(t => t.id === taskId ? { ...t, ...updatedData } : t);
            setTasks(updatedTasks);
            addActivity('Task Updated', updatedData.title || 'A task', 'You');
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            if (!isLocalMode) {
                const { error } = await supabase
                    .from('tasks')
                    .delete()
                    .eq('id', taskId);

                if (error) throw error;
            }

            const taskToDelete = tasks.find(t => t.id === taskId);
            setTasks(tasks.filter(t => t.id !== taskId));
            if (taskToDelete) {
                addActivity('Task Deleted', taskToDelete.title, 'You');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            if (!isLocalMode) {
                const { error } = await supabase
                    .from('tasks')
                    .update({ status: newStatus })
                    .eq('id', taskId);

                if (error) throw error;
            }

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
            if (!isLocalMode) {
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
            } else {
                // Local fallback
                const localActivity = {
                    id: Date.now(),
                    action,
                    item,
                    user,
                    time: 'Just now'
                };
                setActivities([localActivity, ...activities.slice(0, 9)]);
            }
        } catch (error) {
            console.error('Error adding activity:', error);
        }
    };

    const addMember = async (newMember) => {
        try {
            if (!isLocalMode) {
                const { data, error } = await supabase
                    .from('members')
                    .insert([newMember])
                    .select();

                if (error) throw error;

                if (data) {
                    setMembers([...members, data[0]]);
                    addActivity('Member Added', data[0].name, 'Admin');
                }
            } else {
                // Local fallback
                const localMember = {
                    id: Date.now(),
                    ...newMember
                };
                setMembers([...members, localMember]);
                addActivity('Member Added', localMember.name, 'Admin');
            }
        } catch (error) {
            console.error('Error adding member:', error);
        }
    };

    const editMember = async (memberId, updatedData) => {
        try {
            if (!isLocalMode) {
                const { error } = await supabase
                    .from('members')
                    .update(updatedData)
                    .eq('id', memberId);

                if (error) throw error;
            }

            const updatedMembers = members.map(m => m.id === memberId ? { ...m, ...updatedData } : m);
            setMembers(updatedMembers);
            addActivity('Member Updated', updatedData.name || 'A member', 'Admin');
        } catch (error) {
            console.error('Error updating member:', error);
        }
    };

    const deleteMember = async (memberId) => {
        try {
            if (!isLocalMode) {
                const { error } = await supabase
                    .from('members')
                    .delete()
                    .eq('id', memberId);

                if (error) throw error;
            }

            const memberToDelete = members.find(m => m.id === memberId);
            setMembers(members.filter(m => m.id !== memberId));
            if (memberToDelete) {
                addActivity('Member Deleted', memberToDelete.name, 'Admin');
            }
        } catch (error) {
            console.error('Error deleting member:', error);
        }
    };

    return (
        <DataContext.Provider value={{
            tasks,
            members,
            activities,
            stats,
            activeModal,
            openModal,
            closeModal,
            addTask,
            editTask,
            deleteTask,
            updateTaskStatus,
            addMember,
            editMember,
            deleteMember
        }}>
            {children}
        </DataContext.Provider>
    );
};
