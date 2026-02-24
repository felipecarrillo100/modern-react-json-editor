import { defineConfig } from 'tsup';
import { sassPlugin } from 'esbuild-sass-plugin';
import path from 'path';

export default defineConfig({
    entry: [
        'src/index.ts',
        'src/index.scss',     // Your main CSS
        'src/dark.scss'       // 👈 Add this as a separate entry point
    ],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    minify: true,
    target: 'esnext',
    // Peer dependencies stay out, but we let tsup resolve the editor's assets
    external: ['react', 'react-dom'],
    esbuildPlugins: [
        sassPlugin({
            type: 'css',
            // The Author's pattern: ensure SASS knows where to look for themes
            loadPaths: [
                path.resolve(__dirname, 'node_modules'),
            ],
        }),
    ],
});
