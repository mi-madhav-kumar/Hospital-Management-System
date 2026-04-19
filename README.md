# 🏥 Mediant-X 

A comprehensive, full-stack Hospital Management System designed to streamline healthcare operations. It features a modern patient-facing website, a secure admin dashboard, and an intelligent multilingual AI chatbot for instant medical assistance.

## ✨ Key Features

### 👤 Patient Portal (Frontend)
- **User Authentication**: Secure login and registration for patients.
- **Book Appointments**: Easy-to-use interface for patients to schedule appointments with specialized doctors.
- **Departments Info**: View different medical departments and services.
- **Mediant-X (AI Chatbot)**: An intelligent medical assistant powered by Claude AI.
  - *Multilingual Support*: Communicate fluently in **English**, **Hindi**, and **Bhojpuri**.
  - *Quick Actions*: "Doctor se milna", "Dawai baare mein", and "Symptoms batao".
  - *Interactive UI*: Non-intrusive floating popup with a user-friendly chat interface.

### 🛡️ Admin Dashboard
- **Centralized Control**: Manage all hospital activities from a single secure portal.
- **Manage Appointments**: View, accept, or reject patient appointments.
- **Doctor Management**: Add and maintain doctor profiles.
- **Messages**: View inquiries from the website's "Contact Us" forms.

### ⚙️ Backend API
- **RESTful Architecture**: Clean APIs built with Node.js and Express.
- **Database**: MongoDB integration via Mongoose for storing users, appointments, and messages.
- **Authentication**: JWT & Cookie-based secure auth system with Bcrypt password hashing.
- **Cloud Storage**: Cloudinary integration for handling image and document uploads.

---

## 📂 Project Structure

This is a Monorepo containing three main modules:

1. `Backend/`: The Node.js REST API.
2. `frontend/`: The Vite + React web application for patients.
3. `dashboard/`: The Vite + React admin dashboard.

---

## 🚀 Deployment Guide (Railway)

To host this complete project on **Railway**, you will need to create 3 separate services inside a single Railway project.

### 1️⃣ Deploying the Backend
1. Go to [Railway](https://railway.app/) and click **New Project** -> **Deploy from GitHub repo**.
2. Select this repository.
3. Once the service appears, go to **Settings** and set the **Root Directory** to `Backend`.
4. Go to **Variables** and add your backend environment variables (from your `.env` file).
5. Let Railway Build and Deploy. Then go to **Settings -> Generate Domain** to get your **Live API URL** (e.g. `your-backend.up.railway.app`).

### 2️⃣ Deploying the Frontend
1. Click **"+ New"** in your Railway project to add a new service from this same GitHub repo.
2. In its **Settings**, set the **Root Directory** to `frontend`.
3. **Crucial Step**: In your frontend codebase, replace all instances of `http://localhost:4000` (e.g., in `App.jsx`, `Chatbot.jsx`) with your **Live API URL** and push the change to GitHub.
4. Railway will automatically rebuild the frontend. Generate a domain to view your patient portal.

### 3️⃣ Deploying the Dashboard
1. Add a 3rd service from this GitHub repo.
2. Set the **Root Directory** to `dashboard`.
3. Update the API URLs inside the dashboard code to point to the live backend, just like you did for the frontend.
4. Deploy and generate a domain.

---

## 💻 Local Development Setup

To run this project locally on your machine, open 3 separate terminal splits.

**1. Start Backend:**
```bash
cd Backend
npm install
npm run dev
```

**2. Start Patient Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**3. Start Admin Dashboard:**
```bash
cd dashboard
npm install
npm run dev
```
