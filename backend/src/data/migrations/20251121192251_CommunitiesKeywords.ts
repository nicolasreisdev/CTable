import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('CommunitiesKeywords', (table) => {
    table.integer('communityID').unsigned();
    table.integer('keywordID').unsigned();

    // Chaves Estrangeiras
    table.foreign('communityID')
         .references('communityID')
         .inTable('Communities')
         .onDelete('CASCADE');

    table.foreign('keywordID')
         .references('keywordID')
         .inTable('Keywords')
         .onDelete('CASCADE');

    // Chave Primária Composta
    table.primary(['communityID', 'keywordID']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('CommunitiesKeywords');
}