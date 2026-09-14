import React from 'react';
import styles from './Header.module.css';

/**
 * Renders the top navigation header using local CSS module scopes.
 *
 * @param {Object} props
 * @param {Function} props.onToggleLeft
 * @param {Function} props.onToggleRight
 */
export default function Header({ onToggleLeft, onToggleRight }) {
    return (
        <header className={styles.header}>
            <div className={styles.titleGroup}>
                <button
                    onClick={onToggleLeft}
                    aria-label="Toggle Navigation Menu"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontSize: '1.5rem' }}
                >
                    ☰
                </button>
                <h1 className={styles.title}>CustomConnect</h1>
            </div>
            <button
                onClick={onToggleRight}
                className={styles.avatarButton}
                aria-label="Toggle User Profile"
            >
                CC
            </button>
        </header>
    );
}