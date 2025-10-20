import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('usuarios', (table) => {
    table.increments('id').primary();
    table.string('nome_completo').notNullable();
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('senha_hash').notNullable();
    table.string('telefone');
    table.date('data_nascimento');
    table.timestamp('data_criacao').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('usuarios');
}