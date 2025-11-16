import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("Keywords").del();

    await knex("Keywords").insert([
        { tag: "React" },
        { tag: "Node.js" },
        { tag: "TypeScript" },
        { tag: "JavaScript" },
        { tag: "Java" },
        { tag: "Python" },
        { tag: "MySQL" },
        { tag: "SQLite" },
        { tag: "HTML" },
        { tag: "CSS" }
    ]);
};