import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function DraggableComponent() {
    const ref = useRef<HTMLDivElement | null>(null);

    // Define the type for drag constraints
    type ConstraintsType = { left: number; right: number; top: number; bottom: number };

    const [constraints, setConstraints] = useState<ConstraintsType | undefined>(undefined);

    useEffect(() => {
        const updateConstraints = () => {
            if (ref.current) {
                const { offsetWidth, offsetHeight } = ref.current;
                setConstraints({
                    left: 0,
                    right: window.innerWidth - offsetWidth,
                    top: 0,
                    bottom: window.innerHeight - offsetHeight,
                });
            }
        };

        updateConstraints(); // Set constraints initially
        window.addEventListener("resize", updateConstraints); // Update on window resize

        return () => window.removeEventListener("resize", updateConstraints); // Cleanup
    }, []);

    return (
        <motion.div
            ref={ref}
            className="mt-6 window glass active"
            drag
            dragConstraints={constraints} // Ensure constraints is not null or undefined
            dragElastic={0.2} // Smooth movement
        >
            <div className="title-bar">
                <div className="title-bar-text">Welcome!</div>
                <div className="title-bar-controls">
                    <button aria-label="Minimize"></button>
                    <button aria-label="Maximize"></button>
                    <button aria-label="Close"></button>
                </div>
            </div>
            <div className="window-body has-space max-w-[500px] space-y-2.5">
                <p className="pt-1">Hello! My name is Emil Vento. On the internet, I usually go by Lime.</p>
                <p></p>
                <p>
                    I am a first-year student at Careeria Vocational School studying Programming. I am interested in Game development and Web development.
                    I can make games in Unity and build simple websites.
                </p>
                <p></p>
                <p>
                    Click "About Me!" to learn more about me and the reason why this website looks awesome!
                    Also check "Projects" so that you get an idea of what I can do!
                </p>
                <p>This website is currently under construction!</p>
            </div>
        </motion.div>
    );
}
