module.exports = {
  apps: [
    {
      name: 'backup',
      script: 'node ./dist/index.js backup',
      cron_restart: '0 9 * * *',
      instances: 1,
      autorestart: false,
      watch: './src',
      env: {
        DEBUG: 'backup:*',
      },
    },
  ],
  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
