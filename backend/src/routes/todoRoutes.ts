import { FastifyInstance } from 'fastify';
import { client } from '../db';
import { v4 as uuidv4 } from 'uuid';

export async function todoRoutes(server: FastifyInstance) {
  
  server.get('/', async () => {
    const result = await client.execute('SELECT * FROM todos');
    return result.rows;
  });

  
  server.post('/', async (request) => {
    const { title, done } = request.body as { title: string; done?: boolean };
    const id = uuidv4();
    await client.execute('INSERT INTO todos (id, title, done) VALUES (?, ?, ?)', [id, title, done ?? false], { prepare: true });
    return { id, title, done: done ?? false };
  });

 
  server.put('/:id', async (request) => {
    const { id } = request.params as { id: string };
    const { title, done } = request.body as { title: string; done: boolean };
    await client.execute('UPDATE todos SET title = ?, done = ? WHERE id = ?', [title, done, id], { prepare: true });
    return { id, title, done };
  });

  
  server.delete('/:id', async (request) => {
    const { id } = request.params as { id: string };
    await client.execute('DELETE FROM todos WHERE id = ?', [id], { prepare: true });
    return { success: true };
  });
}
