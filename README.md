# 🛍️ Product Store
A full-stack product inventory management app built with the **MERN** stack, featuring image upload via Cloudinary, rate limiting, and dark mode.

🔗 **Live Demo:** [product-store-pi-ten.vercel.app](https://product-store-pi-ten.vercel.app/)

---

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Deployment](#deployment)

---

## ✨ Features
- 📦 Create, read, update, and delete products
- 🖼️ Drag-and-drop image upload with live preview (hosted on Cloudinary)
- 🌙 Dark / light mode toggle
- ☁️ Deployed on Vercel (frontend + backend as separate services)

---

## 🛠 Tech Stack

| Layer      | Technology                                   |
|------------|----------------------------------------------|
| Frontend   | React 18, Vite, Chakra UI v2, Zustand        |
| Backend    | Node.js, Express.js                          |
| Database   | MongoDB (via Mongoose)                       |
| Storage    | Cloudinary                                   |
| Deployment | Vercel                                       |

---

## 📁 Project Structure

```
product-store/
├── backend/          # Express.js REST API
│   ├── src/
│   └── package.json
├── frontend/         # React + Vite app
│   ├── src/
│   └── package.json
├── package.json      # Root build & start scripts
└── vercel.json       # Vercel deployment config
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) local instance (dev) or [Atlas](https://www.mongodb.com/cloud/atlas) (prod)
- [Cloudinary](https://cloudinary.com/) account

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mrkeylost/product-store.git
   cd product-store
   ```

2. **Install all dependencies and build the frontend:**
   ```bash
   npm run build
   ```

### Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
DB_URL=your_mongodb_atlas_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

PORT=5001
```

> ⚠️ `DB_URL` is only used in production. In development, the backend connects to `mongodb://127.0.0.1:27017/ProductStoreDB` automatically.

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

### Running the App

**Start the backend (Terminal 1):**
```bash
cd backend
npm run dev
```

**Start the frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```

Frontend runs at `http://localhost:5173`, backend at `http://localhost:5001`.

---

## ☁️ Deployment

This project is configured for **Vercel** using `experimentalServices`. The frontend is served at `/` and the backend is routed under `/_/backend`.

---

<p align="center">Made with ❤️ by <a href="https://github.com/mrkeylost">mrkeylost</a></p>
