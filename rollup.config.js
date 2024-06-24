import ts from 'rollup-plugin-typescript2'
import terser from '@rollup/plugin-terser'

import pkg from './package.json' assert { type: 'json' }

const banner =
    '/*!' +
    '\n * api-render-vue v' +
    pkg.version +
    '\n * ' +
    pkg.description +
    '\n * Copyright (c)' +
    ' jl15988(https://github.com/jl15988).' +
    '\n * This source code is licensed under the MIT license(https://github.com/jl15988/api-render-vue/blob/master/LICENSE).' +
    '\n */'
const sourcemap = false

function createEntry(options) {
    const config = {
        input: 'src/index.ts',
        external: ['vue'],
        output: {
            name: 'apiRenderVue',
            file: options.file,
            format: options.format === 'types' ? 'es' : options.format,
            exports: 'auto',
            globals: {
                vue: 'Vue'
            },
            banner,
        },
        plugins: [
            ts({
                check: options.format === 'types',
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: options.format === 'types',
                    },
                    exclude: ['src', 'example'],
                }
            }),
        ],
    }

    if (Array.isArray(options.plugins)) {
        config.plugins.push(...options.plugins)
    }

    return config
}

const browserPlugins = [
    terser({
        format: {
            comments: function (node, comment) {
                const { value, type } = comment
                return type === 'comment2' && /^!/.test(value)
            },
        },
        compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            drop_console: true,
        },
    }),
]

export default [
    createEntry({ format: 'cjs', file: pkg.common }),
    createEntry({ format: 'es', file: pkg.module }),
    createEntry({ format: 'umd', file: pkg.browser, }),
    createEntry({ format: 'umd', file: pkg.unpkg, plugins: browserPlugins }),
    createEntry({ format: 'types', file: pkg.types }),
]
