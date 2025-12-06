import { useEffect, useRef } from 'react';

export const useKeyboardShortcut = (key, callback, dependencies = []) => {
    const callbackRef = useRef(callback);
    
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);
    
    useEffect(() => {
        const handleKeyDown = (event) => {
            let keyMatches = false;
            
            if (typeof key === 'string') {
                // Simple key match - no modifiers allowed
                if (!event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey) {
                    keyMatches = event.key.toLowerCase() === key.toLowerCase();
                }
            } else if (typeof key === 'object' && key.key) {
                const keyLower = event.key.toLowerCase();
                const targetKeyLower = key.key.toLowerCase();
                
                keyMatches = keyLower === targetKeyLower;
                
                // Check required modifiers
                if (key.ctrl && !event.ctrlKey) keyMatches = false;
                if (key.shift && !event.shiftKey) keyMatches = false;
                if (key.alt && !event.altKey) keyMatches = false;
                if (key.meta && !event.metaKey) keyMatches = false;
                
                // Ensure no other modifiers are pressed
                if (keyMatches && (key.ctrl || key.shift || key.alt || key.meta)) {
                    const hasOtherModifiers = 
                        (key.ctrl ? false : event.ctrlKey) ||
                        (key.shift ? false : event.shiftKey) ||
                        (key.alt ? false : event.altKey) ||
                        (key.meta ? false : event.metaKey);
                    if (hasOtherModifiers) keyMatches = false;
                }
            }
            
            if (keyMatches) {
                const target = event.target;
                const isInput = target.tagName === 'INPUT' || 
                               target.tagName === 'TEXTAREA';
                
                // Allow shortcuts in contenteditable (rich editor)
                if (isInput && !target.isContentEditable) {
                    return;
                }
                
                event.preventDefault();
                event.stopPropagation();
                callbackRef.current(event);
            }
        };
        
        window.addEventListener('keydown', handleKeyDown, true);
        return () => window.removeEventListener('keydown', handleKeyDown, true);
    }, [key, ...dependencies]);
};

export default useKeyboardShortcut;

