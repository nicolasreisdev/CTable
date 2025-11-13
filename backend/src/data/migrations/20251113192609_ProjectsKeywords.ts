import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('ProjectsKeywords', (table) => {
    table.integer('projectID').unsigned();
    table.integer('keywordID').unsigned();

    table.foreign('projectID')
         .references('projectID')
         .inTable('Projects');
    table.foreign('keywordID')
         .references('keywordID')
         .inTable('Keywords');

    table.primary(['projectID', 'keywordID']);
    
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('ProjectsKeywords');
}