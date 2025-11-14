<!-- 
Construir um sistema de ponta a ponta que rastreia fóruns, processa o texto das threads, agrupa-as por assunto usando algoritmos de clusterização e apresenta os resultados através de uma API e uma interface web moderna, com um pipeline de implantação automatizado. -->

[Documentação](https://docs.google.com/document/d/1iTnuSeAPAlk2lH9d5DYVGq13rWHw6SjgBQ8Ip_MBxJc/edit?usp=sharing)

## Utilizando Knex para BD

### Criar migration

- No terminal dentro da pasta backend, execute o comando para criar uma migration: npx knex migrate:make tabelaDesejada --migrations-directory src/data/migrations

### Atributos da tabela

- Escreva em código a tabela com seus atributos (use como exemplo a tabela Usuários)

### Rode a migration

- Para criar o arquivo em databse.bd, no terminal, na pasta backend, execute: npx knex migrate:latest --knexfile knexfile.ts


## Realização de testes

### Testes unitários:
- No terminal dentro da pasta backend, execute o comando: npm test

### Cobertura de testes:
- No terminal dentro da pasta backend, execute o comando: npm run test:coverage
- Para verificar a cobertura de testes, entre na pasta backend/src/coverage/lcov-report e abra o arquivo index.html no navegador para melhor análise.
