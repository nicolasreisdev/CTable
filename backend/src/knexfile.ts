import path from 'path';
import { Knex } from 'knex';
import 'dotenv/config'; 

const config: { [key: string]: Knex.Config } = {

  development: {
    client: 'sqlite3',
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

  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'data', 'migrations')
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'pg', 
    connection: process.env.DATABASE_URL, 
    migrations: {
      directory: path.resolve(__dirname, 'src', 'data', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'data', 'seeds')
    },
    ssl: { rejectUnauthorized: false } 
  }
};

export default config;