import React from 'react';
import './RedRiverGorge.css';

export const RedRiverGorge = () => {
    return (
        <div className="outerSvgHeader">
            <svg viewBox="0 0 100 16" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <rect id="rrg_title_rect" x="1" y="1" width="82" height="14"
                fill="none"/>
                <text id="rrgTitleText" x="3" y="12" textLength="80" lengthAdjust="spacingAndGlyphs">Red River Gorge</text>
                <rect id="emoji_title_rect" x="86" y="3" width="10" height="9"
                fill="none"/>
                <text id="emojiTitleText" x="86" y="10" textLength="10" lengthAdjust="spacingAndGlyphs">🧗</text>
            </svg>
        </div>
    )
}