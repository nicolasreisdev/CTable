import path from 'path';
import { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'data', 'database.db')
    },
    migrations: {
      directory: path.resolve(__dirname, 'data', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'data', 'seeds')
    },
    useNullAsDefault: true,
  },

  production: {
    // ...
  }
};

export default config;