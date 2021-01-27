import React from 'react';
import './RedRiverGorge.css';

export const RedRiverGorge = () => {
    return (
        <div className="outerSvgHeader">
            <svg viewBox="0 0 300 20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <rect x="1" y="1" width="298" height="18"
                fill="none" stroke="pink" stroke-width="2"/>
                <text id="rrgTitleText" x="5" y="15" textLength="8em">Red River Gorge</text>
            </svg>
        </div>
    )
}