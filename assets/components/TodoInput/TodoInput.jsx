import React, { useState, useRef, useEffect } from 'react';
import styles from './TodoInput.module.css';

/**
 * Renders a full-width auto-resizing input component with single-line baseline.
 *
 * @param {Object} props
 * @param {Function} props.onAdd
 * @param {boolean} props.isAdding
 */
export default function TodoInput({ onAdd, isAdding }) {
    const [text, setText] = useState('');
    const textareaRef = useRef(null);

    /**
     * Recalculates component height on value changes to enforce single-line baseline.
     */
    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = '38px';
            if (textarea.scrollHeight > 38) {
                textarea.style.height = `${textarea.scrollHeight}px`;
                textarea.style.overflowY = textarea.scrollHeight > 200 ? 'auto' : 'hidden';
            }
        }
    };

    useEffect(() => {
        adjustHeight();
    }, [text]);

    /**
     * Triggers the addition callback and resets local state.
     */
    const handleSubmit = () => {
        if (text.trim() === '') {
            return;
        }
        onAdd(text.trim());
        setText('');
    };

    /**
     * Handles keyboard shortcuts for submission and multiline inputs.
     *
     * @param {KeyboardEvent} e
     */
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    /**
     * Updates text state from change events.
     *
     * @param {ChangeEvent<HTMLTextAreaElement>} e
     */
    const handleChange = (e) => {
        setText(e.target.value);
    };

    return (
        <div className={styles.container}>
            <textarea
                ref={textareaRef}
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Neues ToDo..."
                disabled={isAdding}
                className={styles.textarea}
                rows={1}
            />
            <button
                onClick={handleSubmit}
                disabled={isAdding || text.trim() === ''}
                className={styles.button}
            >
                {isAdding ? 'Lädt...' : 'Hinzufügen'}
            </button>
        </div>
    );
}