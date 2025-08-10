# Track_Exp – Expense Tracker

A simple MERN application to track income and expenses with JWT auth.

## Features
- User signup/login (JWT)
- Add, list, and delete expenses
- Amount color coding (income vs expense)
- Date per expense (DD/MM/YYYY display)
- Mobile‑friendly UI

## Tech Stack
- Backend: Node.js, Express, MongoDB (Mongoose)
- Auth: JWT, bcrypt
- Frontend: React (CRA), React Router, React Toastify

## Local Setup
1. Backend
   ```bash
   cd backend
   npm install
   # create .env
   # MONGO_URI=your_mongodb_uri
   # JWT_SECRET=your_secret
   npm run dev
   ```
2. Frontend
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

## API
- POST /auth/signup
- POST /auth/login
- GET /expenses
- POST /expenses
- DELETE /expenses/:expenseId

## Notes
- Environment files are ignored via `.gitignore`. Add `.env.example` with placeholders if sharing config.

— Maintained by Anuj Yadav (Anujyadav911) 
