import React, { useState, useEffect } from 'react';

const KeyboardHint = ({ shortcut, children, className = '', style = {}, position = 'top' }) => {
    const [isDesktop, setIsDesktop] = useState(false);
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        const checkDesktop = () => {
            setIsDesktop(window.innerWidth >= 768);
        };
        
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    const formatShortcut = (shortcut) => {
        if (!shortcut) return '';
        
        if (typeof shortcut === 'string') {
            return shortcut.toUpperCase();
        }
        
        if (typeof shortcut === 'object') {
            const parts = [];
            if (shortcut.ctrl) parts.push('Ctrl');
            if (shortcut.meta) parts.push('Cmd');
            if (shortcut.alt) parts.push('Alt');
            if (shortcut.shift) parts.push('Shift');
            if (shortcut.key) {
                const key = shortcut.key.toUpperCase();
                if (key === ' ') parts.push('Space');
                else if (key === 'ARROWUP') parts.push('↑');
                else if (key === 'ARROWDOWN') parts.push('↓');
                else if (key === 'ARROWLEFT') parts.push('←');
                else if (key === 'ARROWRIGHT') parts.push('→');
                else if (key === 'ENTER') parts.push('Enter');
                else if (key === 'ESCAPE') parts.push('Esc');
                else if (key === 'DELETE') parts.push('Del');
                else if (key === 'BACKSPACE') parts.push('Backspace');
                else parts.push(key);
            }
            return parts.join(' + ');
        }
        
        return '';
    };

    if (!isDesktop || !shortcut) {
        return <>{children}</>;
    }

    return (
        <div
            className={`keyboard-hint-wrapper ${className}`}
            style={{ position: 'relative', display: 'inline-block', ...style }}
            onMouseEnter={() => setShowHint(true)}
            onMouseLeave={() => setShowHint(false)}
        >
            {children}
            {showHint && (
                <div 
                    className={`keyboard-hint keyboard-hint-${position}`}
                    style={{ zIndex: 10000 }}
                >
                    {formatShortcut(shortcut)}
                </div>
            )}
        </div>
    );
};

export default KeyboardHint;

