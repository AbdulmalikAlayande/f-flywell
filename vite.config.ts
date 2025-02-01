import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';
import path from 'path';


// https://vite.dev/config/
export default defineConfig({
    base: './',
    plugins: [react()],
    server: {
        open: true,
        port: 3000
    },
    build: {
        outDir: 'build',
    },
    resolve: {
        alias: {
            "@src": path.resolve(__dirname, "./src"),
            "@public": path.resolve(__dirname, "./public"),
            "@utils": path.resolve(__dirname, "./src/utils"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            '@components': path.resolve(__dirname, './src/views/components'),
            '@styles': path.resolve(__dirname, './src/styles'),
            '@images': '/src/assets/images',
            // "@api": path.resolve(__dirname, "./src/api"),
            // "@context": path.resolve(__dirname, "./src/context"),
            // "@hooks": path.resolve(__dirname, "./src/hooks"),
            // "@pages": path.resolve(__dirname, "./src/views/pages"),
            // "@routes": path.resolve(__dirname, "./src/routes"),
            
        },
    },
})
