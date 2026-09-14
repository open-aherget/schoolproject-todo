import React from 'react';
import styles from './TodoItem.module.css';

/**
 * TodoItem component rendering a single task row.
 *
 * @param {Object} props
 * @param {Object} props.todo
 * @param {Function} props.onToggle
 */
export default function TodoItem({ todo, onToggle }) {
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
        </li>
    );
}