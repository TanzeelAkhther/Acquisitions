# Acquisitions API
A **scalable, production-ready API** built with **Node.js, Express, Drizzle ORM, and JWT Authentication**.
This project is designed with best practices in mind — modular structure, validation, logging, and environment-based configuration — making it easy to extend and deploy in real-world environments.

# ✨Features
- 🔐 Authentication with JWT (Login & Register flow)

- 🗂️ Modular structure (controllers, services, models, routes)

- 🗄️ Database integration with Drizzle ORM

- 📝 Request validation using validation schemas

- 📑 Centralized logging with winston (logs saved in logs/)

- ⚙️ Environment-based config (.env, .env.example)

- 🎯 Production-ready setup (eslint, prettier, gitignore)

# 🛠️TechStack
- Javascript
- Express.js
- Drizzle ORM
- JWT for authentication
- Winston for logging
- ESLint + Prettier for code quality

# 📂Project Structure
```
src/
├── index.js              # Entry point
├── app.js                # Express app setup
├── server.js             # Server configuration
│
├── config/
│   ├── database.js       # DB connection setup
│   └── logger.js         # Logger configuration
│
├── controllers/
│   └── auth.controller.js # Auth controller logic
│
├── routes/
│   └── auth.routes.js     # Auth endpoints
│
├── services/
│   └── auth.service.js    # Business logic for authentication
│
├── models/
│   └── user.model.js      # User model (Drizzle schema)
│
├── utils/
│   ├── jwt.js             # JWT helper functions
│   ├── cookies.js         # Cookie handling
│   └── format.js          # Utility formatters
│
├── validations/
│   └── auth.validations.js # Request validation rules
│
logs/
├── error.log              # Error logs
└── combined.log           # General logs
```

