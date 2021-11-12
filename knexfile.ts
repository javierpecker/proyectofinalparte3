import Config from './src/config'

export default {
  sqlite3: {
    client: 'sqlite3',
    connection: { filename: `${Config.SQLITE3_DBNAME}` },
    useNullAsDefault: true,
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
  },

  mysql: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: `${Config.MYSQL_PASSWORD}`,
      database: `${Config.MYSQL_DBNAME}`,
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
  },
};
