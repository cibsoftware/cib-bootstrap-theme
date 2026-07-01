import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'lcov', 'cobertura'], // 'text', 'html', 'lcov', 'cobertura'
      reportsDirectory: './target/coverage',
      exclude: [
        // Build artifacts and minified files
        'node_modules/**',
        'coverage/**',

        // Test and config files
        'vite.config.js', // Exclude Vite config
        'vitest.config.js', // Exclude this config file itself
        '**/*.config.js', // Exclude all config files
      ],
    },
  },
});
