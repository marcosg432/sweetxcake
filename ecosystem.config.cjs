module.exports = {
  apps: [
    {
      name: "sweetxcake",
      cwd: "/var/www/sweetxcake",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3020",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3020,
      },
    },
  ],
};
