import path from 'path';

import { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3', // inicialmente sqlite e posteriormente migrar para postgree
    connection: {
      filename: path.resolve(__dirname, 'src', 'data', 'database.db')
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'data', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'data', 'seeds')
    },
    useNullAsDefault: true,
  },

  // Você pode adicionar outras configurações para produção aqui
  production: {
    // Exemplo para PostgreSQL em produção
    // client: 'pg',
    // connection: process.env.DATABASE_URL,
    // migrations: {
    //   directory: path.resolve(__dirname, 'src', 'data', 'migrations')
    // }
  }
};

export default config;