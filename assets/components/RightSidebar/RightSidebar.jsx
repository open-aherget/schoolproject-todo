import React from 'react';
import styles from './RightSidebar.module.css';

/**
 * Right profile sidebar component.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen
 */
export default function RightSidebar({ isOpen }) {
    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <div className={styles.content}>
                <h3 className={styles.heading}>Benutzerprofil</h3>
                <p className={styles.text}>Eingeloggt als CustomConnect Admin</p>
            </div>
        </aside>
    );
}