import React from 'react'

const ProgressCircle = ({ progress }: {progress: number}) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    const sizes = {
        sm: "w-20 h-20",
        md: "w-32 h-32",
        lg: "w-40 h-40"
    };

    return (
        <div className={`relative ${sizes.md}`}>
            <svg className="w-full h-full transform -rotate-90">
                {/* Background circle */}
                <circle
                    className="text-gray-200"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="50%"
                    cy="50%"
                />
                {/* Progress circle */}
                <circle
                    className={`bg-[#f26e56] transition-all duration-500 ease-out`}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    stroke="#f26e56"
                    fill="transparent"
                    r={radius}
                    cx="50%"
                    cy="50%"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-semibold">{Math.round(progress)}%</span>
            </div>
        </div>
    );
};

export default ProgressCircle
