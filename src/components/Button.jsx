import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-[#6366f1] hover:bg-[#4f46e5] text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]",
        secondary: "bg-[#1e2130] hover:bg-[#2d3142] text-white border border-[#2d3142]",
        danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20",
        ghost: "text-[#94a3b8] hover:text-white hover:bg-[#1e2130]"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
