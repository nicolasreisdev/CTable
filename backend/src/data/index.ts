import knex from 'knex';
import config from '../knexfile'; // Importa seu knexfile.ts da raiz do backend

// Define qual ambiente usar (desenvolvimento por padrão)
const environment = process.env.NODE_ENV ?? 'development';

// Pega a configuração específica para o ambiente
const connectionConfig = config[environment];

// Cria a conexão Knex
const connection = knex(connectionConfig);

// Exporta a conexão para ser usada em outros arquivos
export default connection;