export const enhanceUserGivenProjectDescription = `
You are an expert product designer and software architect. Your job is to transform a very simple user project idea or requirement into a **complete, detailed product specification** for building a backend application.

When you enhance the idea, add all relevant details that a developer or architect would need to design and build the backend system.

**For the enhancement, please provide these sections clearly labeled:**

1. Functional Features
   - User stories or functional capabilities.
   - Describe the core features users will have.

2. Data Models
   - List all entities and their relevant fields.
   - Define relationships if any.

3. API Endpoints
   - Suggest RESTful (or other) endpoints with HTTP methods, paths, and purpose.

4. Storage / Database Suggestions
   - Recommend type of database (SQL/NoSQL).
   - Include schema suggestions if helpful.

5. Authentication and Security Considerations
   - Outline how users authenticate.
   - Include security best practices (password hashing, tokens, etc.).

6. Non-functional Requirements
   - Scalability, performance, monitoring, logging, error handling, etc.

7. Suggested Tech Stack
   - Programming language(s), frameworks, database choice, hosting/deployment options.

**Example input:**
"I want the backend for a to-do application"

**Expected output (example):**

**Functional Features**
- User registration and login
- CRUD operations for to-do items
- Assign due dates and reminders
- Support for tags and categories
- Mark tasks as complete/incomplete
- User-specific task lists
- Share lists with other users
- Activity log

**Data Models**
- User: id, username, email, passwordHash
- ToDoItem: id, title, description, dueDate, isComplete, userId
- Tag: id, name, userId

**API Endpoints**
- POST /register - User signup
- POST /login - User login
- GET /todos - List user’s to-do items
- POST /todos - Create a new to-do item
- PUT /todos/:id - Update to-do item
- DELETE /todos/:id - Delete to-do item

**Storage / Database Suggestions**
- Use PostgreSQL with a relational schema

**Authentication and Security Considerations**
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control

**Non-functional Requirements**
- Logging, monitoring
- Graceful error handling
- Rate limiting

**Suggested Tech Stack**
- Language: Node.js with Express
- Database: Mongodb
- Hosting: Vercel

**Instructions for response:**  
Write your answer in clear, organized sections with headings. Provide relevant details automatically, even if the user's input is very short or vague. Don't alter the language and database and hosting options ever. Also strictly do not add extra special characters for formatting. KEEP IT STRICTLY TO THE DESIGN PROVIDED ABOVE.

THIS IS THE USER PROMPT {user_description}
`;

export const generateFileStructurePrompt = `
You are given an SRS (Software Requirements Specification) document. Based on that SRS, generate the full backend project folder and file structure that implements it.

Please return the entire result as a single JSON object in the following format:

js
Copy
Edit
const files = {
  // This is a directory - provide its name as a key
  src: {
    // Because it's a directory, add the "directory" key
    directory: {
      // This is a file - provide its path as a key:
      'main.js': {
        // Because it's a file, add the "file" key
        file: {
          contents: \`
            console.log('Hello from WebContainers!')
          \`,
        },
      },
    },
  },
};
Rules:

The top-level must be an object with one or more directories (e.g. src).

Each directory has a "directory" key whose value is an object of files and subdirectories.

Each file has a "file" key with a "contents" field (a string with the code).

Nest subfolders as needed for good project organization (e.g. controllers, routes, models, middleware, utils).

Include realistic placeholder or starter code for each file (e.g. Express server setup, Mongoose models, routes).

Use best practices for Node.js backend structure.

Return only the JSON object in the response — no extra text, no explanation.

The goal is to produce a complete, realistic, production-ready backend project structure that can be imported into StackBlitz or WebContainers directly.

Here's the SRS {detailed_project_planning}
`;
