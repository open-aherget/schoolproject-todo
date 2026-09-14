import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './styles/theme.css';

/**
 * Mounts the React application into the application root element.
 */
function mountApplication() {
    const rootElement = document.getElementById('react-root');

    if (!rootElement) {
        return;
    }

    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountApplication);
} else {
    mountApplication();
}