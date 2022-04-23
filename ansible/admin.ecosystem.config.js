module.exports = {
  apps: [
    {
      name: "mathAdmin",
      script: "./index.js",
      watch: true,
      cwd: "/home/maija/apps/math-admin",
      env: {
        NODE_ENV: 'production',
      },
      env_dev: {
        NODE_ENV: 'development',
      },
    },
  ],
}
