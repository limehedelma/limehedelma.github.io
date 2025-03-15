import React from 'react';
import "7.css/dist/7.css";
interface WindowProps {
    title: string;
    children: React.ReactNode;
}

export default function Window({ title, children }: WindowProps) {
    return (
        <div className="window active">
            <div className="title-bar">
                <div className="title-bar-text">{title}</div>
            </div>
            <div className="menu">
                <ul role="menubar">
                    <li role="menuitem" tabIndex={0}>Home</li>
                    <li role="menuitem" tabIndex={0}>About Me</li>
                    <li role="menuitem" tabIndex={0}>Projects</li>
                    <li role="menuitem" tabIndex={0}>Contact Me!</li>
                </ul>
            </div>
            <div className="window-body has-space min-h-screen" style={{ backgroundImage: 'url("bg.jpg")', backgroundSize: 'cover' }}>
                {children}
            </div>
        </div>
    );
}


