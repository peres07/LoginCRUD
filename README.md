# Projeto de Login com React e Express

Este projeto é uma página de login com um CRUD (Create, Read, Update, Delete) com React para o frontend, e Express com Node.js para o backend. O backend faz uma conexão com o banco de dados PostgreSQL, podendo registrar um usuário, logar um usuário, editar email, senha e username.

## Tecnologias utilizadas

- React: biblioteca JavaScript para criar interfaces de usuário
- Express: framework web para Node.js
- Node.js: ambiente de execução JavaScript no servidor
- PostgreSQL: sistema gerenciador de banco de dados relacional
- Axios: cliente HTTP baseado em promessas para fazer requisições
- Bootstrap: framework CSS para facilitar o desenvolvimento de componentes responsivos
- Jsonwebtoken: biblioteca para gerar e verificar tokens de autenticação

## Roadmap

- [x] Realizar um CRUD (Login, registro e gerenciamento de usuário)
- [x] Autenticação e validação do JWT para bloquear rotas
- [ ] Validação por email ao criar uma conta ou editar dados

## Como executar o projeto

### Pré-requisitos

- Ter instalado o Node.js e o PostgreSQL na sua máquina

### Passos

1. Clone este repositório na sua máquina com o comando `git clone https://github.com/hyxtheone/LoginCRUD.git`
2. Abra um terminal na pasta do projeto e instale as dependências com o comando `npm install`  (Instale tanto da pasta `backend` quanto da pasta `frontend`)
3. Crie um arquivo `.env` na pasta `backend` e adicione as variáveis de ambiente descritas no arquivo `.env.example`
4. No seu postgres, crie a seguinte tabela:
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
```
5. Inicie o servidor com o comando `npm run dev` na pasta `backend`
6. Edite o arquivo `frontend/src/services/api.js` e altere o valor da variável `baseURL` para o endereço do seu servidor. Exemplo: `http://localhost:3333`
7. Inicie o frontend com o comando `vite --host` na pasta `frontend`

## Funcionalidades

- Registro de usuário: permite criar um novo usuário com email, senha e username
- Login de usuário: permite fazer o login com email e senha, gerando um token de autenticação que é armazenado no localStorage do navegador
- Edição de usuário: permite editar o email, a senha e o username do usuário logado, verificando o token de autenticação
- Logout de usuário: permite fazer o logout do usuário, removendo o token de autenticação dos cookies do navegador

## Screenshots

<img src="/screenshots/login-page.jpeg" alt="Página de login" width="371" height="250">
<img src="/screenshots/register-page.jpeg" alt="Página de registro" width="371" height="250">
<img src="/screenshots/profile-page.jpeg" alt="Página do perfil" width="800" height="400">
