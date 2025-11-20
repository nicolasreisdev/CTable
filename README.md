<!-- 
Construir um sistema de ponta a ponta que rastreia fóruns, processa o texto das threads, agrupa-as por assunto usando algoritmos de clusterização e apresenta os resultados através de uma API e uma interface web moderna, com um pipeline de implantação automatizado. -->

[Documentação](https://docs.google.com/document/d/1iTnuSeAPAlk2lH9d5DYVGq13rWHw6SjgBQ8Ip_MBxJc/edit?usp=sharing)

## Utilizando Knex para BD

### Inicialmente limpe o Banco

- No terminal dentro da pasta backend, execute o comando: rm data/database.db


### Criar migration

- No terminal dentro da pasta backend, execute o comando para criar uma migration: npx knex migrate:make tabelaDesejada --migrations-directory src/data/migrations

### Atributos da tabela

- Escreva em código a tabela com seus atributos (use como exemplo a tabela Usuários)

### Rode a migration

- Para criar o arquivo em databse.bd, no terminal, na pasta backend, execute: npx knex migrate:latest --knexfile knexfile.ts


## Criar seeds (popular tabelas)

### Crie o arquivo seed

- No terminal dentro da pasta backend, execute o comando para criar um seed: npx knex seed:make nomeTabela --knexfile src/knexfile.ts

### Edite o seed

- Abra o arquivo criado e faça as modificações necessárias.

### Rode o seed

- Após rodar as migrações, dentro da pasta backend execute o comando: npx knex seed:run --knexfile src/knexfile.ts


## Realização de testes

### Testes unitários:
- No terminal dentro da pasta backend, execute o comando: npm test

### Cobertura de testes:
- No terminal dentro da pasta backend, execute o comando: npm run test:coverage
- Para verificar a cobertura de testes, entre na pasta backend/src/coverage/lcov-report e abra o arquivo index.html no navegador para melhor análise.


## Configuração da verificação de code smells:
