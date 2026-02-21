import React from 'react';

const Card = ({ children, className = '', title, action }) => {
    return (
        <div className={`bg-card rounded-xl border border-border p-6 shadow-xl ${className}`}>
            {(title || action) && (
                <div className="flex justify-between items-center mb-6">
                    {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
                    {action && <div>{action}</div>}
                </div>
            )}
            {children}
        </div>
    );
};

export default Card;
