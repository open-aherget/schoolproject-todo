import React, { useEffect, useState } from 'react';

/**
 * Toggles the application theme between light, dark, and system modes.
 */
export default function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'system';
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'system') {
            root.removeAttribute('data-theme');
            localStorage.removeItem('theme');
        } else {
            root.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    /**
     * Cycles through available theme options.
     */
    const toggleTheme = () => {
        if (theme === 'system') {
            setTheme('dark');
        } else if (theme === 'dark') {
            setTheme('light');
        } else {
            setTheme('system');
        }
    };

    return (
        <button
            onClick={toggleTheme}
            style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: '500'
            }}
        >
            Mode: {theme.toUpperCase()}
        </button>
    );
}