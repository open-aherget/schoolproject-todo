import React, { useState } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';

/**
 * Container component managing todo state and rendering the list.
 */
export default function TodoList() {
    const [todos, setTodos] = useState([
        { id: 1, title: 'HubSpot OAuth Integration vorbereiten', completed: true },
        { id: 2, title: 'Symfony REST API Endpoint für Todos erstellen', completed: false },
        { id: 3, title: 'React Frontend mit Backend API verknüpfen', completed: false }
    ]);

    /**
     * Toggles task completion state.
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
        <div className={styles.container}>
            <h2 className={styles.header}>
                CustomConnect Tasks
            </h2>
            <ul className={styles.list}>
                {todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
                ))}
            </ul>
        </div>
    );
}