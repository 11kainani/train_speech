# 🧠 SpeechTrainer Backend

The backend of **SpeechTrainer** is a Node.js application using **Express** and **Sequelize** to manage the application's data, including subjects, answers, and comments.

---

## 🚀 Features

- 📋 Create, fetch, update, and delete speaking subjects.
- 🗣️ Manage answers to each subject with audio metadata.
- 💬 Attach comments with time-stamped feedback to answers.
- 📊 Fetch answers from the last X days for stats and tracking.

---

## 🛠️ Tech Stack

- **Node.js** with **Express**
- **Sequelize** ORM with **MySQL**
- **UUID / Hex** ID generation
- **JSDoc**-style documentation for clarity and tooling

---

## 📁 Project Structure (Backend)

```
backend/
├── controllers/       # Business logic for subjects, answers, and comments
├── models/            # Sequelize models and associations
├── routes/            # Express routes per resource
├── config/            # Sequelize configuration
├── utils/             # Utility functions like ID generators
├── index.js           # Express app entry point
└── ...
```

---

## 📂 Data Models

- `Subject`: Describes a speaking prompt or question.
- `Answer`: Linked to a subject; includes metadata like creation date.
- `Comment`: Time-stamped note attached to an answer.

---

## 🧪 Development & Testing

1. Install dependencies:

```bash
npm install
```

2. Start the backend server:

```bash
npm run dev
```

3. Configure your `.env` file with your database settings (MySQL).

4. Run test
```bash 
npm run test
```
---


## 🔄 API Highlights

- `GET /subjects`: Retrieve all subjects
- `GET /answers/from/:days`: Answers from past X days
- `POST /comments`: Create a comment linked to an answer
- `GET /answers/:idAnswer`: Fetch answer and linked subject

---

## ✨ Future Improvements

- Add authentication (JWT, session)
- Integrate with cloud audio storage
- Enhance error logging & validation

---

## 🧑‍💻 Developer Notes

- Follow JSDoc annotations in controllers for clarity.
- Make sure associations are declared with aliases (`as`) where needed.
- Ensure your MySQL database allows remote access if accessing from a device.

---

Built by combining Express, Sequelize, and careful data modeling.


## EXTRA 
.env example
```
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_DIALECT=
DB_PORT=
API_KEY=
```

