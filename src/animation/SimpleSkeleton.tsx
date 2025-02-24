import React, { ReactNode } from "react";

interface SimpleSkeletonProps {
  width?: string;
  height?: string;
  count?: number;
  children?: ReactNode;
}

const isValidSize = (value?: string): boolean => {
  if (!value) return true;
  return /^(\d+(px|vw|%))$/.test(value);
};

const SimpleSkeleton: React.FC<SimpleSkeletonProps> = ({
  width = "100%",
  height = "16px",
  count = 1,
  children,
}) => {
  if (!isValidSize(width) || !isValidSize(height)) {
    console.error("Invalid width or height. Must be in px, vw, or %.");
    return null;
  }
  if (count < 1) {
    console.error("Count should be at least 1");
    return null;
  }

  return (
    <>
      {Array.from({ length: Math.max(count, 1) }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-300 animate-pulse rounded flex items-center justify-center mb-2 last:mb-0"
          style={{ width, height }}
        >
          {children}
        </div>
      ))}
    </>
  );
};

export default SimpleSkeleton;
