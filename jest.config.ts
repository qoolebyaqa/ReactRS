import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  dir: './',
})
 
const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  coverageProvider: 'v8',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    "app/**/*.{js,ts,jsx,tsx}",
    "components/**/*.{js,ts,jsx,tsx}"
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "app/[name]/page.tsx",
    "app/page.tsx",
    "app/_app.tsx",  
    "components/Pagination.tsx", 
    "components/someComponent.tsx" 
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'html', 'text']
}

 
export default createJestConfig(config)