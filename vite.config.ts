import react from '@vitejs/plugin-react'
import { join } from 'path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr({
            svgrOptions: {
                icon: true,
            },
        }),
    ],
    resolve: {
        alias: {
            '@': join(__dirname, './src'),
            '@assets': join(__dirname, '.src/assets'),
            '@components': join(__dirname, 'src/components'),
            contract: join(__dirname, 'src/contract'),
            components: join(__dirname, 'src/components'),
            '@modules': join(__dirname, 'src/modules'),
            '@layouts': join(__dirname, 'src/layouts'),
            layouts: join(__dirname, 'src/layouts'),
            '@pages': join(__dirname, 'src/pages'),
            pages: join(__dirname, 'src/pages'),
            '@utility': join(__dirname, 'src/utility'),
            utility: join(__dirname, 'src/utility'),
            '@stores': join(__dirname, 'src/stores'),
            '@hooks': join(__dirname, 'src/hooks'),
            hooks: join(__dirname, 'src/hooks'),
            '@enum': join(__dirname, 'src/enum'),
            '@hoc': join(__dirname, 'src/hoc'),
            '@interface': join(__dirname, 'src/interface'),
            '@scss': join(__dirname, 'src/scss'),
        },
    },

    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:1922',
                changeOrigin: true,
                secure: false,
                rewrite: path => path.replace(/^\/api/, ''),
            },
        },

        port: 5173,
        host: '0.0.0.0',
    },
})
