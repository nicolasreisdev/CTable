import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('ProjectCommunities', (table) => {
    table.integer('projectID').unsigned();
    table.integer('communityID').unsigned();
    
    table.timestamp('associatedAt').defaultTo(knex.fn.now());

    // Chaves Estrangeiras
    table.foreign('projectID')
         .references('projectID')
         .inTable('Projects')
         .onDelete('CASCADE');

    table.foreign('communityID')
         .references('communityID')
         .inTable('Communities')
         .onDelete('CASCADE');

    // Chave Primária Composta (Um projeto não pode ser linkado duas vezes na mesma comunidade)
    table.primary(['projectID', 'communityID']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('ProjectCommunities');
}