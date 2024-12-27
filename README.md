<h1 align="center">Bob Farm</h1>

<p align="center">
  <a href="https://nodejs.org/docs/latest-v20.x/api/index.html"><img src="https://img.shields.io/badge/node-20.x-green.svg" alt="node"/></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-5.x-blue.svg" alt="typescript"/></a>
  <a href="https://docs.nestjs.com/v10/"><img src="https://img.shields.io/badge/npm-10.x-red.svg" alt="npm"/></a>
  <a href="https://fastify.dev/"><img src="https://img.shields.io/badge/Web_Framework-Fastify_⚡-black.svg" alt="fastify"/></a>
  <a href="https://swc.rs/"><img src="https://img.shields.io/badge/Compiler-SWC_-orange.svg" alt="swc"/></a>
  <a href="https://vitest.dev/"><img src="https://img.shields.io/badge/Test-Vitest_-yellow.svg" alt="swc"/></a>
  <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Dockerized 🐳_-blue.svg" alt="docker"/></a>
</p>
<p align="center">
  <a href="https://eventual-latrina-mindstartups-7bf1969e.koyeb.app/api/docs" target="_blank"><strong>DEMO Backend</strong></a>
  <a href="https://bob-farm.vercel.app/login" target="_blank"><strong>DEMO Website</strong></a>
</p>

## 🚀 Technologies Used

- **[Node.js](https://nodejs.org/docs/latest-v20.x/api/index.html)**: JavaScript runtime environment for backend development.  
- **[NestJS](https://docs.nestjs.com/v10/)**: A progressive Node.js framework for building efficient and scalable server-side applications.  
- **[NX](https://nx.dev/)**: A powerful build system with a modern monorepo approach.  
- **[TypeScript](https://www.typescriptlang.org/)**: Enhances JavaScript with static typing and modern features.  
- **[Prisma](https://www.prisma.io/)**: A modern ORM for database schema management and queries.  
- **[SWC](https://swc.rs/)**: Super-fast JavaScript and TypeScript compiler.  
- **[Docker](https://www.docker.com/)**: Containerization for consistent and portable environments.  

## 🛠️ Project Structure

This project is a monorepo managed with NX and consists of two applications:  

1. **Server**: A NestJS-based backend application for managing APIs and data.  
2. **Website**: A frontend web application deployed on Vercel.  

## 🛠️ Prerequisites

Ensure you have the following installed:  

- **[Node.js](https://nodejs.org/en/download/)**: JavaScript runtime environment.  
- **[Docker](https://docs.docker.com/get-docker/)**: For containerized development.  
- **[Git](https://git-scm.com/downloads)**: Version control system.  

## 🧑‍💻 Development Setup

1. **Clone the repository**:  

```bash
git clone https://github.com/frfernandezdev/bob-farm.git  
cd bob-farm  
```  

2. **Create a `.env` file**:  

```bash
cp .env.example .env  
```  

3. **Install dependencies using PNPM**:  

```bash
pnpm install  
```  

4. **Start the development environment**:  
   - **Server**:  

   ```bash
   nx run server:serve:development  
   ```  

   - **Website**:  

   ```bash
   nx run website:dev  
   ```
   
5. **Stop the environment**:  

```bash
nx stop  
```  

## 📦 Database Service

This project uses a PostgreSQL database service defined in `docker-compose.yml` with the service name `pgsql`. Ensure Docker is running, then start the service with:  

```bash
docker-compose up -d pgsql  
```  

## ⚙️ Building the Project

To compile the applications, run:  

- **Server**:  

```bash
nx build server  
```  

- **Website**:  

```bash
nx build website  
```  

## 📦 Database Migration

1. **Generate Prisma client**:  

```bash
nx server:generate  
```  

2. **Apply migrations**:  

```bash
nx server:migrate:dev  
```  

## 🚢 Deployment

This project supports deployment to both [Koyeb](https://www.koyeb.com/) and [Vercel](https://vercel.com/):  

### Deploying to Koyeb

The **server** is deployed to Koyeb. Changes pushed to the `main` branch trigger a build and deploy pipeline on Koyeb. Access the production environment via the provided Koyeb URL.  

### Deploying to Vercel

The **website** is deployed to Vercel. For further information, visit the [Vercel Documentation](https://vercel.com/docs).  
