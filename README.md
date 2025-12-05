<!-- 
Construir um sistema de ponta a ponta que rastreia fóruns, processa o texto das threads, agrupa-as por assunto usando algoritmos de clusterização e apresenta os resultados através de uma API e uma interface web moderna, com um pipeline de implantação automatizado. -->

## Arquitetura

Utilizamos uma arquitetura monorepo separa em dois módulos, sendo eles backend e frontend.

### Frontend

- Para o frontend, foi utilizado o framework React em conjunto com Vite para sua configuração.

### Backend

- Para o backend, foi utilizado o framework Node.js e Express para sua configuração.


## Utilizando Knex para BD

- O projeto utiliza **Knex.js** como Query Builder para gerenciar a comunicação com o banco de dados. Esta escolha foi feita para permitir uma **estratégia de banco híbrida**, maximizando a produtividade no desenvolvimento e a performance em produção.

### Ambientes
- **Desenvolvimento (SQLite):** Utilizamos SQLite localmente pela sua simplicidade. O banco reside em um arquivo local, facilitando testes e debugs.

- **Produção (PostgreSQL):** Utilizamos PostgreSQL (hospedado na Neon) para o deploy. Ele oferece a robustez, concorrência e segurança necessárias para uma aplicação real, além de tipos de dados mais rigorosos.

- **Hospedagem (Neon):** Escolhemos o serviço da [Neon](https://neon.com/) para hospedar o banco de produção na nuvem, de modo que as consultas e a persistência dos dados sejam gerenciadas de forma escalável e independente, alinhando-se perfeitamente à arquitetura serverless do backend na Vercel.

### Inicialmente limpe o Banco

- No terminal dentro da pasta **backend**, execute o comando: `rm data/database.db`


### Criar migration

- No terminal dentro da pasta **backend**, execute o comando para criar uma migration: `npx knex migrate:make tabelaDesejada --migrations-directory src/data/migrations`

### Atributos da tabela

- Escreva em código a tabela com seus atributos (use como exemplo a tabela Usuários)

### Rode a migration

- Para criar o arquivo em databse.bd, no terminal, na pasta **backend/src**, execute: `npx knex migrate:latest --knexfile knexfile.ts`


## Criar seeds (popular tabelas)

### Crie o arquivo seed

- No terminal dentro da pasta **backend**, execute o comando para criar um seed: `npx knex seed:make nomeTabela --knexfile src/knexfile.ts`

### Edite o seed

- Abra o arquivo criado e faça as modificações necessárias.

### Rode o seed

- Após rodar as migrações, dentro da pasta **backend** execute o comando: `npx knex seed:run --knexfile src/knexfile.ts`


## Realização de testes 

### Backend
- Para o backend foram utilizadas as bibliotecas **Jest** ( para rodar os testes ) e **Supertest** ( para simular as requisições HTTP para a API ).

### Frontend
- Para o frontend, como o ambiente é composto por **Vite**, foi utilizado a biblioteca **Vitest** que é compatível com o **Jest** ( para rpdar os testes ), **React Testing Library** ( para renderizar componentes ) e **Happy-DOM** ( para simular o navegador ). 

### Testes unitários:
- No terminal dentro da pasta **backend** ou **frontend**, execute o comando: `npm test`

### Cobertura de testes:
- No terminal dentro da pasta **backend**, execute o comando: `npm run test:coverage`

- Para verificar a cobertura de testes, entre na pasta **backend/src/coverage/lcov-report** e abra o arquivo index.html no navegador para melhor análise.

- No terminal dentro da pasta **frontend**, execute o comando: `npm run test:coverage`

- Para verificar a cobertura de testes, entre na pasta **frontend/coverage** e abra o arquivo index.html no navegador para melhor análise.

## Qualidade de Código

Para garantir a manutenibilidade e segurança do projeto, utilizamos a plataforma **[Qlty.sh](https://qlty.sh/)** integrada ao nosso pipeline de CI/CD (GitHub Actions).

A ferramenta realiza uma análise em todo o monorepo (Frontend e Backend) a cada *push* ou *pull request*, verificando:

* **Linting e Padrões:** Verifica se o código segue as melhores práticas de TypeScript/React e Node.js.
* **Segurança:** Detecta segredos expostos (chaves de API, senhas) e vulnerabilidades em dependências.
* **Code smells:** Identifica funções complexas, código duplicado e outros code smells que dificultam a manutenção.

### Gestão Automática de Dívida Técnica
Nosso pipeline possui um script personalizado que processa os relatórios gerados pela Qlty. Se um "Code Smell" ou vulnerabilidade for encontrado, o sistema **cria automaticamente uma Issue no GitHub** com a tag `technical-debt`, contendo:
* O arquivo e a linha do problema.
* A regra violada.
* A sugestão de correção.


## Deploy e Infraestrutura

A aplicação utiliza uma arquitetura **Serverless** moderna, hospedada inteiramente na nuvem para garantir escalabilidade e alta disponibilidade.

### Arquitetura de Hospedagem (Vercel)
O projeto está estruturado como um **Monorepo**, mas o deploy é realizado em dois serviços distintos dentro da [Vercel](https://vercel.com/):

1.  **Backend (API Serverless):**
    * Hospedado como *Serverless Functions* utilizando o runtime do Node.js.
    * Ponto de entrada configurado via `vercel.json` para redirecionar tráfego para `api/index.ts`.
    * Gerencia a conexão com o banco de dados e regras de negócio.

2.  **Frontend (SPA React):**
    * Hospedado como site estático otimizado.
    * Comunica-se com o Backend através da variável de ambiente `VITE_API_URL`.

### Pipeline de CI/CD (GitHub Actions)
O deploy é totalmente automatizado via **GitHub Actions**. O fluxo de entrega contínua funciona da seguinte maneira:

1.  **Push na Main:** Ao aprovar um Pull Request para a branch `main`.
2.  **Testes e Qualidade:** O pipeline executa os testes automatizados (Backend e Frontend) e a análise de qualidade (Qlty).
3.  **Migração de Banco de Dados:** O GitHub Actions conecta-se ao banco de produção (Neon) e executa as `migrations` do Knex para garantir que a estrutura das tabelas esteja atualizada.
4.  **Deploy Vercel:** A Vercel detecta a alteração, realiza o build do Backend e do Frontend separadamente e publica a nova versão.

### Variáveis de Ambiente Necessárias
Para rodar este projeto em produção (ou localmente conectado à nuvem), as seguintes variáveis são necessárias:

**Backend:**
- `DATABASE_URL`: String de conexão do PostgreSQL (Neon).
- `TOKEN_SECRET`: Chave secreta para assinatura de tokens JWT.

**Frontend:**
- `VITE_API_URL`: URL onde o backend está hospedado (ex: `https://seu-backend.vercel.app`).

