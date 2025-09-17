// src/index.ts
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { connectDB } from './db';
import { todoRoutes } from './routes/todoRoutes';

const server = Fastify({ logger: true });

async function start() {
  await connectDB();

  await server.register(cors, {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  // ✅ Register todo routes with prefix
  server.register(todoRoutes, { prefix: '/todos' });

  try {
    await server.listen({ port: 3000 });
    console.log('Server running on http://localhost:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
