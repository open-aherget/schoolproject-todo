import React from 'react';
import styles from './TodoItem.module.css';

/**
 * TodoItem component rendering a single task row with multiline support and delete action.
 *
 * @param {Object} props
 * @param {Object} props.todo
 * @param {Function} props.onToggle
 * @param {Function} props.onDelete
 */
export default function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <li className={`${styles.item} ${todo.completed ? styles.completedItem : ''}`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className={styles.checkbox}
            />
            <span className={`${styles.title} ${todo.completed ? styles.completedTitle : ''}`}>
                {todo.title}
            </span>
            <button
                onClick={() => onDelete(todo.id)}
                className={styles.deleteButton}
                aria-label="Delete Todo"
            >
                Löschen
            </button>
        </li>
    );
}
