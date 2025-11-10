import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('usuarios', (table) => {
    table.increments('id').primary();
    table.string('nomeCompleto').notNullable(); 
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('telefone');
    table.date('dataNascimento'); 
    table.string('senhaHash').notNullable();
    table.timestamp('dataCriacao').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('usuarios');
}