# Full-Stack Todo App

A full-stack **Todo Application** built with **Angular** for the frontend and **Node.js + Express + TypeScript + ScyllaDB** for the backend. This project showcases CRUD operations, RESTful API integration, and scalable database management with ScyllaDB.

---

## Features
- Create, read, update, and delete todos
- RESTful API powered by Express and TypeScript
- ScyllaDB for high-performance, scalable data storage
- Responsive Angular frontend
- Type-safe data models
- Clean, modular project structure

---

## Tech Stack
**Frontend**  
- Angular  
- TypeScript  
- Angular Material (optional)

**Backend**  
- Node.js  
- Express.js  
- TypeScript  
- ScyllaDB (Cassandra-compatible database)

**Database**  
- ScyllaDB (run locally via Docker)

---

## Project Structure
```
todo/
├── backend/                    # Node.js + Express + TypeScript API
│   ├── src/
│   │   ├── index.ts           # Server entry point
│   │   ├── db.ts              # ScyllaDB connection logic
│   │   ├── routes/
│   │   │   └── todoRoutes.ts  # Todo CRUD API routes
│   │   └── types/
│   │       └── todo.ts        # Todo type definitions
│   ├── package.json
│   └── tsconfig.json
│
└── todo-frontend/              # Angular frontend
    ├── src/                   # Angular app source
    ├── angular.json
    ├── package.json
    └── tsconfig.json
```

---

## Installation & Setup

###  Clone the Repository

###  Backend Setup
1. **Install Dependencies**  
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment Variables**  
   Create a `.env` file in the `backend/` directory with the following content:
   ```
   SCYLLA_CONTACT_POINTS=127.0.0.1
   SCYLLA_LOCAL_DATACENTER=datacenter1
   SCYLLA_KEYSPACE=todo_app
   PORT=3000
   ```

3. **Run ScyllaDB (via Docker)**  
   ```bash
   docker run --name scylla -d -p 9042:9042 scylladb/scylla
   ```

4. **Create Keyspace and Table**  
   Connect to ScyllaDB using `cqlsh`:
   ```bash
   docker exec -it scylla cqlsh
   ```
   Then execute:
   ```sql
   CREATE KEYSPACE IF NOT EXISTS todo_app
       WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

   USE todo_app;

   CREATE TABLE IF NOT EXISTS todos (
       id UUID PRIMARY KEY,
       title TEXT,
       description TEXT,
       completed BOOLEAN
   );
   ```

5. **Start Backend Server**  
   ```bash
   npm run dev
   ```
   The server will run at `http://localhost:3000`.

###  Frontend Setup
1. **Install Dependencies**  
   ```bash
   cd ../todo-frontend
   npm install
   ```

2. **Start Frontend Server**  
   ```bash
   ng serve
   ```
   The app will run at `http://localhost:4200`.

---

## API Endpoints
| Method | Endpoint         | Description           |
|--------|------------------|-----------------------|
| GET    | `/todos`        | Retrieve all todos    |
| POST   | `/todos`        | Create a new todo     |
| PUT    | `/todos/:id`    | Update a todo         |
| DELETE | `/todos/:id`    | Delete a todo         |

**Sample POST `/todos` Request Body**:
```json
{
    "title": "Learn ScyllaDB",
    "description": "Study integration with Node.js",
    "completed": false
}
```

## Development Scripts

### Backend
- `npm run dev` → Start server in development mode
- `npm run build` → Compile TypeScript code
- `npm start` → Run compiled code

### Frontend
- `ng serve` → Run development server
- `ng build` → Build for production
