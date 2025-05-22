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

para levantar o servidor, execute o comando `npm run start` ou `npm run dev`
> Nodemon: `npm run dev` serve para rodar o servidor em modo desenvolvimento

> Obs: lembre-se de estar nas pastas `backend` e `frontend` antes de levantar os respectivos servidores

> Será necessário criar um usuário para fazer o login

*Caso necessário, após iniciar o servidor:*
> Backend: Encaminhe a porta correspondente na aba `Portas` do VS Code, deixando-a pública.

> Frontend: Encaminhe a porta correspondente na aba `Portas` do VS Code, deixando-a pública.

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

### Configurações do Git
para inicializar o git, use o comando `git init`

verifique o email com o comando `git config --global user.email`
> Obs: para inserir o email do github, use o comando `git config --global user.email seuemail@email.com`

verifique o nome com o comando `git config --global user.name`
> Obs: para inserir o nome do github, use o comando `git config --global user.name seunome`

adicione o projeto com o comando `git remote add origin https://github.com/sucsnj/petshop.git`

### Configuração do ambiente (.env)
> para criar o arquivo `.env`, use o comando `touch .env`

veja o arquivo `.env.example` para saber quais os campos que devem ser preenchidos, e como preenchê-los

use o comand `openssl rand -hex 32` para gerar uma chave secreta aleatória

não use `;` para separar os campos ou finalizar linhas

não use aspas de qualquer natureza para os campos
> environment: o arquivo `.env` deve estar nas pastas `backend` e `frontend`

### Usando o Swagger
o swagger está disponível em `http://localhost:4000/api-docs`
> Obs: O servidor backend deve estar rodando para que o swagger funcione

## Alguns comandos do git
`git add nomeDoArquivo` – Adiciona um arquivo específico ao staging (área de preparação para commit).

`git add .` – Adiciona todos os arquivos modificados no diretório atual ao staging.

`git commit -m "mensagem do commit"` – Cria um commit com uma mensagem explicativa.

`git push origin nomeDaBranch` – Envia os commits locais da branch para o repositório remoto.

`git branch nomeDaBranch` – Cria uma nova branch localmente, mas sem trocá-la automaticamente.

`git checkout nomeDaBranch` – Alterna para a branch especificada, se já existir localmente.

`git checkout -b nomeDaBranch` – Cria e alterna para uma nova branch local.

`git checkout nomeDaBranch` (se a branch só existe no remoto) – Pode trazer uma branch remota automaticamente, caso esteja sincronizada.

`git merge nomeDaBranch` – Mescla a branch especificada na branch atual, integrando suas mudanças.

`git push` – Envia todas as alterações da branch atual para o repositório remoto.

`git pull origin nomeDaBranch` – Busca mudanças recentes do repositório remoto e as incorpora na branch local.

`git reset --hard` – Desfaz completamente todas as alterações não commitadas e retorna à última versão commitada.

`git fetch origin` – Atualiza os dados sobre as branches remotas sem modificar nada localmente.

`git merge origin/nomeDaBranch` – Mescla a versão remota da branch na branch local.

## Estrutura do projeto
### Backend
📂 `banco/` → Configuração e inicialização do banco de dados.

📂 `bin/` → Scripts de inicialização da aplicação.

📂 `middleware/` → Middleware para proteção por token.

📂 `model/` → Lógica do CRUD e interação com o banco de dados.

📂 `routes/` → Definição das rotas e chamadas das funções do CRUD.

📂 `views/` → Arquivos de visualização da homepage da API, como HTML (EJS).

⚙️ `.env` → Arquivo de configuração do ambiente.

⚙️ `.env.example` → Exemplo de arquivo de configuração do ambiente. `(opcional)`

🔍 `.gitignore` → Arquivo de configuração do git.

⚙️ `app.js` → Arquivo de configuração do servidor.

📑 `consultas.sql` → Arquivo de consultas do banco de dados. `(opcional)`

📑 `database.sqlite` → Banco de dados.

⚙️ `package-lock.json` → Arquivo de configuração do pacote.

⚙️ `package.json` → Arquivo de configuração do pacote.

### Frontend
📂 `bin/` → Scripts de inicialização da aplicação.

📂 `public/` → Arquivos estaticos do frontend, como CSS e JS, contêm o Materialize.

📂 `routes/` → Definição das rotas e chamadas das funções do CRUD.

📂 `views/` → Arquivos do frontend, como HTML (EJS), JS e CSS.

⚙️ `.env` → Arquivo de configuração do ambiente.

⚙️ `.env.example` → Exemplo de arquivo de configuração do ambiente. `(opcional)`

🔍 `.gitignore` → Arquivo de configuração do git.

⚙️ `app.js` → Arquivo de configuração do servidor.

⚙️ `package-lock.json` → Arquivo de configuração do pacote.

⚙️ `package.json` → Arquivo de configuração do pacote.

### readme.md
📜 `README.md` → Arquivo de documentação do projeto.