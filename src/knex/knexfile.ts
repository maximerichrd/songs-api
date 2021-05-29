require('ts-node/register');

module.exports = {
  client: 'mysql',
  connection: "mysql://user:password@localhost:6606/songs-db",
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: 'migrations'
  },
  timezone: 'UTC'
};