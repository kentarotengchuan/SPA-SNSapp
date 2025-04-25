import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: '/',
    publicDir: false,
    build: {
        outDir: './public/dist',
        emptyOutDir: true,
        manifest: true,  
        rollupOptions: {
            input: {
                app: resolve(__dirname, 'index.html'),
                main: resolve(__dirname, 'js/main.js'),
            }
        }
    }
});