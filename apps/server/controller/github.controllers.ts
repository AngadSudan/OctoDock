import prisma from "../utils/prisma";
import { Octokit } from "octokit";
class githubController {
  token: string;
  octokit: Octokit;
  constructor(token: string) {
    this.token = token;
    this.octokit = new Octokit({
      auth: token,
    });
  }

  async createRepository(name: string, description: string): Promise<any> {
    try {
      console.log(name);
      console.log(description);
      console.log(this.token);
      const newRepo = await this.octokit.rest.repos.createForAuthenticatedUser({
        name,
        auto_init: true,
        // headers: {
        //   authorization: `Authorization: Bearer ${this.token}`,
        // },
      });
      console.log(JSON.stringify(newRepo));
      const repoInformation = {
        url: newRepo.data.url,
        name: newRepo.data.name,
        userInfo: newRepo.data.owner,
      };
      // console.log(repoInformation)
      return repoInformation;
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
      return null;
    }
  }
  async archiveRepository(owner: string, repo: string) {
    try {
      const projectData = await this.octokit.rest.repos.update({
        owner,
        repo,
        archived: true,
      });

      if (!projectData || !projectData.data.archived)
        throw new Error("Project couldn't be archived");

      return "OK";
    } catch (error) {
      console.error("Error archiving repo:", error);
      return null;
    }
  }

  async updateRepository(
    owner: string,
    url: string,
    name: string,
    description
  ) {
    try {
      const projectData = await this.octokit.rest.repos.update({
        owner,
        repo: url,
        name,
        description,
      });
      if (!projectData) throw new Error("project couldn't be initialized");
      return "OK";
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async commitCodeToGithub(projectId: string): Promise<any> {
    try {
      const dbProject = await prisma.project.findUnique({
        where: {
          id: projectId,
        },
      });

      if (!dbProject) {
        console.log("project is not listed!");
        return null;
      }

      let projectURL = dbProject.githubUrl;
      projectURL = projectURL.replace("https://github.com", "");
      projectURL = projectURL.replace(".git", "");
      const repoData = projectURL.split("/");
      const userName = repoData[0];
      const repoName = repoData[1];

      const createdCommit = await this.createCommit(userName, repoName);

      if (!createdCommit) throw new Error("commit couln't be updated");
      return "OK";
    } catch (error: any) {
      console.log(error);
    }
  }

  async getFolderandFileContentfromstackblitz(): Promise<any[]> {
    return [
      {
        path: "backend/src/index.ts",
        content: `
import express from 'express';
import todoRoutes from './routes/todos';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/todos', todoRoutes);
app.listen(3001, () => console.log('Backend running on http://localhost:3001'));
`,
      },

      {
        path: "backend/src/routes/todos.ts",
        content: `
import express from 'express';
import { getTodos, createTodo, toggleTodo, deleteTodo } from '../controllers/todo.controller';
const router = express.Router();
router.get('/', getTodos);
router.post('/', createTodo);
router.patch('/:id/toggle', toggleTodo);
router.delete('/:id', deleteTodo);
export default router;
`,
      },

      {
        path: "backend/src/controllers/todo.controller.ts",
        content: `
import prisma from '../prisma/client';

export const getTodos = async (_, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
};

export const createTodo = async (req, res) => {
  const { title } = req.body;
  const todo = await prisma.todo.create({ data: { title } });
  res.json(todo);
};

export const toggleTodo = async (req, res) => {
  const id = parseInt(req.params.id);
  const existing = await prisma.todo.findUnique({ where: { id } });
  const updated = await prisma.todo.update({ where: { id }, data: { completed: !existing?.completed } });
  res.json(updated);
};

export const deleteTodo = async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.todo.delete({ where: { id } });
  res.sendStatus(204);
};
`,
      },

      {
        path: "backend/src/prisma/client.ts",
        content: `
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default prisma;
`,
      },

      {
        path: "backend/prisma/schema.prisma",
        content: `
generator client {
  provider = "prisma-client-js"
}
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
model Todo {
  id        Int      @id @default(autoincrement())
  title     String
  completed Boolean  @default(false)
}
`,
      },

      { path: "backend/.env", content: `DATABASE_URL="file:./dev.db"` },

      {
        path: "backend/package.json",
        content: `
{
  "name": "todo-backend",
  "type": "module",
  "scripts": {
    "dev": "nodemon src/index.ts",
    "generate": "prisma generate",
    "migrate": "prisma migrate dev"
  },
  "dependencies": {
    "@prisma/client": "^5.0.0",
    "express": "^4.18.2",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "prisma": "^5.0.0",
    "typescript": "^5.0.0",
    "nodemon": "^3.0.0"
  }
}
`,
      },

      {
        path: "frontend/src/main.tsx",
        content: `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
`,
      },

      {
        path: "frontend/src/App.tsx",
        content: `
import React, { useEffect, useState } from 'react';
import { fetchTodos, addTodo, toggleTodo, deleteTodo } from './api';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTodos().then(setTodos);
  }, []);

  const handleAdd = async () => {
    const newTodo = await addTodo(title);
    setTodos([...todos, newTodo]);
    setTitle("");
  };

  return (
    <div>
      <h1>📝 Todo List</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};
export default App;
`,
      },

      {
        path: "frontend/src/components/TodoList.tsx",
        content: `
import React from 'react';
import { toggleTodo, deleteTodo } from '../api';

const TodoList = ({ todos, setTodos }) => {
  const handleToggle = async (id) => {
    const updated = await toggleTodo(id);
    setTodos(todos.map(t => t.id === id ? updated : t));
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input type="checkbox" checked={todo.completed} onChange={() => handleToggle(todo.id)} />
          {todo.title}
          <button onClick={() => handleDelete(todo.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
`,
      },

      {
        path: "frontend/src/api.ts",
        content: `
const API = "http://localhost:3001/api/todos";

export const fetchTodos = async () => (await fetch(API)).json();
export const addTodo = async (title) => (
  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  })
).json();

export const toggleTodo = async (id) => (
  await fetch(\`\${API}/\${id}/toggle\`, { method: 'PATCH' })
).json();

export const deleteTodo = async (id) => (
  await fetch(\`\${API}/\${id}\`, { method: 'DELETE' })
);
`,
      },

      {
        path: "frontend/vite.config.ts",
        content: `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({ plugins: [react()] });
`,
      },

      {
        path: "frontend/index.html",
        content: `
<!DOCTYPE html>
<html lang="en">
  <head><meta charset="UTF-8" /><title>Todo App</title></head>
  <body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body>
</html>
`,
      },

      {
        path: "shared/models/todo.ts",
        content: `
export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};
`,
      },

      {
        path: "README.md",
        content: `
# 📝 Fullstack Todo App

- Backend: Node.js + Express + Prisma
- Frontend: React + Vite
- Database: SQLite/Postgres

## Setup

1. \`cd backend && npm install && npm run migrate && npm run dev\`
2. \`cd frontend && npm install && npm run dev\`
`,
      },

      {
        path: ".gitignore",
        content: `
node_modules
.env
dist
*.db
`,
      },
    ];
  }
  async createBlobs(owner: string, repo: string, folder: any[]): Promise<any> {
    const blobPromises = folder.map(async (file) => {
      const createdBlob = await this.octokit.rest.git.createBlob({
        owner,
        repo,
        content: file.content,
        encoding: "utf-8",
      });
      console.log(
        "Blob created for:",
        file.path,
        "with SHA:",
        createdBlob.data.sha
      );
      return {
        path: file.path,
        mode: "100644",
        type: "blob",
        sha: createdBlob.data.sha,
      };
    });

    return await Promise.all(blobPromises);
  }

  async createTree(
    owner: string,
    repo: string,
    treeEntries: any[]
  ): Promise<any> {
    const response = await this.octokit.rest.git.createTree({
      owner: owner,
      repo: repo,
      tree: treeEntries,
    });
    return response.data.sha;
  }
  async createCommit(owner: string, repo: string) {
    const folder = await this.getFolderandFileContentfromstackblitz();

    const blobEntries = await this.createBlobs(owner, repo, folder);
    console.log("All blobs created successfully");

    const treeSha = await this.createTree(owner, repo, blobEntries);
    console.log("Tree created successfully with sha:", treeSha);

    const { data: refData } = await this.octokit.rest.git.getRef({
      owner: owner,
      repo: repo,
      ref: "heads/main",
    });
    const latestCommitSha = refData.object.sha;
    console.log("✅ Latest commit on main:", latestCommitSha);

    const response = await this.octokit.rest.git.createCommit({
      owner: owner,
      repo: repo,
      message: "Octodock commit for your project success",
      tree: treeSha,
      parents: [latestCommitSha],
    });

    return response.data.sha;
  }
}
export default githubController;
