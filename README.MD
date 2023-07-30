
# Gestão de Estoque de Medicamentos

Este projeto consiste em uma API REST para gerenciamento do estoque de medicamentos, com cadastro de usuários, depósitos e medicamentos.
___
# Índice

1. [Gestão de Estoque de Medicamentos](#gestão-de-estoque-de-medicamentos)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Rotas](#rotas)
   - [Usúarios](#usúarios)
     - [Criação de Novo Usuário](#cria-um-novo-usuario)
     - [Login Usuário](#login-usuario)
     - [Atualizar Dados Usuário](#atualizar-dados-usúario)
     - [Atualizar Status Usuário](#atualizar-status-usúario)
     - [Atualizar Senha Usuário](#atualizar-senha-usúario)
     - [Buscar Usuário Pelo Identificador](#buscar-usúario-pelo-identificador)
   - [Depósitos](#depósitos)
     - [Criação de Novo Depósito](#cria-um-novo-depósito)
     - [Atualizar Depósito](#atualiza-depósito)
     - [Atualizar Status Depósito](#atualizar-status-depósito)
     - [Listar Depósitos por Query Param](#lista-depositos-por-query-param)
     - [Buscar Depósito Pelo Identificador](#buscar-depósito-pelo-identificador)
     - [Deletar Depósito](#deletar-depósito)
   - [Medicamentos](#medicamentos)
     - [Criação de Novo Medicamento](#cria-um-novo-medicamento)
     - [Atualizar Dados de um Medicamento](#atualizar-dados-de-um-medicamento)
     - [Buscar Medicamento por Identificador](#buscar-medicamento-por-identificador)
     - [Buscar Todos os Medicamentos](#buscar-todos-os-medicamentos)
     - [Buscar Medicamentos por Tipo](#buscar-medicamentos-por-tipo)

4. [Instalação](#instalação)
5. [Rodando Localmente](#rodando-localmente)
6. [Variáveis de Ambiente](#variáveis-de-ambiente)

___



## Tecnologias Utilizadas

- Node.js
- Express
- JWT
- PostegreSQL
- Sequelize

## Rotas

#### __Usúarios__
- POST /api/usuarios - Cadastro de novo usuário
- POST /api/usuarios/login - Autenticação de usuário
- GET /api/usuarios/:id - Busca dados do usuári
- PATCH /api/usuarios/:id - Atualiza dados do usuário
- PATCH /api/usuarios/:id/status - Atualiza status do usuário
- PATCH /api/usuarios/:id/senha - Altera a senha do usuário
---
#### __Depósitos__

- GET /api/depositos - Lista todos os depósitos
- GET /api/depositos/:id - Busca depósito pelo ID
- POST /api/depositos - Cadastra novo depósito
- PATCH /api/depositos/:id - Atualiza dados do depósito
- PATCH /api/depositos/:id/status - Atualiza status do depósito
- DELETE /api/depositos/:id - Exclui um depósito
---

#### __Medicamentos__

- GET /api/medicamentos - Lista todos os medicamentos
- GET /api/medicamentos/:id - Busca medicamento pelo ID
- POST /api/medicamentos - Cadastra novo medicamento
- PATCH /api/medicamentos/:id - Atualiza dados do medicamento
- DELETE /api/medicamentos/:id - Exclui um medicamento
---


## Instalação

Você deve ter o Node.js e o npm instalado em sua maquina, tambem algum banco de dados sql ou postgres.

Para baixar o Node.js use o link:
- [Baixar o Node.js AQUI](https://nodejs.org/en/download)
Para baixar o NPM use o link:
- [Baixar o npm AQUI](https://nodejs.org/en/download)
Para baixar o PostgreSQL use o link:
- [Baixar o PostgreSQL AQUI](https://www.postgresql.org/download/)

Para fazer o clone do repositorio você deve ter tambem o GIT em sua máquina.

Para baixar o GIT use o link:
- [Baixar o GIT AQUI](https://git-scm.com/downloads)

---
- Após todos os programas necessários já instalados em sua máquina crie uma pasta que irá ficar o sistema.
- Acesse a pasta com gitbash ou cmd 
--- 




## Rodando localmente

Clone o projeto

```bash
 git clone https://github.com/fhoinaski/projetoAavaliativoModulo2.git
```

Entre no diretório do projeto

```bash
  cd projetoAavaliativoModulo2
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm start
```
Acesse a api em :
```bash
  http://localhost:NUMERO_DA_PORT_SERVER_AQUI/
```


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DIALECT`

`HOST`

`USERNAMEDB`

`PASSWORDDB`

`DATABASE`

`PORT`

`PORTSERVER`

`JWT_SECRET`


# **Documentação da API - ROTAS USÚARIO**

#### Usúarios
### **Cria um novo usuario**
- __Autenticação requerida__ : NÃO
- __Método___:POST


```http
/api/usuarios
```
---

#### Corpo da Requisição:
```JSON
{
  "nome": "João da Silva",
  "sobrenome": "Silva",
  "dataAniversario": "1990-01-01",
  "cpf": "12345678910", 
  "telefone": "12345678910", (opcional)
  "genero": "masculino", (opcional)
  "email": "joao@email.com",
  "senha": "senha123"
  "status": "Ativo" - (opcional- Ativo ou Inativo)
  
}
```
#### Resposta:
- 201 (Created) em caso de sucesso
- 400 (Bad Request) em caso de erro nos dados enviados
- 409 (Conflict) em caso de cpf ja cadastrado
- 5xx em caso de erro no servidor

#### Retorno caso sucesso:
```json
{
    "code": "OK",
    "msg": "Usuário criado com sucesso",
    "usuario": {
        "identificador": 3,
        "nome": "João da Silva",
        "sobrenome": "Silva",
        "dataAniversario": "1990-01-01",
        "cpf": "12345678910", 
        "telefone": "12345678910", (opcional)
        "genero": "masculino", (opcional)
        "email": "joao@email.com",
        "status": "Ativo" - (opcional- Ativo ou Inativo)
  
}
```
---
## Screenshots

![App Screenshot]('')
---

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. Nome do usúario |
| `sobrenome` | `string` | **Obrigatório**. Sobrenome do usúario |
| `dataAniversario` | `date` | **Obrigatório**. Data de aniversário do usuário no formato AAAA-MM-DD |
| `cpf` | `string` | **Obrigatório**. Cpf do usúario |
| `email` | `string` | **Obrigatório**. Email do usúario |
| `telefone` | `string` | **Opcional**. Telefone do usúario |
| `genero` | `string` | **Opcional**. Genero do usúario |
| `email` | `string` | **Obrigatório**. Email do usúario |
| `senha` | `string` | **Obrigatório**. Senha do usúario - (8 caracteres letras maiuscula minuscula e números) |
| `status` | `string` | **Opcional**. status caso não informado padrão Ativo -(tipo status: Ativo ou Inativo) |

---
## **Login usuario**

- __Autenticação requerida__ : NÃO
- __Método___:POST


```http
/api/usuarios/login
```
---

#### Corpo da Requisição:
```JSON
{
  "email": "joao@email.com",
  "senha": "senha123"
}
```
#### Resposta:
- 200 (ok) em caso de sucesso
- 400 (Bad Request) e-mail ou a senha estão inválidos.
- 404 (Not Found) em caso de não ser encontrado o e-mail do usuário.
- 5xx em caso de erro no servidor

#### Retorno caso sucesso:
```json
{
    "code": "OK",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0Ijox"
}
```

---

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. Email do usúario |
| `senha` | `string` | **Obrigatório**. Senha do usúario  |


---
## **Atualizar dados usúario**

- __Autenticação requerida__ :  Bearer {token}
- __Método___:PATCH


```http
  /api/usuarios/:id
```
---

#### Corpo da Requisição:
```JSON
{
  "nome": "João da Silva",
  "sobrenome": "Silva",
  "genero": "Masculino", 
  "telefone": "12345678910", (opcional)
   
}
```
#### Resposta:
- 204 (No Content) não retorna nada caso sucesso
- 400 (Bad Request) mensagem explcativo do erro
- 401 (Unauthorized) sem permissão para editar o usuario
- 404 (Not Found) não encontrado registro
- 5xx em caso de erro no servidor

#### Retorno caso sucesso:
```json
{

}
```

---

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Opcional**. Nome do usúario |
| `sobrenome` | `string` | **Opcional**. Sobrenome do usúario |
| `telefone` | `string` | **Opcional**. Telefone do usúario |
| `genero` | `string` | **Opcional**. Genero do usúario |


---
## **Atualizar status usúario**

- __Autenticação requerida__ :  Bearer {token}
- __Método___:PATCH


```http
/api/usuarios/:id/status
```
---

#### Corpo da Requisição:
```JSON
{
  "status": "Inativo",

}
```
#### Resposta:
- 200 (ok) retorna dados usuario atualizado
- 400 (Bad Request) mensagem explicativo do erro
- 401 (Unauthorized) sem permissão para editar o usuario
- 404 (Not Found) não encontrado registro
- 5xx em caso de erro no servidor

#### Retorno caso sucesso:
```json
{
    "code": "OK",
    "msg": "Status atualizado com sucesso para Inativo!"
}
```

---

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `status` | `string` | **Obrigatório**. Tipo aceito: Ativo ou Inativo |


---
## **Atualizar senha usúario**

- __Autenticação requerida__ :  Bearer {token}
- __Método___:PATCH


```http
/api/usuarios/senha
```
---

#### Corpo da Requisição:
```JSON
{
    "senhaAtual":"SenhaAtual12345678",
    "novaSenha":"Novasenha12345678"
    
}
```
#### Resposta:
- 204 (ok) retorno contendo os dados do usuario
- 400 (Bad Request) mensagem explicativo do erro
- 401 (Unauthorized) sem permissão para editar o usuario
- 404 (Not Found) não encontrado registro
- 5xx em caso de erro no servidor

#### Retorno caso sucesso:
```json
{
vazio
}
```

---

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `senhaAtual` | `string` | **Obrigatório**. Senha atual do usuario|
| `novaSenha` | `string` | **Obrigatório**. Nova senha do usuario |


---
## **Buscar usúario pelo Identificador**

- __Autenticação requerida__ :  Bearer {token}
- __Método___:GET


```http
/api/usuarios/:id
```
---

#### Corpo da Requisição:
```JSON
{
Vazio
}
```
#### Resposta:
- 200 (No Content) retorno vasio caso senha atualiza com sucesso
- 400 (Bad Request) mensagem explicativo do erro
- 404 (Not Found) não encontrado registro
- 5xx em caso de erro no servidor

#### Retorno caso sucesso:
```json
{
    "code": "OK",
    "usuario": {
        "identificado": 1,
        "nome": "Fernando",
        "sobrenome": "silva",
        "genero": "Masculino",
        "dataAniversario": "1980-10-01",
        "cpf": "00000000000",
        "telefone": "9999999999999",
        "email": "email@gmail.com",
        "status": "Inativo"
    }
}
```

---


# **Documentação da API - ROTAS DEPÓSITO**

#### Depósito
### **Cria um novo Depósito**
- __Autenticação requerida__ :  Bearer {token}
- __Método___:POST


```http
/api/depositos
```
---

#### Corpo da Requisição:
```JSON
{
  "userId": 1,
  "razaoSocial": "Minha Razão Social239",
  "cnpj": "11111111111111",
  "nomeFantasia": "Meu Nome Fantasia2",
  "email": "exemplo@emai.com",
  "telefone": "0000000000",
  "celular": "9876543210",
  "cep": "12345678",
  "logradouro": "Minha Rua",
  "numero": "123",
  "complemento": "Sala 1",
  "bairro": "Meu Bairro",
  "cidade": "Minha Cidade",
  "uf": "UF",
  "latitude": "123.456",
  "longitude": "987.654",
  "status": "Ativo"
}
```
#### Resposta:
- 201 (Created) em caso de sucesso
- 400 (Bad Request) em caso de erro nos dados enviados
- 409 (Conflict) em caso de cnpj ja cadastrado
- 5xx em caso de erro no servidor

#### Retorno caso sucesso:
```json
{
    "code": "OK",
    "msg": "Depósito criado com sucesso",
    "deposito": {
        "identificador": 3,
        "razaoSocial": "Minha Razão Social239"
    }
}
```

---

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `userId` | `string` | **Obrigatório**. Identificador do usuario responsavel pela criação |
| `razaoSocial` | `string` | **Obrigatório**. Razão socialda empresa |
| `cnpj` | `string` | **Obrigatório**. Cnpj da empresa |
| `nomeFantasia` | `string` | **Obrigatório**. Nome fantasia da empresa |
| `email` | `string` | **Obrigatório**. Email do empresa |
| `telefone` | `string` | **Opcional**. Telefone do empresa |
| `celular` | `string` | **Obrigatorio**. Celular do empresa |
| `cep` | `string` | **Obrigatório**. Cep endereço da empresa |
| `lagradouro` | `string` | **Obrigatório**. Nome da rua do endereço da empresa |
| `numero` | `string` | **Obrigatório**. Número do endereço da empresa|
| `bairro` | `string` | **Obrigatorio**. Bairro da empresa |
| `cidade` | `string` | **Obrigatorio**. Cidade da empresa |
| `estado` | `string` | **Obrigatorio**. Estado da empresa |
| `longitude` | `string` | **Opcional**. longitude do endereço da empresa |
| `latitude` | `string` | **Opcional**. latitude do endereço  da empresa |
| `status` | `string` | **Obrigatorio**. Status deve ser Ativo ou Inativo se não informado por padrão o deposito sera cadastrado como Ativo |

---
## **Atualiza Depósito**

- __Autenticação requerida__ :  Bearer {token}
- __Método___:PATCH


```http
/api/deposito/:id
```
---

#### Corpo da Requisição:
```JSON
{
  "nomeFantasia": "Meu Nome Fantasia2",
  "email": "exemplo@emai.com",
  "telefone": "0000000000",
  "celular": "9876543210",
  "cep": "12345678",
  "logradouro": "Minha Rua",
  "numero": "123",
  "complemento": "Sala 1",
  "bairro": "Meu Bairro",
  "cidade": "Minha Cidade",
  "uf": "UF",
  "latitude": "123.456",
  "longitude": "987.654",
}
```
#### Resposta:
- 204 (ok) em caso de sucesso
- 400 (Bad Request) requisição com dados inválidos.
- 404 (Not Found) em caso de não ser encontrado o deposito.
- 5xx em caso de erro no servidor

#### Retorno caso sucesso:
```json
{
   vazio
}
```

---

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nomeFantasia` | `string` | **Opcional**. Nome fantasia da empresa |
| `email` | `string` | **Opcional**. Email do empresa |
| `telefone` | `string` | **Opcional**. Telefone do empresa |
| `celular` | `string` | **Opcional**. Celular do empresa |
| `cep` | `string` | **Opcional**. Cep endereço da empresa |
| `lagradouro` | `string` | **Opcional**. Nome da rua do endereço da empresa |
| `numero` | `string` | **Opcional**. Número do endereço da empresa|
| `bairro` | `string` | **Opcional**. Bairro da empresa |
| `cidade` | `string` | **Opcional**. Cidade da empresa |
| `estado` | `string` | **Opcional**. Estado da empresa |
| `longitude` | `string` | **Opcional**. longitude do endereço da empresa |
| `latitude` | `string` | **Opcional**. latitude do endereço  da empresa |



---
## **Atualizar status Depósito**

- __Autenticação requerida__ :  Bearer {token}
- __Método___:PATCH


```http
/api/depositos/:id/status
```
---

#### Corpo da Requisição:
```JSON
{
  "status": "Inativo",

}
```
#### Resposta:
- 204 (No Content) retorna vazio caso atualizado com sucesso
- 400 (Bad Request) mensagem explicativo do erro
- 401 (Unauthorized) sem permissão para editar o usuario
- 404 (Not Found) não encontrado registro
- 5xx em caso de erro no servidor

#### Retorno caso sucesso:
```json
{
 vazio
}
```

---

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `status` | `string` | **Obrigatório**. Tipo aceito: ***Ativo*** ou ***Inativo*** |


---
## **Lista depositos por query param**

- __Autenticação requerida__ :  Bearer {token}
- __Método___:PATCH


```http
/api/depositos?status=Ativo
```
---

#### Corpo da Requisição:
```JSON
{
vazio  
}
```
#### Resposta:
- 204 (ok) retorno contendo os dados de todos os depositos Ativos ou Inativos
- 400 (Bad Request) mensagem explicativo do erro
- 404 (Not Found) não encontrado registro
- 5xx em caso de erro no servidor

#### Retorno caso sucesso:
```json
[
    {
        "userId": 1,
        "depositoId": 3,
        "razaoSocial": "Minha Razão Social239",
        "cnpj": "11111111111111",
        "nomeFantasia": "Meu Nome Fantasia2",
        "email": "exemplo@emai.com",
        "telefone": "0000000000",
        "celular": "9876543210",
        "cep": "12345678",
        "logradouro": "Minha Rua",
        "numero": "123",
        "complemento": "Sala 1",
        "bairro": "Meu Bairro",
        "cidade": "Minha Cidade",
        "uf": "UF",
        "latitude": "123.456",
        "longitude": "987.654",
        "status": "Ativo",
        "createdAt": "2023-07-30T00:34:14.868Z",
        "updatedAt": "2023-07-30T00:34:14.868Z"
    },
]
```

---

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `?status=Ativo` | `param` | **Obrigatório**. Retorna todos depositos Ativos|
| `?status=Inativo` | `param` | **Obrigatório**. Retorna todos depositos Inativos|



---
## **Buscar deposito pelo Identificador**

- __Autenticação requerida__ :  Bearer {token}
- __Método___:GET


```http
/api/depositos/:id
```
---

#### Corpo da Requisição:
```JSON
{
Vazio
}
```
#### Resposta:
- 200 (ok) retorno com dados do deposito
- 400 (Bad Request) mensagem explicativo do erro
- 404 (Not Found) não encontrado registro
- 5xx em caso de erro no servidor

#### Retorno caso sucesso:
```json
{
    "userId": 1,
    "depositoId": 3,
    "razaoSocial": "Minha Razão Social239",
    "cnpj": "11111111111111",
    "nomeFantasia": "Meu Nome Fantasia2",
    "email": "exemplo@emai.com",
    "telefone": "0000000000",
    "celular": "9876543210",
    "cep": "12345678",
    "logradouro": "Minha Rua",
    "numero": "123",
    "complemento": "Sala 1",
    "bairro": "Meu Bairro",
    "cidade": "Minha Cidade",
    "uf": "UF",
    "latitude": "123.456",
    "longitude": "987.654",
    "status": "Ativo",
    "createdAt": "2023-07-30T00:34:14.868Z",
    "updatedAt": "2023-07-30T00:34:14.868Z"
}
```

---
## **Deletar deposito**

- __Autenticação requerida__ :  Bearer {token}
- __Método___:DELETE


```http
/api/depositos/:id
```
---

#### Corpo da Requisição:
```JSON
{
Vazio
}
```
#### Resposta:
- 204 (No Content) retorno vazio caso exclusão com sucesso
- 400 (Bad Request) mensagem explicativo do erro
- 404 (Not Found) não encontrado registro
- 5xx em caso de erro no servidor

#### Retorno caso sucesso:
```json
{
vazio
}
```

---
# **Documentação da API - ROTAS MEDICAMENTOS**

#### Medicamentos
### **Cria um novo Medicamento**
- __Autenticação requerida__ :  Bearer {token}
- __Método___:POST


```http
/api/medicamentos
```
---

#### Corpo da Requisição:
```JSON
{
  "userId": 1,
  "depositoId": 2,
  "nomeMedicamento": "Aspirina4",
  "nomeLaboratorio": "Laboratório X",
  "descricao": "Medicamento para alívio de dores e no braço",
  "dosagem": 500,
  "unidadeDosagem": "ml",
  "tipo": "naocontrolado",
  "precoUnitario": 25.00,
  "quantidade": 5
}
```
#### Resposta:
- 201 (Created) em caso de sucesso
- 400 (Bad Request) em caso de erro nos dados enviados
- 409 (Conflict) em caso de nome medicamento ja cadastrado
- 5xx em caso de erro no servidor

#### Retorno caso sucesso:
```json
{
    "code": "OK",
    "msg": "Medicamento cadastrado com sucesso",
    "medicamento": {
        "identificador": 6,
        "userId": 1,
        "depositoId": 5,
        "nomeMedicamento": "Aspirina4",
        "laboratorio": "Laboratório X",
        "descricao": "Medicamento para alívio de dores e no braço",
        "dosagem": 500,
        "unidadeDosagem": "ml",
        "tipo": "naocontrolado",
        "precoUnitario": "25.00",
        "quantidade": 5
    }
}
```

---

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `userId` | `string` | **Obrigatório**. Identificador do usuario responsavel pela criação |
| `depositoId` | `string` | **Obrigatório**. Identificador que sera armazenado o medicamento |
| `nomeMedicamento` | `string` | **Obrigatório**. Nome do medicamento |
| `nomeLaboratorio` | `string` | **Obrigatório**. Nome laboratorio do medicamento |
| `descricao` | `string` | **Opicional**. Descrição sobre o medicamento |
| `dosagem` | `number` | **Obrigatorio**. Dosagem de uso do medicamento |
| `tipo` | `string` | **Obrigatorio**. Tipo de uso do medicamento (Tipos aceitos: ***controlado*** ou ***naocontrolado***) |
| `precoUnitario` | `number` | **Obrigatorio**. Preço do medicamento |
| `quantidade` | `number` | **Obrigatorio**. Quantidade disponivel em estoque do medicamento |


---
### **Atualizar dados de um Medicamento**
- __Autenticação requerida__ :  Bearer {token}
- __Método___:PATCH


```http
/api/medicamentos/:medicamentoId
```
---

#### Corpo da Requisição:
```JSON
{
  "descricao": "Medicamento para alívio de dores e no braço",
  "precoUnitario": 25.00,
  "quantidade": 5
}
```
#### Resposta:
- 200 (ok) em caso de sucesso
- 400 (Bad Request) em caso de erro nos dados enviados
- 404 (Not Found ) em caso de medicamento nao encontrado
- 5xx em caso de erro no servidor

#### Retorno caso sucesso:
```json
{
    "code": "OK",
    "msg": "Medicamento atualizado com sucesso",
    "medicamento": {
        "identificador": 6,
        "nomeMedicamento": "Aspirina4",
        "laboratorio": "Laboratório X",
        "descricao": "Medicamento para alívio de dores e no braço ",
        "dosagem": 500,
        "unidadeDosagem": "ml",
        "tipo": "naocontrolado",
        "precoUnitario": 25,
        "quantidade": 5
    }
}
```

---

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `descricao` | `string` | **Opcional**. Descrição sobre o medicamento |
| `precoUnitario` | `number` | **Opcional**. Preço do medicamento |
| `quantidade` | `number` | **Opcional**. Quantidade disponivel em estoque do medicamento |


---
### **Buscar medicamento por identificador**
- __Autenticação requerida__ :  Bearer {token}
- __Método___:GET


```http
/api/medicamentos/:medicamentoId
```
---

#### Corpo da Requisição:
```JSON
{
VAZIO
}
```
#### Resposta:
- 200 (ok) em caso de sucesso retornando os dados do medicamento
- 400 (Bad Request) em caso de erro nos dados enviados
- 404 (Not Found ) em caso de medicamento nao encontrado
- 5xx em caso de erro no servidor

#### Retorno caso sucesso:
```json
{
    "code": "OK",
    "medicamento": {
        "identificador": 6,
        "nomeMedicamento": "Aspirina4",
        "laboratorio": "Laboratório X",
        "descricao": "Medicamento para alívio de dores e no braço de outro",
        "dosagem": 500,
        "unidadeDosagem": "ml",
        "tipo": "naocontrolado",
        "precoUnitario": "25.00",
        "quantidade": 5
    }
}
```

---
### **Buscar todos os Medicamentos**
- __Autenticação requerida__ :  Bearer {token}
- __Método___:GET


```http
/api/medicamentos
```
---

#### Corpo da Requisição:
```JSON
{
VAZIO
}
```
#### Resposta:
- 200 (ok) em caso de sucesso retornando os medicamentos disponiveis
- 400 (Bad Request) em caso de erro nos dados enviados
- 404 (Not Found ) em caso de medicamento nao encontrado
- 5xx em caso de erro no servidor

#### Retorno caso sucesso:
```json
[{
    "code": "OK",
    "medicamento": {
        "identificador": 6,
        "nomeMedicamento": "Aspirina4",
        "laboratorio": "Laboratório X",
        "descricao": "Medicamento para alívio de dores e no braço de outro",
        "dosagem": 500,
        "unidadeDosagem": "ml",
        "tipo": "naocontrolado",
        "precoUnitario": "25.00",
        "quantidade": 5
    }
},
]
```

---
### **Buscar Medicamentos por tipo**
- __Autenticação requerida__ :  Bearer {token}
- __Método___:GET


```http
/api/medicamentos?tipo=NAOCONTROLADO
```
---

#### Corpo da Requisição:
```JSON
{
VAZIO
}
```
#### Resposta:
- 200 (ok) em caso de sucesso retornando os medicamentos disponiveis referente ao tipo
- 400 (Bad Request) em caso de erro nos dados enviados
- 404 (Not Found ) em caso de medicamento nao encontrado
- 5xx em caso de erro no servidor

#### Retorno caso sucesso:
```json
[{
    "code": "OK",
    "medicamento": {
        "identificador": 6,
        "nomeMedicamento": "Aspirina4",
        "laboratorio": "Laboratório X",
        "descricao": "Medicamento para alívio de dores e no braço de outro",
        "dosagem": 500,
        "unidadeDosagem": "ml",
        "tipo": "naocontrolado",
        "precoUnitario": "25.00",
        "quantidade": 5
    }
},
]
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `?status=CONTROLADO` | `param` | **Opcional**. Retorna todos medicamentos Controlados|
| `?status=NAOCONTROLADO` | `param` | **Opcional**. Retorna todos depositos Não Controlados|

---
### **Excluir um medicamento**
- __Autenticação requerida__ :  Bearer {token}
- __Método___:DELETE


```http
/api/medicamentos/:medicamentoId
```
---

#### Corpo da Requisição:
```JSON
{
VAZIO
}
```
#### Resposta:
- 204 (No Content) em caso de sucesso retornando vazio
- 400 (Bad Request) em caso de erro nos dados enviados
- 404 (Not Found ) em caso de medicamento nao encontrado
- 5xx em caso de erro no servidor

#### Retorno caso sucesso:
```json
{
vazio
}
```

---



