import React from 'react';

const GenUIContainer = ({ children }) => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 relative min-h-full">
            {children}
        </div>
    );
};

export default GenUIContainer;
