import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Keywords', (table) => {
    table.increments('keywordID').primary();
    table.string('tag', 255).unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Keywords');
}