import knex from 'knex';
import config from '../knexfile'; 

const environment = process.env.NODE_ENV ?? 'development';

const connectionConfig = config[environment];

const connection = knex(connectionConfig);

export default connection;