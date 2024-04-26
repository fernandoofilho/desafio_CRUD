# README

Este repositório contém um projeto que consiste em duas partes principais: o backend e o frontend.

## Backend

A parte backend foi desenvolvida utilizando Flask com postgresql.
Para o frontend foi utilizado reactJS.

# Para executar o projeto

primeiramente instale e configure o docker desktop:

[Download docker](https://www.docker.com/products/docker-desktop/)

Após baixar e configurar o docker, você precisará inicializar a API e a base de dados
1. Abra o docker desktop
1. abra a pasta do projeto com o cmd ou bash e digite
```bash
 docker compose up -d
```
3. ![image](https://github.com/fernandoofilho/desafio_CRUD/assets/54952942/5b2996f5-0c1d-49a3-8a25-bea0a82f522c)
Aguarde até que fique assim
![image](https://github.com/fernandoofilho/desafio_CRUD/assets/54952942/0cbeacf6-8eca-4a48-b657-ebc8d953917d)
 No seu docker desktop, você encontrará os containers assim:
![image](https://github.com/fernandoofilho/desafio_CRUD/assets/54952942/e732ac95-4b3f-440b-9a5f-a1cf19f49987)

4. Navegue até a pasta frontend
   ```bash
    cd frontend ```
6. Instale as dependencias do react
   ```bash
   npm install```
8. Execute o frontend em modo desenvolvimento
    ```bash
   npm run start```
10. No seu navegador, abra http://localhost:3000/

Certifique-se de que as portas 3000, 5000 e 5432 não estejam em uso

## Notas de desenvolvimento
não são aceitas contribuições neste momento, pois este repositório é apenas para um desafio.



A base de dados é composta pelas tabelas de User e User_history, todos os usuários criados serão armazenados em User, independente se forem apagados.

Caso um usuário seja apagado, o atributo "userStatus" de userHistory será alterado para inactive, para fins de contagem posterior, além disso, será 
armazenada a data de quando o usuário se tornou inativo.
![image](https://github.com/fernandoofilho/desafio_CRUD/assets/54952942/ff238dfc-f127-4fb0-bb82-6939bd94dcf5)

User
![image](https://github.com/fernandoofilho/desafio_CRUD/assets/54952942/14f75ef7-922c-4d5b-9489-c6f8a4073519)

User history
![image](https://github.com/fernandoofilho/desafio_CRUD/assets/54952942/921fa6b8-de20-430d-b6e0-724f457ffaad)


Inicialmente, as senhas seriam criptografadas e descriptografadas na API do backend, e armazenadas criptografadas no banco, por questões de tempo, optei por remover essa função, pois estava atrasando os testes.


Optei por não utilizar .env no back e no front por ser um projeto que não vai entrar em deploy de fato, então todas as rotas e secret_keys estão no código 


Aqui, vou deixar como começou e a versão final: 

## Gráficos de usuários ativos e inativos separados por tipo 
### Versão Inicial
![image](https://github.com/fernandoofilho/desafio_CRUD/assets/54952942/c41c27e2-6aee-4af4-87d2-46a02f2a6419)

### Versão Final
![image](https://github.com/fernandoofilho/desafio_CRUD/assets/54952942/d7a1ec4d-2ffc-46d6-920d-e4214feea707)


### página de adicionar ou remover usuários 
## Versão Inicial
![image](https://github.com/fernandoofilho/desafio_CRUD/assets/54952942/98ea74a0-ddc4-4157-8dab-aa6f0a8a0083)
## Versão Final
![image](https://github.com/fernandoofilho/desafio_CRUD/assets/54952942/d1c4d734-1650-4d58-91dd-d6845c9c061f)

## página de login
## Versão Inicial
![image](https://github.com/fernandoofilho/desafio_CRUD/assets/54952942/12ebf3c2-875f-4026-bfea-51d84c3a7ce9)
## Versão Final
![image](https://github.com/fernandoofilho/desafio_CRUD/assets/54952942/d026bbb8-8e81-46de-a900-049f4d63ae11)


## página de cadastro
## Versão Inicial
![image](https://github.com/fernandoofilho/desafio_CRUD/assets/54952942/2178b149-9ed3-4b99-928c-c3bfc1e9ae55)
## Versão Final
![image](https://github.com/fernandoofilho/desafio_CRUD/assets/54952942/805ac348-2091-485d-8adc-56b6fc2d03e1)


## Página do usuário padrão (sem acesso as funcionalidades de admin)

### Versão Inicial
![image](https://github.com/fernandoofilho/desafio_CRUD/assets/54952942/f1414d6e-cf94-4e7d-97b2-5c43e587c394)
### Versão Final
![image](https://github.com/fernandoofilho/desafio_CRUD/assets/54952942/f63c7d8e-5f0b-4dff-b943-46e0ad38a5f1)

