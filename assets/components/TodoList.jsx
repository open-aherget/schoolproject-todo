import React, { useState } from 'react';
import TodoItem from './TodoItem';
import ThemeToggle from './ThemeToggle';

/**
 * Container component for managing and displaying todos with color scheme support.
 */
export default function TodoList() {
    const [todos, setTodos] = useState([
        { id: 1, title: 'HubSpot OAuth Integration vorbereiten', completed: true },
        { id: 2, title: 'Symfony REST API Endpoint für Todos erstellen', completed: false },
        { id: 3, title: 'React Frontend mit Backend API verknüpfen', completed: false }
    ]);

    /**
     * Toggles the completion state of a specific todo item.
     *
     * @param {number} id
     */
    const handleToggle = (id) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <div style={{
            maxWidth: '520px',
            margin: '40px auto',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            backgroundColor: 'var(--bg-primary)',
            transition: 'background-color 0.2s ease, border-color 0.2s ease'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                backgroundColor: 'var(--brand-primary)',
                color: '#ffffff'
            }}>
                <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>
                    CustomConnect Tasks
                </h2>
                <ThemeToggle />
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
                ))}
            </ul>
        </div>
    );
}