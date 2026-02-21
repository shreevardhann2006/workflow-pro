import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
    const variants = {
        default: "bg-[#2d3142] text-muted",
        success: "bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20",
        warning: "bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20",
        danger: "bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20",
        primary: "bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/20"
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
