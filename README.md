Task Management Application

A full-stack Task Management Application built using the MERN stack (MongoDB, Express, React, Node.js).

This project demonstrates secure authentication, protected routes, full CRUD functionality, pagination, filtering, and a clean user interface.
____________________________________________________________________________________________________________

Tech Stack:-

Backend:

Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
HTTP-only Cookies
bcrypt (Password hashing)

Frontend:

React (Create React App)
React Router
Axios
Custom CSS (clean UI)

_______________________________________________________________________________________________________________

Authentication System:-

User Registration (Password hashed using bcrypt)
Secure Login using JWT
JWT stored in HTTP-only cookie
Protected API routes using middleware
Logout clears authentication cookie
Protected frontend routes using ProtectedRoute component

______________________________________________________________________________________________________________

Task Management Features:-

Each authenticated user can:

Create tasks
View their own tasks
Update tasks
Delete tasks
Filter tasks by status
Search tasks by title
Navigate using pagination
Tasks are user-specific and cannot be accessed by other users.

_________________________________________________________________________________________________________________

Advanced Features:-

Pagination implemented on backend and frontend
Search and status filtering via query parameters
Loading states for better UX
Disabled buttons during API calls
Clean and structured folder architecture
Secure cookie configuration for production readiness

___________________________________________________________________________________________________________________

Project Structure:-

Task_Management_App/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── utils/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
⚙️ Environment Variables

____________________________________________________________________________________________________________________

Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskmanager
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1d
NODE_ENV=development

____________________________________________________________________________________________________________________

How to Run Locally:-

1. Clone the repository
git clone https://github.com/hari-om0303/Task_Manag_App

2. Setup Backend
cd backend
npm install
npm run dev

Backend runs on:
http://localhost:5000

3. Setup Frontend
cd frontend
npm install
npm start

Frontend runs on:
http://localhost:3000

___________________________________________________________________________________________________________________

API Endpoints Overview:-

Auth Routes:

POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
POST /api/auth/logout

Task Routes:

POST /api/tasks
GET /api/tasks?page=1&limit=5&search=&status=
PUT /api/tasks/:id
DELETE /api/tasks/:id

_________________________________________________________________________________________________________________

Security Considerations:-

Passwords are hashed before storage.
JWT is stored in HTTP-only cookie.
Cookie security settings differ between development and production.
Routes are protected using authentication middleware.
Each task is linked to a specific user.

____________________________________________________________________________________________________________________

Design Decisions:-

This project was structured with separation of concerns:
Routes → Controllers → Middleware → Models
Reusable frontend components
Centralized API service using Axios
Clean state management using React Hooks
