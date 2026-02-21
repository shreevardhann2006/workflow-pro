import React from 'react';

const Input = ({ label, type = "text", placeholder, className = '', ...props }) => {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            {label && <label className="text-sm font-medium text-gray-400">{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                className="bg-background border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all placeholder-gray-600"
                {...props}
            />
        </div>
    );
};

export default Input;
