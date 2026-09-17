import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface FadeInProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
}

export const FadeIn: React.FC<FadeInProps> = ({
    children,
    className,
    delay = 0,
    direction = "up"
}) => {
    const directionOffset = {
        up: 40,
        down: -40,
        left: 40,
        right: -40,
        none: 0
    };

    const y = direction === "up" || direction === "down" ? directionOffset[direction] : 0;
    const x = direction === "left" || direction === "right" ? directionOffset[direction] : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y, x }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
                duration: 0.8,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98] // custom ease
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
