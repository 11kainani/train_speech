
# 🎙️ Speech Trainer App

> A mobile-first application to help users improve their speaking skills through guided subject-based audio practice and feedback.

---

## 📦 Monorepo Structure

```
/
├── frontend/     # React Native app (Expo)
├── backend/      # Node.js + Express + Sequelize API
└── README.md     # Main README (you're here)
```

---

## ✨ What It Does

- 🎯 Provides users with random subjects (prompts) to speak about.
- 🎙️ Lets users record their spoken answers with duration, timestamp, and subject.
- 📊 Visualizes user activity (e.g., how many answers were recorded in the last 7 days).
- 🧠 Uses state management (Zustand) and file system APIs for smooth UX.

---

## 🛠️ Stack

| Layer       | Technology              |
|-------------|-------------------------|
| Mobile App  | React Native (Expo)     |
| API         | Node.js + Express       |
| State       | Zustand                 |
| DB          | SQLite / MySQL          |
| Audio       | expo-audio + FileSystem |
| Type        | TypeScript              |

---

## 🚀 Getting Started

### 1. Clone and install dependencies

```bash
git clone https://github.com/11kainani/speech-trainer.git
cd speech-trainer
```

### 2. Start the backend

```bash
cd backend
npm install
node index.js
```

### 3. Start the frontend (Expo)

```bash
cd ../frontend
npm install
npx expo start
```

Use the Expo Go app to scan the QR code and launch the app.

---

## 📱 Frontend – React Native App

This is the **mobile app** of the Speech Trainer, built with **React Native** using **Expo**.

### ✅ Features

- View a list of speaking subjects.
- Record and play back audio answers.
- Track activity over the last 7 days.
- Zustand-powered global state.
- Clean and soft UI with a pastel color palette.

---

### 📂 Folder Structure (Frontend)

```
/frontend
  /components       # Reusable UI pieces (cards, buttons, modals)
  /screens          # App pages (Home, Record, Answer, Subject)
  /services         # API and file system logic
  /stores           # Zustand state management
  /utils            # Constants, date helpers, formatting
  App.tsx
```

---

### 🔊 Audio Recording & Playback

- Uses `expo-audio` and `expo-file-system`.
- Records are saved locally.
- Metadata includes: `duration`, `createdAt`, and associated `subject`.

---

### 🧠 Zustand State Management

- Centralized global store for `answers` and `subjects`.
- Methods like:
  - `createAnswer()`, `updateAnswer()`, `fetchAnswers()`
  - `createSubject()`, `getSubjectById()`

---

### 📊 Weekly Activity Tracking

- `getPastXDays(7)` returns the last 7 days in "YYYY-MM-DD" format.
- Filters stored `answers` by their `createdAt` date.
- UI can show number of recordings per day (e.g., colored bars, badges).

---

## 📡 Backend Overview

The backend is a simple Node.js + Express server using Sequelize ORM.

### Sample API Endpoints

```http
GET    /subjects
POST   /subjects
GET    /answers
POST   /answers
DELETE /answers/:id
```

---

## 👤 Author
GitHub: [@kainani](https://github.com/11kainani)

---

## 📝 License

MIT License
