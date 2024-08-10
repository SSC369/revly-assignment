import React from "react";

const CircularProgressBar = ({ progress, size, strokeWidth, name }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const getColor = () => {
    if (progress < 30) return "text-red-500 stroke-red-500";
    if (progress < 70) return "text-yellow-500 stroke-yellow-500";
    return "text-green-500 stroke-green-500";
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <svg width={size} height={size} className="">
        <circle
          stroke="white"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          className={`transition-all duration-400 ${getColor()}`}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          className={`text-xl font-normal fill-current ${getColor()}`}
        >
          {progress}%
        </text>
      </svg>

      <p className="text-white font-normal text-base">{name}</p>
    </div>
  );
};

export default CircularProgressBar;
