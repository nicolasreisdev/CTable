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
        { tag: "PHP"},
        { tag: "Machine Learning"},
        { tag: "AI"},
        { tag: "PostgreSQL"},
        { tag: "Go"},
        { tag: "Elixir"},
        { tag: "C++"},
        { tag: "C#"},
        { tag: "C"},
        { tag: "CNN"},
        { tag: "Data Structure"},
        { tag: "OOP"},
        { tag: "Jupyter Notebook"},
        { tag: "NLP"},
        { tag: "Parallel Programming"},
        { tag: "Competitive Programming"},
        { tag: "GPU" },
        { tag: "Cyber Secutiry"},
        { tag: "Computer Vision"},
        { tag: "Software Engineering"},
        { tag: "COBOL"},
        { tag: "Ruby"},
        { tag: "Gurobi"},
        { tag: "Scikit-Learn"},
        { tag: "Data Sciense"},
        { tag: "HTML" },
        { tag: "CSS" }
    ]);
};