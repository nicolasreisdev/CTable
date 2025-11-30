import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('User', (table) => {
    table.increments('id').primary();
    table.string('fullName', 255).notNullable(); 
    table.string('username', 255).notNullable().unique();
    table.string('email', 255).notNullable().unique();
    table.string('phone');
    table.date('birthDate'); 
    table.string('passwordHash').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('User');
}