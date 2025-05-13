# Projeto PetShop
Este repositório contém o código-fonte do sistema PetShop, incluindo backend e frontend.  
Abaixo estão as instruções para instalação, execução e manutenção do projeto.

## Requisitos
> Node.js

> Git

> VS Code ou outro IDE ou CodeSpaces

### Instruções de instalação e execução
> use o comando `cd backend` ou `cd frontend` para navegar para a pasta correspondente (estando na pasta do projeto)

navegue até a pasta `backend` e execute o comando `npm install` ou `npm i` para instalar todas as dependências necessárias do backend

navegue até a pasta `frontend` e execute o comando `npm install` ou `npm i` para instalar todas as dependências necessárias do frontend

### Rodando o projeto
para levantar o servidor, execute o comando `npm run start` ou `npm run dev`
> Nodemon: `npm run dev` serve para rodar o servidor em modo desenvolvimento

> Obs: lembre-se de estar nas pastas `backend` e `frontend` antes de levantar os respectivos servidores

*Caso necessário, após iniciar o servidor:*
> Backend: Encaminhe a porta `3000` na aba `Portas` do VS Code, deixando-a pública.

> Frontend: Encaminhe a porta `5000` na aba `Portas` do VS Code, deixando-a pública.

### Visualizando o banco de dados
para visualizar o banco de dados sqlite3 dentro do do vscode, instale a extensão `sqlite viewer`

`https://marketplace.visualstudio.com/items/?itemName=qwtel.sqlite-viewer`

### Fazendo consultas no banco de dados
para fazer uma consulta no banco de dados, use o comando `sqlite3 database.sqlite`

isso irá abrir o banco direto no terminal, exemplo de consulta: `SELECT * FROM tutors;`
> Obs: o uso de `;` é necessário

o resultado da consulta será exibido no terminal do sqlite3

para fechar o terminal do sqlite, use o comando CTRL+C ou .exit ou .quit

para executar uma série de consultas, use o comando `.read consultas.sql` no terminal do sqlite
> Consultas: o arquivo `consultas.sql` deve conter as consultas em ordem e deve estar na pasta `backend`

> Obs: para executar várias consultas, use o `;` para separar cada consulta

ou use o comando `sqlite3 database.sqlite < consultas.sql`

### Fazendo commits no github
para inicializar o projeto, use o comando `git init`

verifique o email com o comando `git config --global user.email`
> Obs: para inserir o email do github, use o comando `git config --global user.email seuemail@email.com`

verifique o nome com o comando `git config --global user.name`
> Obs: para inserir o nome do github, use o comando `git config --global user.name seunome`

adicione o projeto com o comando `git remote add origin https://github.com/sucsnj/petshop.git`

para adicionar os arquivos ao commit, use o comando `git add nomeDoArquivo` ou `git add .` para adicionar todos os arquivos

para fazer o commit, use o comando `git commit -m "mensagem do commit"`

para enviar o commit para o github, use o comando `git push origin nomeDaBranch`

### Manuseando as branches
para criar uma nova branch, use o comando `git branch nomeDaBranch`

para mudar de uma branch para outra, use o comando `git checkout nomeDaBranch`

para mesclar uma branch com a principal, use o comando `git merge nomeDaBranch`

para subir a mesclagem das branches, use o comando `git push`

para recuperar uma branch, use o comando `git pull origin nomeDaBranch`

se houver conflitos, use o comando `git reset --hard` para reverter as alterações

### Configuração do ambiente (.env)
> para criar o arquivo `.env`, use o comando `touch .env`

veja o arquivo `env.example` para saber quais os campos que devem ser preenchidos, e como preenchê-los

não use `;` para separar os campos ou finalizar linhas

não use aspas de qualquer natureza para os campos
> environment: o arquivo `.env` deve estar nas pastas `backend` e `frontend`

### Usando o Swagger
o swagger está disponível em `http://localhost:4000/api-docs`
> Obs: O servidor deve estar rodando para que o swagger funcione

## Estrututa do projeto
### Backend
📂 `banco/` → Configuração e inicialização do banco de dados.

📂 `bin/` → Scripts de inicialização da aplicação.

📂 `model/` → Lógica do CRUD e interação com o banco de dados.

📂 `routes/` → Definição das rotas e chamadas das funções do CRUD.

📂 `views/` → Arquivos de visualização da homepage da API, como HTML (EJS).

⚙️ `.env` → Arquivo de configuração do ambiente.

🔍 `.gitignore` → Arquivo de configuração do git.

⚙️ `app.js` → Arquivo de configuração do servidor.

📑 `consultas.sql` → Arquivo de consultas do banco de dados. `(opcional)`

📑 `database.sqlite` → Banco de dados do frontend.

⚙️ `env.example` → Exemplo de arquivo de configuração do ambiente. `(opcional)`

⚙️ `package-lock.json` → Arquivo de configuração do pacote.

⚙️ `package.json` → Arquivo de configuração do pacote.

### Frontend
📂 `bin/` → Scripts de inicialização da aplicação.

📂 `public/` → Arquivos estaticos do frontend, como CSS e JS, contêm o Materialize.

📂 `routes/` → Definição das rotas e chamadas das funções do CRUD.

📂 `views/` → Arquivos do frontend, como HTML (EJS), JS e CSS.

⚙️ `.env` → Arquivo de configuração do ambiente.

🔍 `.gitignore` → Arquivo de configuração do git.

⚙️ `app.js` → Arquivo de configuração do servidor.

⚙️ `env.example` → Exemplo de arquivo de configuração do ambiente. `(opcional)`

⚙️ `package-lock.json` → Arquivo de configuração do pacote.

⚙️ `package.json` → Arquivo de configuração do pacote.

### readme.md
📜 `README.md` → Arquivo de documentação do projeto.