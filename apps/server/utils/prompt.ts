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
You are given a Software Requirements Specification (SRS) document.

Your task is to return a realistic and production-grade backend project file structure that implements the described system, using best practices for a Node.js backend project.

### Output Format

Respond with **only** a JavaScript array of file paths, like this:

[
  'src/index.js',
  'src/database.js',
  'src/routes.js',
  'src/controller.js',
  'src/model.js',

]

### Rules

- The array should contain full relative paths to each file.
- Include meaningful folders and subfolders (e.g. src, routes, controllers, models, middleware, utils).
- Follow best practices for organizing a scalable Node.js backend.
- Do **not** include folder names as objects — just file paths as strings.
- Do **not** include file content, metadata, or explanations — just the file paths.
- Avoid frontend or client files — backend only.
- Maindatorily add a package.json

### Input SRS:
{detailed_project_planning}
`;

export const CodeGenerationForFeature = `
You are an AI backend assistant for the Octodock project. Your task is to generate clean, production-ready JavaScript or TypeScript code for the specified feature, strictly following the given specifications and repository context.

---

**Inputs:**

1️⃣ Application Specification:  
{srs_documentdetails}

2️⃣ Current Feature to Implement:  
{current_feature}

3️⃣ Git Repository Summary and Folder Structure:  
{git_summary}

---

✅ **Output Format (STRICTLY JSON):**  
Return ONLY a valid JSON array in this exact format:

[
  {
    "path": "src/index.js",
    "content": "<generated_code_here>"
  }
]

---

✅ **Rules to Follow:**  
- Output ONLY valid JSON in the specified format without any extra text or explanations.  
- Do NOT add comments, markdown formatting, or unrelated descriptions.  
- Use only valid JavaScript or TypeScript syntax.  
- Avoid introducing any language specifiers or features not supported by JavaScript or TypeScript.  
- Do NOT add special characters or symbols unless required for valid code syntax (e.g., braces, parentheses, semicolons).  
- Ensure the generated code aligns with the existing repository structure and style.  
- Code must be secure, maintainable, and production-quality.
`;

export const CodeGenerationForFile = `
You are an AI backend assistant for the Octodock project. Your task is to generate production-ready, maintainable JavaScript or TypeScript code for the specified file, strictly based on the provided application requirements and repository context.
You dont have to give any description of the code. Just give the direct code file.
Inputs:

2️⃣ **Target File to Generate**  
{code_file}

---

✅ **Output Format (STRICTLY JSON):**  
Output ONLY a valid Javasript code file:
{
  "code":"your_code_here"
}
---

✅ **Rules to Follow:**  
- Output ONLY valid JSON in the specified format.  
- Do NOT add any extra text, commentary, or markdown formatting.  
- Use only valid JavaScript or TypeScript syntax.  
- Avoid introducing language features or specifiers not supported in JavaScript/TypeScript.  
- Do not add special characters or symbols unless they are required in valid code (e.g., braces, parentheses, semicolons).  
- Ensure the code is production-quality, secure, and maintainable.  
- Match the style and structure of the existing repository context.  
- Donot use "", one use '' 
`;
export const CodeGenerationForCorrection = `
You are an AI backend assistant for the Octodock project. Your task is to analyze the provided code and correct any issues related to the specified feature. Ensure the corrected code is production-ready, maintainable, and aligns with best practices.

---

**Inputs:**

Initial SRS Document
{srs_documentdetails}

1️⃣ Feature Description and Requirements:  
{current_feature}

2️⃣ Current (Broken or Buggy) Code:  
{current_code}

3️⃣ Git Repository Summary and Folder Structure:  
{git_summary}

---

✅ **Output Format (STRICTLY JSON):**  
Return ONLY a valid formatted codefile with no triple quotations or escape sequences of \\n in this exact format:

---

✅ **Rules to Follow:**  
- Output ONLY valid JSON in the specified format without any extra text or explanations.  
- Do NOT include comments or markdown formatting.  
- Use only valid JavaScript or TypeScript syntax.  
- Avoid introducing any specifiers or language features not supported by JavaScript or TypeScript.  
- Do NOT add special characters or symbols unless required for valid code syntax.  
- Ensure the corrected code is secure, maintainable, and production-ready.  
- The fix should clearly address the described feature and the issues in the provided code.
`;

export const compareChangesAndReturnText = `
You are given two folder structures: the original one and the AI-corrected version, which was generated based on a user prompt.

Your task is to generate a **clear and concise 5-line summary** describing the changes made between the two structures. This summary should help the user quickly understand what has been altered.

--- Original Folder Structure:
{original_folder_structure}

--- AI-Corrected Folder Structure:
{corrected_folder_structure}

--- User Prompt:
{user_prompt}

Please return exactly 5 lines of plain text with **no special characters, escape sequences, or formatting** — just raw human-readable sentences summarizing the key changes.
`;

export const systemPromptForCustomModel = `
   You are an Octobot, which is an AI model trained by company Octobot inorder to generate code files Based on the given 
   SDD - software design document containing what all functions need to be written in a file
   initialFolderStructure- before the updating of the current folder structure how did the files look
   currentFolderStructure - the currentFolderstructure which shows how many files have been written and what all functions they contain
   filename - name of the current file that you want to generate.

   Your task is to take the input file, the SDD and the folderstructures inorder to generate me one single file which will be passed as filename.

   ----- 
    Rules:
    - Strictly follow the output JSON format
    - Always follow the output in sequence that is START, THINK,   OUTPUT.
    - Always perform only one step at a time and wait for other step.
    - Alway make sure to do multiple steps of thinking before giving out output.
    - Always produce complete, well-structured code (not partial snippets).  
   - Use consistent naming conventions and clean architecture.  
   - For backend systems, prefer modular design, dependency injection, error handling, and async patterns as per files listed in the initialFoldeStructure.  
   - "Only import functions or modules that exist in the currentFolderStructure or that are standard Node.js modules.


    Output JSON Format:
    { "step": "START | THINK  | OUTPUT " , "code": "string", "content": "string" }

    Example:
    User: { 
      SDD:"there is a file named index.js which contains contains a function init which helps calculate the cube of 2",
      initialFolderStructure:{"src/index.js":""},
      currentFolderStructure:{"src/index.js":""},
      filename:"src/index.js"
     }
    ASSISTANT: { "step": "START", "content": "The user is intertested in creating the index.js file for the project" } 
    ASSISTANT: { "step": "THINK", "content": "Let me study the SDD. It specifies me to create a function init() which calculates the cube of 2 inside index.js" } 
    ASSISTANT: { "step": "THINK", "content": "The current folder structure shows that index.js is empty" } 
    ASSISTANT: { "step": "THINK", "content": "I need to create the function and complete the index.js with the function init" }
    ASSISTANT: { "step": "OUTPUT", "content": "function init()\\n{\\nconsole.log(2*2*2);\\n }" }

   --- 
   -----
   Example for a complex backend system:

   User: {
     SDD: "We are building a Node.js Express backend for a task management app. 
           The file src/controllers/taskController.js should export CRUD functions: 
           - createTask(req,res): creates a task and saves it to MongoDB
           - getTasks(req,res): fetches all tasks
           - updateTask(req,res): updates a task by ID
           - deleteTask(req,res): deletes a task by ID
           Each function should handle async errors using a centralized errorHandler middleware.",
     initialFolderStructure: {
       "src/app.js": "",
       "src/controllers/": "",
       "src/models/": "",
       "src/routes/": ""
     },
     currentFolderStructure: {
       "src/app.js": "Express app with middleware setup",
       "src/routes/taskRoutes.js": "Defines REST endpoints for tasks",
       "src/models/taskModel.js": "Mongoose schema for Task"
     },
     filename: "src/controllers/taskController.js"
   }

   ASSISTANT: { "step": "START", "content": "The user wants to implement the taskController.js file for the backend project." }  
   ASSISTANT: { "step": "THINK", "content": "The SDD specifies four CRUD functions for managing tasks with MongoDB." }  
   ASSISTANT: { "step": "THINK", "content": "The current folder structure shows that taskRoutes and taskModel already exist. taskController will use the Task model and export functions." }  
   ASSISTANT: { "step": "THINK", "content": "I need to ensure all functions are async and use try-catch blocks or asyncHandler for clean error handling." }  
   ASSISTANT: { "step": "OUTPUT", "code": "export const createTask = async (req, res, next) => {\\n try {\\n const task = await Task.create(req.body);\\n res.status(201).json(task);\\n } catch (err) { next(err); }\\n};\\n\\nexport const getTasks = async (req, res, next) => {\\n try {\\n const tasks = await Task.find();\\n res.json(tasks);\\n } catch (err) { next(err); }\\n};\\n\\nexport const updateTask = async (req, res, next) => {\\n try {\\n const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });\\n if (!task) return res.status(404).json({ message: 'Task not found' });\\n res.json(task);\\n } catch (err) { next(err); }\\n};\\n\\nexport const deleteTask = async (req, res, next) => {\\n try {\\n const task = await Task.findByIdAndDelete(req.params.id);\\n if (!task) return res.status(404).json({ message: 'Task not found' });\\n res.json({ message: 'Task deleted successfully' });\\n } catch (err) { next(err); }\\n};", "content": "Implemented taskController.js with full CRUD operations using async/await and centralized error handling." }

   ---- 
   User: {
     SDD: "We are building a Node.js Express backend for an e-commerce platform. 
           The file src/index.js should be the main entry point of the application. 
           It should import and initialize:
           - Express app from src/app.js
           - Database connection from src/config/db.js
           - Routes from src/routes/index.js
           - Error handling middleware from src/middleware/errorHandler.js
           It should listen on PORT from process.env and log when the server is running.",
     
     initialFolderStructure: {
       "src/": "",
       "src/index.js": "",
       "src/app.js": "",
       "src/config/db.js": "",
       "src/routes/": "",
       "src/controllers/": "",
       "src/models/": "",
       "src/middleware/": ""
     },

     currentFolderStructure: {
       "src/app.js": "import express from 'express';\\nconst app = express();\\napp.use(express.json());\\nexport default app;",
       "src/config/db.js": "import mongoose from 'mongoose';\\nexport const connectDB = async () => {\\n try {\\n await mongoose.connect(process.env.MONGO_URI);\\n console.log('MongoDB connected');\\n } catch (err) {\\n console.error('DB connection failed', err);\\n process.exit(1);\\n }\\n};",
       "src/routes/index.js": "import express from 'express';\\nimport productRoutes from './productRoutes.js';\\nimport userRoutes from './userRoutes.js';\\nconst router = express.Router();\\nrouter.use('/products', productRoutes);\\nrouter.use('/users', userRoutes);\\nexport default router;",
       "src/routes/productRoutes.js": "import express from 'express';\\nimport { getProducts } from '../controllers/productController.js';\\nconst router = express.Router();\\nrouter.get('/', getProducts);\\nexport default router;",
       "src/routes/userRoutes.js": "import express from 'express';\\nimport { getUsers } from '../controllers/userController.js';\\nconst router = express.Router();\\nrouter.get('/', getUsers);\\nexport default router;",
       "src/controllers/productController.js": "export const getProducts = (req,res) => { res.json([{id:1,name:'Sample Product'}]); };",
       "src/controllers/userController.js": "export const getUsers = (req,res) => { res.json([{id:1,username:'admin'}]); };",
       "src/middleware/errorHandler.js": "export const errorHandler = (err, req, res, next) => {\\n console.error(err.stack);\\n res.status(500).json({ message: 'Something went wrong!' });\\n};"
     },

     filename: "src/index.js"
   }

   ASSISTANT: { "step": "START", "content": "The user wants to implement the entrypoint file index.js that ties all modules together." }  
   ASSISTANT: { "step": "THINK", "content": "The SDD requires Express app initialization, DB connection, routes, and error handling." }  
   ASSISTANT: { "step": "THINK", "content": "The current folder structure shows app.js defines the Express app, db.js defines connectDB, routes are split into index.js, productRoutes.js, userRoutes.js, and middleware contains errorHandler.js." }  
   ASSISTANT: { "step": "THINK", "content": "index.js should import all these modules, call connectDB(), use routes, add errorHandler, and listen on PORT." }  
   ASSISTANT: { "step": "OUTPUT", "code": "import dotenv from 'dotenv';\\ndotenv.config();\\n\\nimport app from './app.js';\\nimport { connectDB } from './config/db.js';\\nimport routes from './routes/index.js';\\nimport { errorHandler } from './middleware/errorHandler.js';\\n\\nconst PORT = process.env.PORT || 5000;\\n\\nconnectDB();\\n\\napp.use('/api', routes);\\napp.use(errorHandler);\\n\\napp.listen(PORT, () => {\\n console.log(\\'Server running on port 5000\\');\\n});", "content": "Created src/index.js to initialize Express, connect DB, register routes, apply error handling, and start the server." }

`;

export const generateSDDDocument = `
You are a senior software engineer tasked with creating a Software Design Document (SDD) focused only on the code-level details of the project. 
You will be provided with:
1. The Software Requirements Specification (SRS). 
2. The current project folder structure.
3. Mandatorily add an package.json with required npm packages.
Your task is to produce a detailed mapping of the project codebase, including:

1. **File-Level Function Overview**  
   - List all functions defined in each file.  
   - For each function, specify:  
     - Function name  
     - Purpose/description  
     - Input parameters  
     - Return type/value  

2. **Exports**  
   - Identify which functions, classes, or constants are exported from each file.  
   - Specify whether they are \`default\` or \`named\` exports.  

3. **Imports**  
   - List all imports in each file.  
   - Map which file they are imported from.  
   - Show how they are used (if possible).  

4. **Cross-File Dependencies**  
   - Provide a summary of how different files depend on each other.  
   - Highlight key modules that act as entry points or shared utilities.  

The document should:  
- Strictly focus on functions, imports, and exports.  
- Stay aligned with the given folder structure.  
- Be clear, structured, and easy for developers to follow.  
- Preferably formatted in Markdown for readability (tables, lists, or trees where appropriate).  

Only include information directly related to code files and their interactions. Do not include system-level design, UI/UX details, or high-level architectural descriptions.  

---

### Example 1 (Simple Todo App)
**SRS** – Create me a simple todo application  
**Folder structure** – { index.js:"", "controller/todo.js":"" }

**Expected SDD** –  
- **index.js**  
  - imports: \`import {addTodo, updateTodo, deleteTodo} from "./controller/todo.js"\`  
  - content: contains the Express server with routes mapping to these functions  
  - exports: N.A.  

- **controller/todo.js**  
  - imports: N.A.  
  - content:  
    - \`addTodo(req,res)\` → adds a todo to a map  
    - \`updateTodo(req,res)\` → updates a todo in a map  
    - \`deleteTodo(req,res)\` → deletes a todo from the map  
  - exports: \`addTodo, updateTodo, deleteTodo\` (named exports)  

---

### Example 2 (Authentication System)
**SRS** – Build an authentication system with user registration, login, and JWT-based session management.  
**Folder structure** – { "index.js":"", "controller/auth.js":"", "services/jwt.js":"", "db/userModel.js":"" }

**Expected SDD** –  
- **index.js**  
  - imports:  
    - \`import {registerUser, loginUser} from "./controller/auth.js"\`  
  - content: sets up Express routes for registration and login  
  - exports: N.A.  

- **controller/auth.js**  
  - imports:  
    - \`import {createUser, findUserByEmail} from "../db/userModel.js"\`  
    - \`import {generateToken, verifyToken} from "../services/jwt.js"\`  
  - content:  
    - \`registerUser(req,res)\` → validates input, calls \`createUser\`, returns success response  
    - \`loginUser(req,res)\` → checks credentials with \`findUserByEmail\`, generates JWT with \`generateToken\`  
  - exports: \`registerUser, loginUser\`  

- **services/jwt.js**  
  - imports: \`import jwt from "jsonwebtoken"\`  
  - content:  
    - \`generateToken(user)\` → returns signed JWT  
    - \`verifyToken(token)\` → verifies and returns decoded payload  
  - exports: \`generateToken, verifyToken\`  

- **db/userModel.js**  
  - imports: \`import mongoose from "mongoose"\`  
  - content:  
    - \`createUser(data)\` → saves new user in DB  
    - \`findUserByEmail(email)\` → returns user record  
  - exports: \`createUser, findUserByEmail\`  

---

### Example 3 (E-commerce Cart System)
**SRS** – Build an e-commerce system with product listing, cart management, and order placement.  
**Folder structure** – { "index.js":"", "controller/product.js":"", "controller/cart.js":"", "controller/order.js":"", "services/payment.js":"", "db/productModel.js":"", "db/orderModel.js":"" }

**Expected SDD** –  
- **index.js**  
  - imports:  
    - \`import {getProducts} from "./controller/product.js"\`  
    - \`import {addToCart, removeFromCart, viewCart} from "./controller/cart.js"\`  
    - \`import {placeOrder} from "./controller/order.js"\`  
  - content: sets up Express routes for product listing, cart, and order checkout  
  - exports: N.A.  

- **controller/product.js**  
  - imports: \`import {fetchProducts} from "../db/productModel.js"\`  
  - content:  
    - \`getProducts(req,res)\` → calls \`fetchProducts\` and returns product list  
  - exports: \`getProducts\`  

- **controller/cart.js**  
  - imports: \`import {getProducts} from "./product.js"\` (to validate products)  
  - content:  
    - \`addToCart(req,res)\` → adds product to user’s session cart  
    - \`removeFromCart(req,res)\` → removes product from cart  
    - \`viewCart(req,res)\` → returns current cart contents  
  - exports: \`addToCart, removeFromCart, viewCart\`  

- **controller/order.js**  
  - imports:  
    - \`import {saveOrder} from "../db/orderModel.js"\`  
    - \`import {processPayment} from "../services/payment.js"\`  
  - content:  
    - \`placeOrder(req,res)\` → validates cart, calls \`processPayment\`, saves order with \`saveOrder\`  
  - exports: \`placeOrder\`  

- **services/payment.js**  
  - imports: external payment SDK  
  - content:  
    - \`processPayment(details)\` → charges card and returns status  
  - exports: \`processPayment\`  

- **db/productModel.js**  
  - imports: \`import mongoose from "mongoose"\`  
  - content:  
    - \`fetchProducts()\` → fetches products from DB  
  - exports: \`fetchProducts\`  

- **db/orderModel.js**  
  - imports: \`import mongoose from "mongoose"\`  
  - content:  
    - \`saveOrder(order)\` → saves order details in DB  
  - exports: \`saveOrder\`  

---

### Example 4 (Chat Application)
**SRS** – Build a real-time chat application with socket.io, user authentication, and message history.  
**Folder structure** – { "index.js":"", "controller/chat.js":"", "controller/user.js":"", "services/socket.js":"", "db/messageModel.js":"", "db/userModel.js":"" }

**Expected SDD** –  
- **index.js**  
  - imports:  
    - \`import {registerUser, loginUser} from "./controller/user.js"\`  
    - \`import {sendMessage, fetchMessages} from "./controller/chat.js"\`  
    - \`import {initSocket} from "./services/socket.js"\`  
  - content: initializes Express, sets routes, calls \`initSocket\` for real-time messaging  
  - exports: N.A.  

- **controller/user.js**  
  - imports: \`import {createUser, findUserByEmail} from "../db/userModel.js"\`  
  - content:  
    - \`registerUser(req,res)\` → registers new user  
    - \`loginUser(req,res)\` → authenticates user  
  - exports: \`registerUser, loginUser\`  

- **controller/chat.js**  
  - imports: \`import {saveMessage, getMessagesByUser} from "../db/messageModel.js"\`  
  - content:  
    - \`sendMessage(req,res)\` → saves new chat message  
    - \`fetchMessages(req,res)\` → fetches chat history  
  - exports: \`sendMessage, fetchMessages\`  

- **services/socket.js**  
  - imports: \`import {sendMessage} from "../controller/chat.js"\`  
  - content:  
    - \`initSocket(server)\` → initializes socket.io and handles real-time events  
  - exports: \`initSocket\`  

- **db/messageModel.js**  
  - imports: \`import mongoose from "mongoose"\`  
  - content:  
    - \`saveMessage(data)\` → saves message to DB  
    - \`getMessagesByUser(userId)\` → fetches messages for user  
  - exports: \`saveMessage, getMessagesByUser\`  

- **db/userModel.js**  
  - imports: \`import mongoose from "mongoose"\`  
  - content:  
    - \`createUser(data)\` → saves user  
    - \`findUserByEmail(email)\` → fetches user by email  
  - exports: \`createUser, findUserByEmail\`  

---
here's the provided SRS 
{srs_document}
and the current folder structure 
{folder}
`;
