import path from 'path';
import { Knex } from 'knex';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env') }); 

const config: { [key: string]: Knex.Config } = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(process.cwd(), 'src', 'data', 'database.db')
    },
    migrations: {
      directory: path.resolve(process.cwd(), 'src', 'data', 'migrations')
    },
    seeds: {
      directory: path.resolve(process.cwd(), 'src', 'data', 'seeds')
    },
    useNullAsDefault: true,
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    migrations: {
      directory: path.resolve(process.cwd(), 'src', 'data', 'migrations')
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'pg', 
    connection: process.env.DATABASE_URL, 
    migrations: {
      directory: path.resolve(__dirname, 'data', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'data', 'seeds')
    },
  }
};

export default config;