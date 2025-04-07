import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
      // Check for production environment flag
      const isProd = config.env.environment === 'production';
      
      if (isProd) {
        config.baseUrl = 'https://task-manager-sigma-self.vercel.app';
      }
      
      return config;
    },
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },

  env: {
    // Define environments that can be used with --env flag
    // e.g., cypress run --env environment=production
    environment: 'development',
  },
}); 