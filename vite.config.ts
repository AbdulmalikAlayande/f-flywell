import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import tailwindcss from '@tailwindcss/vite'



// https://vite.dev/config/
export default defineConfig({
    base: '/',
    plugins: [react(), tailwindcss()],
    server: {
        open: false,
        port: 3000
    },
    build: {
        outDir: 'build',
    },
    css: {
        postcss: './postcss.config.ts',
    },
    resolve: {
        alias: {
            "@src": path.resolve(__dirname, "./src"),
            "@utils": path.resolve(__dirname, "./src/utils"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@routes": path.resolve(__dirname, "./src/routes"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),

            
        },
    },
})
