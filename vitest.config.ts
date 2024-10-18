import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        'src/env',
        'src/http',
        'src/lib',
        'src/repositories/prisma',
        'node_modules',
        'build',
        'coverage',
        '*.json',
        'src/*.ts',
        '*.config.ts',
      ],
    },
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
  },
  plugins: [tsconfigPaths()],
})
