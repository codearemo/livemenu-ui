import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
      exports: 'named',
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './dist/types',
      outDir: './dist',
      exclude: ['**/*.test.tsx', '**/*.test.ts', '**/*.stories.tsx'],
    }),
    postcss({
      extensions: ['.css'],
      minimize: true,
      inject: false,
      extract: 'styles.css',
      plugins: [
        tailwindcss('./tailwind.config.ts'),
        autoprefixer(),
      ],
    }),
    terser(),
  ],
  external: ['react', 'react-dom'],
};

export default config;
