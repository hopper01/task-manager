/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    include: ['**/*.test.{ts,tsx}'],
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'src/setupTests.ts']
    }
  }
}); 