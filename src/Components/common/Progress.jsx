import React from "react";
import { motion } from "framer-motion";
import "./Progress.css";

const Progress = ({
  value,
  max = 100,
  variant = "default",
  size = "md",
  showLabel = false,
  labelPosition = "right",
  className = "",
  animated = true,
  ...props
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const baseClasses = [
    "progress",
    `progress-${variant}`,
    `progress-${size}`,
    showLabel ? `progress-label-${labelPosition}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const progressBar = (
    <div
      className="progress-bar"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <motion.div
        className="progress-fill"
        initial={animated ? { width: 0 } : false}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );

  const label = showLabel && (
    <span className="progress-label">
      {value}/{max}
    </span>
  );

  return (
    <div className={baseClasses} {...props}>
      {labelPosition === "left" && label}
      {progressBar}
      {labelPosition === "right" && label}
    </div>
  );
};

// Progress Circle Variant
Progress.Circle = ({
  value,
  max = 100,
  size = "md",
  strokeWidth = 4,
  showLabel = true,
  className = "",
  animated = true,
  ...props
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = size === "sm" ? 20 : size === "lg" ? 40 : 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const baseClasses = ["progress-circle", `progress-circle-${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={baseClasses} {...props}>
      <svg
        width={radius * 2 + strokeWidth}
        height={radius * 2 + strokeWidth}
        viewBox={`0 0 ${radius * 2 + strokeWidth} ${radius * 2 + strokeWidth}`}
      >
        <circle
          className="progress-circle-bg"
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <motion.circle
          className="progress-circle-fill"
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={animated ? { strokeDashoffset: circumference } : false}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </svg>
      {showLabel && (
        <span className="progress-circle-label">{Math.round(percentage)}%</span>
      )}
    </div>
  );
};

export default Progress;
