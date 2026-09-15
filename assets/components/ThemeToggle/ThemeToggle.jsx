import React, { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';

/**
 * Toggles application theme between system, dark, and light modes.
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
     * Cycles through the available theme states.
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
        <button onClick={toggleTheme} className={styles.button}>
            Mode: {theme.toUpperCase()}
        </button>
    );
}