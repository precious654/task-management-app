import React from 'react'

const ProgressBar = ({progress}: {progress: number}) => {
    return (
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
                className={`h-full bg-[#f26e56] transition-all duration-500 ease-out`}
                style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
            />
        </div>
    );
};
export default ProgressBar
