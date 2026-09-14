import React from 'react';

/**
 * Renders an individual todo item row with theme-aware styling.
 *
 * @param {Object} props
 * @param {Object} props.todo
 * @param {Function} props.onToggle
 */
export default function TodoItem({ todo, onToggle }) {
    return (
        <li style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            borderBottom: '1px solid var(--border-color)',
            backgroundColor: todo.completed ? 'var(--bg-secondary)' : 'var(--bg-primary)',
            transition: 'background-color 0.2s ease'
        }}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                style={{ marginRight: '12px', cursor: 'pointer', width: '16px', height: '16px' }}
            />
            <span style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? 'var(--text-muted)' : 'var(--text-primary)',
                fontSize: '0.95rem'
            }}>
                {todo.title}
            </span>
        </li>
    );
}