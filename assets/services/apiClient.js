/**
 * Central HTTP client service featuring request timeout, error logging, and global event dispatching.
 */
class ApiClient {
    /**
     * @param {boolean} useMock
     * @param {number} timeoutMs
     * @param {string} baseUrl
     */
    constructor(useMock = true, timeoutMs = 8000, baseUrl = '') {
        this.useMock = useMock;
        this.timeoutMs = timeoutMs;
        this.baseUrl = baseUrl;
        this.mockTodos = [
            { id: 1, title: 'HubSpot OAuth Integration vorbereiten', completed: true },
            { id: 2, title: 'Symfony REST API Endpoint für Todos erstellen', completed: false }
        ];
    }

    /**
     * Executes HTTP requests with timeout control and error dispatching.
     *
     * @param {string} endpoint
     * @param {Object} options
     * @returns {Promise<any>}
     */
    async request(endpoint, options = {}) {
        if (this.useMock) {
            return this.handleMockRequest(endpoint, options);
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

        const defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        };

        const config = {
            ...options,
            signal: controller.signal,
            headers: {
                ...defaultHeaders,
                ...options.headers,
            },
        };

        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, config);
            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.message || `HTTP Fehler ${response.status}`;
                this.handleError(errorMessage, response.status);

                const error = new Error(errorMessage);
                error.status = response.status;
                error.data = errorData;
                throw error;
            }

            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                const timeoutMessage = `Zeitüberschreitung der Anfrage nach ${this.timeoutMs}ms.`;
                this.handleError(timeoutMessage, 408);
                throw new Error(timeoutMessage);
            }

            if (!error.status) {
                this.handleError(error.message, 500);
            }
            throw error;
        }
    }

    /**
     * Logs error to console and dispatches custom error event for toast UI.
     *
     * @param {string} message
     * @param {number} status
     */
    handleError(message, status) {
        console.error(`[ApiClient Error ${status}]:`, message);

        window.dispatchEvent(new CustomEvent('app:api-error', {
            detail: { message, status }
        }));
    }

    /**
     * Simulates backend responses and random errors for mock mode.
     *
     * @param {string} endpoint
     * @param {Object} options
     * @returns {Promise<any>}
     */
    async handleMockRequest(endpoint, options) {
        await new Promise((resolve) => setTimeout(resolve, 600));

        const method = (options.method || 'GET').toUpperCase();

        if (endpoint === '/api/todos') {
            if (method === 'GET') {
                return [...this.mockTodos];
            }

            if (method === 'POST') {
                const body = JSON.parse(options.body || '{}');

                if (!body.title || body.title.trim() === '') {
                    const errorMsg = 'Titel darf nicht leer sein.';
                    this.handleError(errorMsg, 400);
                    const error = new Error(errorMsg);
                    error.status = 400;
                    throw error;
                }

                const newTodo = {
                    id: Date.now(),
                    title: body.title.trim(),
                    completed: false
                };

                this.mockTodos.push(newTodo);
                return newTodo;
            }
        }

        const notFoundMsg = `Mock-Endpunkt ${endpoint} nicht gefunden.`;
        this.handleError(notFoundMsg, 404);
        const error = new Error(notFoundMsg);
        error.status = 404;
        throw error;
    }

    /**
     * Sends a GET request.
     *
     * @param {string} endpoint
     * @param {Object} headers
     * @returns {Promise<any>}
     */
    async get(endpoint, headers = {}) {
        return this.request(endpoint, {
            method: 'GET',
            headers,
        });
    }

    /**
     * Sends a POST request.
     *
     * @param {string} endpoint
     * @param {Object} data
     * @param {Object} headers
     * @returns {Promise<any>}
     */
    async post(endpoint, data, headers = {}) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            headers,
        });
    }
}

export const apiClient = new ApiClient(import.meta.env.VITE_USE_MOCK !== 'false', 8000);