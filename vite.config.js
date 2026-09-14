import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';
import symfony from "vite-plugin-symfony";

export default defineConfig({
    plugins: [
        react(),
        symfony({
            viteDevServerHostname: 'localhost'
        })
    ],
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true
    },
    build: {
        rollupOptions: {
            input: {
                app: "./assets/app.jsx"
            },
        }
    },
});
