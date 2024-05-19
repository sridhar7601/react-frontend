import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    // This ensures that TypeScript errors don't prevent Vite from emitting the final output.
    loader: 'tsx',
    include: /\.tsx?$/,
    tsconfigRaw: {
      compilerOptions: {
        noEmitOnError: false,
      },
    },
  },
});
