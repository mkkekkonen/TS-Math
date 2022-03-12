module.exports = {
  apps: [
    {
      name: "mathApi",
      script: "./index.js",
      watch: true,
      ignore_watch: ["db.sqlite", "db.sqlite-journal"],
      cwd: "/home/maija/apps/math-api",
      env: {
        NODE_ENV: 'production',
        DB_ENGINE: 'mysql',
      },
      env_dev: {
        NODE_ENV: 'development',
      },
    },
  ],
}
