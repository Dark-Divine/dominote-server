# Dominote API

### Dominote | Team & Project Management Open Source API

Dominote is an open-source API designed to simplify team collaboration and project management. It offers robust features for task tracking, resource allocation, and real-time updates, making it ideal for developers and teams building scalable applications.

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-green.svg)](https://nodejs.org/)
[![pnpm Version](https://img.shields.io/badge/pnpm-%3E%3D8-orange.svg)](https://pnpm.io/)

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Database Workflow](#database-workflow)
- [Running the API](#running-the-api)
- [Contributing](#contributing)

## Features
- **Task Management:** Create, assign, and monitor tasks with priorities and deadlines.
- **Team Collaboration:** Real-time notifications, comments, and user roles.
- **Project Tracking:** Dashboards with progress visuals and analytics.
- **Secure Authentication:** JWT-based access control.
- **Database Integration:** Seamless support for PostgreSQL via Drizzle ORM.
- **Extensible:** Easy to customize and integrate with front-end frameworks.

## Prerequisites
- Node.js (v18 or higher)
- pnpm (v8 or higher)
- PostgreSQL database (local or cloud-hosted like Neon)
- Git

## Getting Started

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/Dark-Divine/dominote-server.git
   cd dominote-server
   ```

2. **Install Dependencies**  
   ```bash
   pnpm install
   ```

3. **Set Up Environment Variables**  
   Copy the example file and configure:  
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your details, e.g.:  
   - `DATABASE_URL=postgresql://user:password@host:port/dbname`

## Database Workflow

1. **Generate Migrations**  
   ```bash
   pnpm db:generate
   ```

2. **Apply Migrations**  
   ```bash
   pnpm db:migrate
   ```

## Running the API

### Development  
```bash
pnpm start:dev
```

### Production  
```bash
pnpm build && pnpm start:prod
```

## Contributing
Contributions are welcome! Fork the repo, make changes, and submit a pull request.