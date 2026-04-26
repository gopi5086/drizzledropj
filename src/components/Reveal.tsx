import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    y?: number;
    x?: number;
    direction?: "up" | "down" | "left" | "right";
    className?: string;
}

export default function Reveal({ children, width = "fit-content", delay = 0.2, y = 30, x = 0, direction = "up", className }: Props) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    // Calculate initial positions based on direction
    const initialY = direction === "up" ? y : direction === "down" ? -y : 0;
    const initialX = direction === "left" ? 50 : direction === "right" ? -50 : x;

    return (
        <div ref={ref} className={className} style={{ position: "relative", width, overflow: "visible" }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: initialY, x: initialX },
                    visible: { opacity: 1, y: 0, x: 0 },
                }}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
            >
                {children}
            </motion.div>
        </div>
    );
}
