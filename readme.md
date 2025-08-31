Task Manager App
A cross-platform Task Manager App built for the Vexocore IT Services Pvt. Ltd. internship application. Features user authentication (JWT), task CRUD operations, status toggling, and push notifications via Firebase. The backend is deployed to Render, and the frontend is a React Native app.
Setup
Backend

cd server
npm install
Create .env:PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret
FCM_SERVER_KEY=your_firebase_server_key


Run MongoDB locally or use Atlas.
npm start (runs on http://localhost:5000)
Deploy: Push to Render/Vercel (update MONGO_URI for cloud).

Frontend

cd mobile
npm install
Update mobile/api.js with backend URL (e.g., https://task-manager-backend.onrender.com).
npx expo start (use Expo Go on phone/emulator).

Firebase Setup

Create a Firebase project at console.firebase.google.com.
Enable Cloud Messaging, get Server Key, and add to .env.
Add google-services.json to mobile/android/app for Android push notifications.

Tech Stack

Frontend: React Native, Expo, Axios.
Backend: Node.js, Express, MongoDB, JWT, Firebase Admin.
Deployment: Render (free tier).

API Endpoints

POST /auth/register: { email, password } - Register user.
POST /auth/login: { email, password } - Login, returns JWT.
GET /tasks: Get user’s tasks (auth required).
POST /tasks: { title, description, status } - Create task.
PUT /tasks/:id: { title, description, status } - Update task.
DELETE /tasks/:id: Delete task.

Features

User sign-up/login with JWT.
Add, edit, delete tasks with MongoDB storage.
Task list with status toggle (pending/completed).
Push notifications (Firebase) when tasks are added.
Responsive React Native UI.

Demo Video
Link to 2-min demo video (shows app flow: login, task CRUD, notifications).
Sample Users

Email: test1@example.com, Password: pass123
Email: test2@example.com, Password: pass123

Notes

Use AsyncStorage in production instead of localStorage.
Test notifications on a physical device for FCM to work.
Deployed backend: task-manager-backend.onrender.com.
