# Smart Job Tracker

A full-stack MERN application for tracking job applications.

## Features

- User Registration & Login
- JWT Authentication
- Protected Routes
- Create, Update, Delete Jobs
- Search Jobs
- Priority Management
- Notes Management
- Dashboard Analytics

## Tech Stack

Frontend:
- React + TypeScript (Vite)
- Tailwind CSS
- Axios

Backend:
- Node.js + TypeScript
- Express.js
- MongoDB Atlas
- JWT
- bcrypt

## Run Locally

Copy `server/.env.example` to `server/.env` and `client/.env.example` to `client/.env`, then fill in the values.

### Backend

cd server
npm install
npm run dev        # tsx watch
npm run build      # compile to dist/
npm start          # run compiled build

### Frontend

cd client
npm install
npm run dev
npm run build      # type-check + production build
