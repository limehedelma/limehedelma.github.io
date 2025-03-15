"use client";
import React from "react";
import Image from "next/image";
import {AnimatePresence, motion} from "framer-motion";
import { useRef, useState } from "react";
import "7.css/dist/7.css";

export default function Mainpage() {
    const constraintsRef = useRef(null);
    const [hasMoved, setHasMoved] = useState(false);

    return (
        <div ref={constraintsRef} className="relative w-full h-screen">

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
                    <div className="relative">
                        <motion.div
                            className="mt-6 window glass active z-20"
                            drag
                            dragConstraints={constraintsRef}
                            onDragStart={() => setHasMoved(true)}
                        >
                            <div className="title-bar">
                                <div className="title-bar-text">Welcome!</div>
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
                                <div className="flex justify-between">
                                    <button>About me!</button>
                                    <button>Contact Me!</button>
                                    <button>My Projects!</button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Tooltip with Windows 7 Style */}
                        <AnimatePresence>
                            {!hasMoved && (
                                <motion.div
                                    role="tooltip"
                                    className="mt-5 ml-6"
                                    initial={{ opacity: 0, y: 0, scale: 1 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        transition: { duration: 0.3, ease: "easeOut", delay: 1 }, // Delay only for animate
                                    }}
                                    exit={{
                                        opacity: 0,
                                        transition: { duration: 0.3, ease: "easeOut" }, // No delay on exit
                                    }}
                                >
                                    This window is draggable, try it!
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
        </div>
    );
}


