
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Comments', (table) => {
    table.increments('commentID').primary();

    table.string('content', 500).notNullable();

    table.timestamp('createdAt').defaultTo(knex.fn.now());

    table.integer('authorID').unsigned().notNullable();
    table.foreign('authorID')
         .references('id')
         .inTable('User')
         .onDelete('CASCADE');

    table.integer('projectID').unsigned().notNullable();
    table.foreign('projectID')
         .references('projectID')
         .inTable('Projects')
         .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Comments');
}