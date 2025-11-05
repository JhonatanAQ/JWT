# 🔐 Estudando JWT

Este projeto foi criado com o objetivo de **aprender na prática o uso de JWT (JSON Web Token)** para autenticação de usuários em uma API REST. 
---

## 🚀 Tecnologias Utilizadas

- **Node.js** — ambiente de execução JavaScript
- **Fastify** — framework web rápido e leve
- **TypeScript** — tipagem estática e suporte moderno a ESModules
- **Prisma ORM** — mapeamento objeto-relacional para banco de dados
- **PostgreSQL** — banco de dados relacional
- **JWT (JsonWebToken)** — autenticação segura via token

---

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/JhonatanAQ/JWT.git
```

Acesse o diretório do projeto:

```bash
cd JWT
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

```bash
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
JWT_SECRET="sua_chave_secreta_aqui"
PORT=3333
```

---

## ⚙️ Executando o Projeto

Gere o cliente do Prisma:

```bash
npx prisma generate
```
Inicie o container docker do postgres:

```bash
docker-compose up -d
```
Execute as migrações do banco:

```bash
npx prisma migrate dev
```

Inicie o servidor em modo desenvolvimento:

```bash
npm run dev
```

O servidor estará disponível em:

```
http://localhost:3333
```

---

## 🧩 Rotas Principais

### 🔸 **POST /register**
Cria um novo usuário.

**Exemplo de corpo da requisição:**
```json
{
  "name": "Jhonatan",
  "email": "jhonatan@example.com",
  "password": "123456"
}
```

**Resposta:**
```json
{
  "message": "Usuário criado com sucesso!"
}
```

---

### 🔸 **POST /login**
Autentica o usuário e retorna um token JWT.

**Exemplo de corpo da requisição:**
```json
{
  "email": "jhonatan@example.com",
  "password": "123456"
}
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

---

### 🔸 **GET /users**
Retorna a lista de usuários cadastrados.  
🔒 **Rota protegida — requer token JWT.**

**Headers:**
```
Authorization: Bearer seu_token_aqui
```

**Resposta:**
```json
[
  {
    "id": "8a3e7c6a-4f54-4f6b-b6e3-86b7198a2f09",
    "name": "Jhonatan",
    "email": "jhonatan@example.com"
  }
]
```

---

## 🧠 Conceitos Estudados

- Criação de tokens JWT no login  
- Validação de tokens em rotas privadas  
- Middleware de autenticação  
- Hash de senhas com bcrypt  
- Boas práticas 

---

---

## 💡 Autor

Desenvolvido por **Jhonatan Andrade** 💻 
