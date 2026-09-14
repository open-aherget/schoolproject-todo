import React from 'react';
import Layout from './Layout/Layout';
import TodoList from './TodoList/TodoList';
import '../styles/theme.css';

/**
 * Root application component.
 */
export default function App() {
    return (
        <Layout>
            <TodoList />
        </Layout>
    );
}