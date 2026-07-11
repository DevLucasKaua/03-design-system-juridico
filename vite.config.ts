import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// Build de biblioteca: JS em ESM (externalizando React) + um único CSS
// (dist/lex-ui.css) com tokens e estilos de todos os componentes.
// O preset Tailwind sai como entry separado para não arrastar componentes.
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        'lex-ui': fileURLToPath(new URL('./src/index.ts', import.meta.url)),
        'tokens/tailwind-preset': fileURLToPath(
          new URL('./src/tokens/tailwind-preset.ts', import.meta.url),
        ),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'react-dom/client'],
      output: {
        assetFileNames: 'lex-ui.[ext]',
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
  test: {
    // globals habilita o afterEach que o Testing Library usa p/ auto-cleanup
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.tsx'],
  },
});
