import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactIframe',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: (id) => {
        return id === 'react' || id === 'react-dom' || id === 'react/jsx-runtime' || id.startsWith('react/');
      },
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
    minify: 'esbuild',
    sourcemap: false,
  },
});
