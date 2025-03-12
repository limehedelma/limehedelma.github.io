import React from 'react';

export default function Window(){
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
            <div className="window-body has-space">
                <p>There's so much room for activities!</p>
            </div>
        </div>
    );
}

