import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    currino: 'src/index.ts',
  },
  splitting: false,
  minify: true,
  clean: true,
  format: ['esm', 'cjs', 'iife'],
  globalName: 'Currino',
});
