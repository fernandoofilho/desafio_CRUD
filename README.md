# README

Este repositório contém um projeto que consiste em duas partes principais: o backend e o frontend.

## Backend

A parte backend foi desenvolvida utilizando Flask, um framework de desenvolvimento web em Python. Antes de executar o backend, é necessário instalar as dependências. Para isso, siga os passos abaixo:

1. Navegue até a pasta `backend`.
2. Execute o comando `pip install -r requirements.txt` para instalar as dependências Python necessárias.

Após instalar as dependências, é necessário configurar o banco de dados PostgreSQL. Siga os passos abaixo para configurar o banco de dados:

1. Navegue até a pasta `database`.
2. Execute o arquivo Docker para iniciar o banco de dados PostgreSQL, garantindo que as portas padrão do postgresql estejam abertas, utilize o comando:
3. ```bash docker run --name database -e POSTGRES_PASSWORD=INDT@2024 -d postgres -p 5432:5432  ```

Depois de configurar o banco de dados, é necessário executar as migrações do Flask. Siga os passos abaixo:

1. Execute o comando para inicializar as migrações Flask.
   ```bash flask db init ```
3. Execute o comando para aplicar e atualizar as migrações.
  ```bash flask db migrate ```
Com o backend configurado e o banco de dados pronto, você pode executar o servidor Flask. 

**Nota:** A execução do backend ainda não está configurada via Docker. Para iniciar o backend, execute um dos seguintes comandos:
- `python app.py` ou
- `flask run`

## Frontend

A parte frontend foi desenvolvida utilizando ReactJS. Antes de executar o frontend, é necessário instalar as dependências. Para isso, siga os passos abaixo:

1. Navegue até a pasta `frontend`.
2. Execute o comando `npm install` para instalar as dependências do frontend.

Depois de instalar as dependências, você pode iniciar o servidor de desenvolvimento do ReactJS. 

Para iniciar o frontend, execute o seguinte comando:

```bash
npm run start

```

Após executar o frontend e o backend, você poderá acessar o aplicativo em um navegador da web. Certifique-se de que o servidor backend esteja em execução antes de iniciar o frontend.

Este projeto foi desenvolvido como parte de um desafio e não será mais mantido ou atualizado. Portanto, não são aceitas contribuições neste momento.


Gráficos de usuários ativos e inativos separados por tipo 
![image](https://github.com/fernandoofilho/desafio_CRUD/assets/54952942/06e4c5fd-16aa-4591-92de-41d12476ee90)

página de adicionar ou remover usuários 
![image](https://github.com/fernandoofilho/desafio_CRUD/assets/54952942/98ea74a0-ddc4-4157-8dab-aa6f0a8a0083)

página de login
![image](https://github.com/fernandoofilho/desafio_CRUD/assets/54952942/12ebf3c2-875f-4026-bfea-51d84c3a7ce9)


página de cadastro
![image](https://github.com/fernandoofilho/desafio_CRUD/assets/54952942/2178b149-9ed3-4b99-928c-c3bfc1e9ae55)

Página do usuário padrão (sem acesso as funcionalidades de admin)
![image](https://github.com/fernandoofilho/desafio_CRUD/assets/54952942/f1414d6e-cf94-4e7d-97b2-5c43e587c394)

