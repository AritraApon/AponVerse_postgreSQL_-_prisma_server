# AponVerse Backend

Backend API for **AponVerse**, a full-stack blogging platform built with **Node.js, Express.js, TypeScript, Prisma, and PostgreSQL**.

## 🔗 Live API

**Production API:**
https://aponverse-postgresql-prisma-server.onrender.com

## 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcrypt
- CORS
- dotenv
- Prisma PostgreSQL Driver Adapter
- Render

## ✨ Features

### 🔐 Authentication

- User registration
- User login
- JWT-based authentication
- Protected routes
- Password hashing with bcrypt

### 👤 User

- User profile information
- Profile image support
- User status management
- Soft delete support

### 📝 Posts

- Create post
- Get all posts
- Get single post
- Update post
- Delete post
- Author information
- Post image support
- Published/Draft status
- Soft delete support
- Search
- Pagination
- Category relationship

### 💬 Comments

- Create comments
- Comments linked with users and posts
- Soft delete support

### ❤️ Reactions

- Like reaction
- One reaction per user per post

## 🗃️ Database

This project uses **PostgreSQL** with **Prisma ORM**.

### Main Models

- User
- Category
- Post
- Comment
- Reaction

### Relationships

```
User
 ├── Posts
 ├── Comments
 └── Reactions

Category
 └── Posts

Post
 ├── Author
 ├── Category
 ├── Comments
 └── Reactions

### Relationships

```
### Project Structure
```
AponVerse_postgreSQL_-_prisma_server/
│
├── generated/
│   └── prisma/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── app.ts
│   ├── server.ts
│   │
│   ├── lib/
│   │   └── prisma.ts
│   │
│   ├── middleware/
│   │   └── auth.middleware.ts
│   │
│   └── services/
│       ├── auth/
│       ├── post/
│       ├── user/
│       ├── comment/
│       └── reaction/
│
├── .env
├── prisma.config.ts
├── package.json
├── tsconfig.json
└── README.md
```
### .env
```
-DATABASE_URL="your_postgresql_database_url"
-JWT_SECRET="your_jwt_secret"
-PORT=5000
```
---
1. Clone the repository
```
git clone https://github.com/AritraApon/AponVerse_postgreSQL_-_prisma_server.git
```
2. Go to the project directory
```
cd AponVerse_postgreSQL_-_prisma_server
```
3. Install dependencies
```
npm install
```
4. Generate Prisma Client
```
npx prisma generate
```
5. Run database migrations
```
npx prisma migrate dev
```
6. Start development server
```
npm run dev
```

The server will run on:
```
http://localhost:5000
```
---
### 🏗️ Production Build

Build the project:
```
npm run build
```
Start the production server:
```
npm start
```
###🔌 API

Production Base URL
```
https://aponverse-postgresql-prisma-server.onrender.com
```
---
```
-Get All Posts
-GET /api/posts
-Pagination
-GET /api/posts?page=1&limit=6
-Search
-GET /api/posts?search=javascript
```

### Example Response
```
{
  "success": true,
  "message": "Posts retrieved successfully",
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 6,
    "total": 0,
    "totalPages": 0
  }
}
```

### ☁️ Deployment

-The backend is deployed on Render.

---

Build Command
```
npm install && npx prisma generate && npx prisma migrate deploy && npm run build
```
Start Command
```
npm start
```
---

Environment variables such as DATABASE_URL and JWT_SECRET are configured through Render Environment Variables.

### 🔒 Security
- Passwords are hashed using bcrypt.
- JWT is used for authentication.
- Sensitive environment variables are kept outside the repository.
- Database access is handled through Prisma.
- Protected routes use authentication middleware.
--

### 🔮 Future Improvements

- Advanced post filtering
- Rich text editor
- Image optimization
- Admin dashboard
- Advanced category management
- Comment moderation
- Notification system
- Analytics
---
---

# 👨‍💻 Author

 **Aritro Mazumdar (Apon)**
- Web Developer

### GitHub

https://github.com/AritraApon


**⭐ Built with Node.js, Express.js, TypeScript, Prisma & PostgreSQL.**




