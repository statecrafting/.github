import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', testMatch: 'site.spec.ts', fullyParallel: true,
  use: { baseURL: 'http://127.0.0.1:4173', browserName: 'chromium', trace: 'retain-on-failure' },
  webServer: { command: 'npm run preview', url: 'http://127.0.0.1:4173', reuseExistingServer: !process.env.CI },
  reporter: 'list',
});
