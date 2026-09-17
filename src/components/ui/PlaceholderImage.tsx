import React from "react";
import { cn } from "../../lib/utils";

interface PlaceholderImageProps extends React.HTMLAttributes<HTMLDivElement> {
    aspectRatio?: string; // e.g. "16/9"
    text?: string;
}

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({ 
    className, 
    aspectRatio = "auto",
    text = "Image Placeholder",
    ...props 
}) => {
    return (
        <div
            className={cn(
                "relative flex items-center justify-center bg-muted/30 overflow-hidden",
                "border border-dashed border-muted-foreground/30",
                "animate-shimmer bg-[linear-gradient(110deg,#ececec,45%,#f5f5f5,55%,#ececec)] bg-[length:200%_100%] dark:bg-[linear-gradient(110deg,#1e1e1e,45%,#252525,55%,#1e1e1e)]",
                className
            )}
            style={{ aspectRatio }}
            {...props}
        >
            <span className="text-xs text-muted-foreground/50 font-medium select-none text-center px-2">
                {text}
            </span>
        </div>
    );
};
