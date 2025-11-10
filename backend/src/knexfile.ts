// backend/src/knexfile.ts
// (Este arquivo está DENTRO da pasta 'src')

import path from 'path';
import { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      // CORREÇÃO AQUI: Voltamos a usar __dirname
      filename: path.resolve(__dirname, 'data', 'database.db')
    },
    migrations: {
      // CORREÇÃO AQUI: Voltamos a usar __dirname
      directory: path.resolve(__dirname, 'data', 'migrations')
    },
    seeds: {
      // CORREÇÃO AQUI: Voltamos a usar __dirname
      directory: path.resolve(__dirname, 'data', 'seeds')
    },
    useNullAsDefault: true,
  },

  production: {
    // ...
  }
};

export default config;