import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Projects', (table) => {
    table.increments('projectID').primary();
    table.string('title', 255).notNullable();
    table.string('description', 2500).notNullable();
    table.string('status');
    table.date('startDate'); 
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt');

    table.integer('creatorID').unsigned();
    table.foreign('creatorID')
         .references('id')
         .inTable('User')
         .onDelete('CASCADE');

  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Projects');
}
