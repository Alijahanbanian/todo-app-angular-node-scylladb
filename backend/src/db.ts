import { Client } from 'cassandra-driver';

let client: Client;

export async function connectDB() {
  // Connect WITHOUT specifying keyspace first
  client = new Client({
    contactPoints: ['localhost'],
    localDataCenter: 'datacenter1'
  });

  await client.connect();

  // Create keyspace if it doesn't exist
  await client.execute(`
    CREATE KEYSPACE IF NOT EXISTS todo_app
    WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'}
  `);

  // Now switch client to use the new keyspace
  client = new Client({
    contactPoints: ['localhost'],
    localDataCenter: 'datacenter1',
    keyspace: 'todo_app'
  });

  await client.connect();

  // Create todos table
  await client.execute(`
    CREATE TABLE IF NOT EXISTS todos (
      id UUID PRIMARY KEY,
      title text,
      done boolean
    )
  `);
}

export { client };
