import React from "react";

interface SkeletonLoaderProps {
    count?: number;
    width?: string;
    height?: string;
    borderRadius?: string;
    className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
    count = 1,
    width = "100px",
    height = "100px",
    borderRadius = "8px",
    className = "",
}) => {
    return (
        <div style={{ display: "flex", gap: "16px" }}>
            {Array.from({ length: count }).map((_, idx) => (
                <div
                    key={idx}
                    className={`skeleton-tile ${className}`}
                    style={{
                        width,
                        height,
                        borderRadius,
                        background: "linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%)",
                        backgroundSize: "200% 100%",
                        animation: "skeleton-loading 1.5s infinite linear",
                    }}
                />
            ))}
            <style>
                {`
                    @keyframes skeleton-loading {
                        0% {
                            background-position: 200% 0;
                        }
                        100% {
                            background-position: -200% 0;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default SkeletonLoader;