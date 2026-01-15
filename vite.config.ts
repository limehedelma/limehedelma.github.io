import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/limehedelma.github.io/', // GitHub Pages repo name
    plugins: [react()],
});

