import React, { useState, useEffect } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import TodoInput from '../TodoInput/TodoInput';
import { apiClient } from '../../services/apiClient';
import styles from './TodoList.module.css';

/**
 * Container component managing state and API requests.
 */
export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        /**
         * Fetches initial todo items from the API.
         */
        async function loadTodos() {
            try {
                const data = await apiClient.get('/api/todos');
                setTodos(data);
            } catch (error) {
                console.error('Fehler beim Laden der ToDos:', error.message);
            } finally {
                setIsLoading(false);
            }
        }

        loadTodos();
    }, []);

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

    /**
     * Sends a new todo to the API and appends it to state upon success.
     *
     * @param {string} title
     */
    const handleAddTodo = async (title) => {
        setIsAdding(true);

        try {
            const createdTodo = await apiClient.post('/api/todos', { title });
            setTodos(prevTodos => [...prevTodos, createdTodo]);
        } catch (error) {
            console.error('Fehler beim Erstellen:', error.message);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>CustomConnect Tasks</h2>
            <TodoInput onAdd={handleAddTodo} isAdding={isAdding} />

            {isLoading ? (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Lade ToDos...
                </div>
            ) : (
                <ul className={styles.list}>
                    {todos.map(todo => (
                        <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
                    ))}
                </ul>
            )}
        </div>
    );
}