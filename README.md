# 🚀 Full Stack Posts App (React + Node.js + WebSocket)

## 📌 Overview
This is a full-stack web application that fetches posts from an external API, stores them in MongoDB, and displays them on a React frontend. It also includes a real-time search feature using WebSockets with relevance-based ranking.

---

## 🔗 Live Links

- 🌐 Frontend (Vercel): https://your-frontend.vercel.app  
- ⚙️ Backend (Render): https://your-backend.onrender.com  

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Axios
- WebSocket (ws client)

### Backend
- Node.js
- Express.js
- WebSocket (ws)

### Database
- MongoDB Atlas

### Deployment
- Frontend → Vercel  
- Backend → Render  

---

## ⚙️ Features

- Fetch posts from external API (JSONPlaceholder)
- Store posts in MongoDB
- Display posts on frontend
- Real-time search using WebSockets
- Relevance-based search ranking:
  - Title starts with query → highest priority
  - Title contains query → medium priority
  - Content contains query → lower priority
- Responsive UI with images

---

## 🔌 API Endpoints

### REST APIs

- GET /api/posts/fetch-posts  
  Fetches posts from external API and stores in DB  

- GET /api/posts  
  Returns all posts  

- GET /api/posts/:id  
  Returns a single post  

---

### 🔄 WebSocket API

Client sends:
{ "query": "search text" }

Server responds:
[ { post objects... } ]

Used for real-time search functionality.

---

## 🧠 How Search Works

Each post is assigned a score:

- Title starts with query → 3
- Title contains query → 2
- Content contains query → 1

Results are sorted in descending order of relevance.

---

## 🏗️ Project Structure

/project-root
  /frontend   → React app
  /backend    → Node + Express + WebSocket server

---

## ⚙️ Environment Variables

Frontend (/frontend/.env)
VITE_API_URL=your-backend-url
VITE_WS_URL=wss://your-backend-url

Backend (/backend/.env)
MONGO_URI=your_mongodb_connection_string
PORT=5000

---

## ▶️ Run Locally

1. Clone repo
git clone https://github.com/your-username/your-repo.git
cd your-repo

2. Backend setup
cd backend
npm install
npm run dev

3. Frontend setup
cd frontend
npm install
npm run dev

---

## ⚠️ Important Notes

- WebSockets require a persistent connection, so the backend is deployed on Render instead of Vercel.
- Render free tier may cause cold start delays.
- Ensure environment variables are properly set during deployment.

---

## 🚀 Future Improvements

- Highlight matched search text
- Pagination / infinite scroll
- Better UI/UX design
- Debounced and optimized search
- Full-text search indexing

---

## 👨‍💻 Author

Sibajit Mazumder

---

## 📬 Submission

This project was built as part of a Full Stack Development internship task.
