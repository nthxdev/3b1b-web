import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'list',

  use: {
    baseURL: 'http://127.0.0.1:5173',
    trace: 'retain-on-failure',
  },

  webServer: {
    command: 'bun run --bun dev --host 127.0.0.1 --strictPort',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
