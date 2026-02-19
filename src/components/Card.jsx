import React from 'react';

const Card = ({ children, className = '', title, action }) => {
    return (
        <div className={`bg-[#1e2130] rounded-xl border border-[#2d3142] p-6 shadow-xl ${className}`}>
            {(title || action) && (
                <div className="flex justify-between items-center mb-6">
                    {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
                    {action && <div>{action}</div>}
                </div>
            )}
            {children}
        </div>
    );
};

export default Card;
