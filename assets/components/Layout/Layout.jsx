import React, { useState } from 'react';
import Header from '../Header/Header';
import LeftSidebar from '../LeftSidebar/LeftSidebar';
import RightSidebar from '../RightSidebar/RightSidebar';
import Toast from '../Toast/Toast';
import styles from './Layout.module.css';

/**
 * Layout component orchestrating header, sidebars, backdrop, toast container, and main content.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export default function Layout({ children }) {
    const [isLeftOpen, setIsLeftOpen] = useState(false);
    const [isRightOpen, setIsRightOpen] = useState(false);

    /**
     * Toggles left sidebar visibility.
     */
    const toggleLeft = () => {
        setIsLeftOpen(prev => !prev);
    };

    /**
     * Toggles right sidebar visibility.
     */
    const toggleRight = () => {
        setIsRightOpen(prev => !prev);
    };

    /**
     * Closes both left and right sidebars.
     */
    const closeAll = () => {
        setIsLeftOpen(false);
        setIsRightOpen(false);
    };

    return (
        <div className={styles.container}>
            <Header onToggleLeft={toggleLeft} onToggleRight={toggleRight} />
            <LeftSidebar isOpen={isLeftOpen} />
            <RightSidebar isOpen={isRightOpen} />
            <Toast />

            {(isLeftOpen || isRightOpen) && (
                <div className={styles.backdrop} onClick={closeAll} />
            )}

            <main className={`${styles.mainContent} ${isLeftOpen ? styles.shiftLeft : ''} ${isRightOpen ? styles.shiftRight : ''}`}>
                {children}
            </main>
        </div>
    );
}