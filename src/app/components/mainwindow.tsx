import React from 'react';
import "7.css/dist/7.css";
import {motion} from "framer-motion";
interface WindowProps {
    title: string;
    children: React.ReactNode;
}
{/* Sivun rakenne*/}
export default function Mainwindow({ title, children }: WindowProps) {
    return (
        <div className="window active">
            <div className="title-bar">
                <div className="title-bar-text">{title}</div>
            </div>
            <div className="menu">
                <ul role="menubar">
                    <li role="menuitem" tabIndex={0}><a href="/">Home</a></li>
                    <li role="menuitem" tabIndex={0}><a href="/About">About me!</a></li>
                    <li role="menuitem" tabIndex={0}><a href="/Projects">Projects</a></li>
                    <li role="menuitem" tabIndex={0}><a href="/Contact">Contact me!</a></li>
                </ul>
            </div>
            <div className="window-body has-space min-h-screen" style={{ backgroundImage: 'url("bg.jpg")', backgroundSize: 'cover' }}>
                {children}
            </div>
            <div className="py-4 px-4 md:px-8 w-full flex flex-col items-center justify-between">
                <div className="flex space-x-6 items-center mt-4 md:mt-0 justify-end">
                    <motion.a
                        href="https://github.com/limehedelma"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                    >
                        <img src="github-icon.svg" alt="GitHub" width="25" />
                    </motion.a>

                    <motion.a
                        href="mailto:lime.vento@outlook.com"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                    >
                        <img src="email-icon.svg" alt="Email" width="25" />
                    </motion.a>

                    <motion.a
                        href="http://discord.com/users/534676989198729217"
                        aria-label="Discord"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                    >
                        <img src="discord-icon.svg" alt="Discord" width="25" />
                    </motion.a>
                </div>
            </div>
        </div>
    );
}


