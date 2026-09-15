import React, { useState, useEffect } from 'react';
import styles from './Toast.module.css';

/**
 * Toast notification listener component for displaying API error messages.
 */
export default function Toast() {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        /**
         * Handles custom error events dispatched by ApiClient.
         *
         * @param {CustomEvent} event
         */
        const handleApiError = (event) => {
            const id = Date.now();
            const newToast = { id, message: event.detail.message };

            setToasts((prev) => [...prev, newToast]);

            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, 5000);
        };

        window.addEventListener('app:api-error', handleApiError);

        return () => {
            window.removeEventListener('app:api-error', handleApiError);
        };
    }, []);

    /**
     * Dismisses a toast manually.
     *
     * @param {number} id
     */
    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    if (toasts.length === 0) {
        return null;
    }

    return (
        <div className={styles.toastContainer}>
            {toasts.map((toast) => (
                <div key={toast.id} className={styles.toast}>
                    <span>{toast.message}</span>
                    <button onClick={() => removeToast(toast.id)} className={styles.closeButton}>
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
}