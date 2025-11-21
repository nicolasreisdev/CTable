import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('CommunityMembers', (table) => {
    table.integer('userID').unsigned();
    table.integer('communityID').unsigned();
    
    table.string('role', 255).defaultTo('member'); // ex: 'admin', 'member'
    table.timestamp('joinedAt').defaultTo(knex.fn.now());

    // Chaves Estrangeiras
    table.foreign('userID')
         .references('id')
         .inTable('User')
         .onDelete('CASCADE');

    table.foreign('communityID')
         .references('communityID')
         .inTable('Communities')
         .onDelete('CASCADE');

    // Chave Primária Composta (Um usuário só pode entrar na mesma comunidade uma vez)
    table.primary(['userID', 'communityID']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('CommunityMembers');
}