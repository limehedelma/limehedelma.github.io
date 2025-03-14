"use client";
import Image from "next/image";
import Window from "./components/window";
import Footer from "./components/footer";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function Home() {
    // Create a ref for the container
    const constraintsRef = useRef(null);

    return (
        <div ref={constraintsRef} className="relative w-full h-screen ">
            <Window title="Home">
                <div className="pt-32"></div>
                <div className="flex flex-col items-center">
                    <div className="relative w-[190px] h-[190px] group">
                        <Image
                            className="absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0"
                            src="/win7framelime.png"
                            alt="lime"
                            width={190}
                            height={190}
                        />
                        <Image
                            className="absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                            src="/emil.png"
                            alt="emil"
                            width={190}
                            height={190}
                        />
                    </div>
                    <p className="username">Emil Vento</p>

                    {/* Draggable Window */}
                    <motion.div
                        className="mt-6 window glass active z-20"
                        drag
                        dragConstraints={constraintsRef} // Use the container as constraints
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
                            <p className="pt-1">
                                Hello! My name is Emil Vento. On the internet, I usually go by Lime.
                            </p>
                            <p>
                                I am a first-year student at Careeria Vocational School studying Programming. I am interested in Game development and Web development.
                                I can make games in Unity and build simple websites.
                            </p>
                            <p>
                                Click "About Me!" to learn more about me and the reason why this website looks awesome!
                                Also check "Projects" so that you get an idea of what I can do!
                            </p>
                            <p>This website is currently under construction!</p>
                        </div>
                    </motion.div>
                </div>
            </Window>
            <Footer />
        </div>
    );
}
