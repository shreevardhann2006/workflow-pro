import React from 'react';
import { useData } from '../context/DataContext';
import { X } from 'lucide-react';

const Modal = () => {
    const { activeModal, closeModal } = useData();

    if (!activeModal) return null;

    let title = '';
    let content = null;

    if (activeModal === 'task') {
        title = 'New Task';
        content = (
            <div className="space-y-4 text-[#94a3b8]">
                <p>Task creation form goes here.</p>
                {/* A proper form can be implemented later. For now just placeholder to show modal works */}
            </div>
        );
    } else if (activeModal === 'project') {
        title = 'New Project';
        content = (
            <div className="space-y-4 text-[#94a3b8]">
                <p>Project creation form goes here.</p>
            </div>
        );
    } else if (activeModal === 'notification') {
        title = 'Notifications';
        content = (
            <div className="space-y-4 text-[#94a3b8]">
                <p>No new notifications right now.</p>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-all duration-300" onClick={closeModal}>
            <div
                className="bg-[#1e2130] w-full max-w-md rounded-2xl border border-[#2d3142] shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-[#94a3b8] hover:text-white p-1 hover:bg-[#2d3142] rounded-lg transition-colors"
                >
                    <X size={20} />
                </button>
                <h3 className="text-xl font-bold text-white mb-6 w-full pr-8 border-b border-[#2d3142] pb-4">{title}</h3>
                {content}
                <div className="mt-8 flex justify-end gap-3">
                    <button onClick={closeModal} className="px-4 py-2 rounded-xl text-sm font-medium text-[#94a3b8] hover:text-white hover:bg-[#2d3142] transition-colors">
                        Cancel
                    </button>
                    {(activeModal === 'task' || activeModal === 'project') && (
                        <button onClick={closeModal} className="px-4 py-2 rounded-xl text-sm font-medium bg-[#6366f1] text-white hover:bg-[#4f46e5] shadow-lg shadow-[#6366f1]/25 transition-all">
                            Create
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
