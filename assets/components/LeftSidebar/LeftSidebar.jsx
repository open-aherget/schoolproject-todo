import React from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './LeftSidebar.module.css';

/**
 * Left navigation sidebar component.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen
 */
export default function LeftSidebar({ isOpen }) {
    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <div className={styles.content}>
                <h3 className={styles.heading}>Navigation</h3>
                <div className={styles.section}>
                    <p className={styles.label}>Farbdesign wählen:</p>
                    <ThemeToggle />
                </div>
            </div>
        </aside>
    );
}