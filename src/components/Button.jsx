import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-[#6366f1] hover:bg-[#4f46e5] text-foreground shadow-[0_0_15px_rgba(99,102,241,0.3)]",
        secondary: "bg-card hover:bg-[#2d3142] text-foreground border border-border",
        danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20",
        ghost: "text-muted hover:text-foreground hover:bg-card"
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
