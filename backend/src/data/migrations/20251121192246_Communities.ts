
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Communities', (table) => {
    table.increments('communityID').primary();
    table.string('name', 255).notNullable().unique();
    table.string('description', 500);
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt');

    // Chave estrangeira para o criador (User)
    table.integer('creatorID').unsigned();
    table.foreign('creatorID')
         .references('id')
         .inTable('User')
         .onDelete('CASCADE'); 
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Communities');
}