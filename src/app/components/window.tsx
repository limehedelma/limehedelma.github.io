import React from 'react';

export default function Window({ children }: { children: React.ReactNode }) {
    return (
        <div className="window active">
            <div className="title-bar">
                <div className="title-bar-text">A window with contents</div>
                <div className="title-bar-controls">
                    <button aria-label="Minimize"></button>
                    <button aria-label="Maximize"></button>
                    <button aria-label="Close"></button>
                </div>
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
                {children} {/* This allows content to be inserted */}
            </div>
        </div>
    );
}

