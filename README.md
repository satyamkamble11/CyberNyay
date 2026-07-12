# CyberNyay

CyberNyay is an interactive IT Act quiz and learning platform for students studying Cyber Law and Ethics. It helps learners practice Information Technology Act, 2000 concepts through unit-wise quizzes, instant feedback, XP, streaks, badges, and a leaderboard.

![CyberNyay working model](cybernyay_ui_screenshot.png)

## Project Description

CyberNyay is designed as a full-stack learning web application. Students can register, log in, attempt quizzes, review explanations, track progress, and compare scores on the leaderboard. The platform currently includes 60 seeded questions across 6 syllabus units, with section references and difficulty levels.

The goal of this project is to make IT Act learning more practical, revision-friendly, and engaging for law, cyber security, and computer science students.

## Features

- Student registration and login with JWT authentication
- Unit-wise IT Act quiz questions
- 60 seeded questions covering 6 Cyber Law units
- Instant answer feedback with explanations
- IT Act section references for revision
- XP, streak, and badge-style progress tracking
- Quiz result storage in MongoDB
- Leaderboard for student score comparison
- Responsive React frontend for laptop and mobile use

## Screenshots

### Working Model

![CyberNyay UI screenshot](cybernyay_ui_screenshot.png)

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, Axios
- Backend: Node.js, Express.js, JWT, bcryptjs
- Database: MongoDB Atlas
- ODM: Mongoose
- Tooling: npm, Nodemon, Oxlint

## Folder Structure

```text
CyberNyay/
  backend/
    config/
    middleware/
    models/
    routes/
    seed/
    server.js
  frontend/
    public/
    src/
      api/
      components/
      context/
      pages/
  cybernyay_ui_screenshot.png
  README.md
```

## Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/satyamkamble11/CyberNyay.git
cd CyberNyay
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/itact_quiz?retryWrites=true&w=majority
JWT_SECRET=<your-jwt-secret>
```

Seed the quiz questions:

```bash
node seed/seedQuestions.js
```

Start the backend:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
```

Optional: create `frontend/.env` if your backend is not running on localhost:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## Deployment

GitHub stores the project source code. To let students use the app from their own devices, deploy both parts:

- Deploy backend on Render, Railway, or another Node.js hosting service.
- Deploy frontend on Vercel, Netlify, or GitHub Pages.
- Add MongoDB Atlas Network Access for the deployed backend. During early testing, `0.0.0.0/0` allows access from any server IP.
- Set backend environment variables on the hosting service:

```env
MONGO_URI=<your-mongodb-atlas-uri>
JWT_SECRET=<your-jwt-secret>
PORT=5000
```

- Set frontend environment variable:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

After deployment, students can open the deployed frontend URL from mobile phones, tablets, or laptops. They do not need MongoDB access. Their browser talks to the frontend, the frontend talks to the backend API, and the backend talks to MongoDB Atlas.

## Student Access Flow

1. Student opens the deployed website link.
2. Student registers a new account.
3. Student logs in.
4. Student chooses quiz units and answers questions.
5. Results, XP, streaks, and leaderboard data are saved in MongoDB.

## Important Security Notes

- Do not commit `.env` files.
- Rotate the MongoDB password if it was ever shared publicly.
- Use a strong `JWT_SECRET` in production.
- Restrict CORS to your deployed frontend domain before final production use.

## Author

Satyam Kamble

GitHub: [satyamkamble11](https://github.com/satyamkamble11)
