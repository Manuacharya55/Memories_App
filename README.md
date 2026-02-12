# Memories - MERN Stack Application

> A modern, full-stack application for preserving and sharing your most cherished moments. 
> Built with performance, scalability, and developer experience in mind.

---

## 🚀 Project Overview

**Memories** is a robust web application that allows users to create, manage, and view their personal memories in a visually appealing interface. It features secure authentication, image storage via Appwrite, and a responsive UI built with the latest React ecosystem tools.

This repository contains the source code for both the **Frontend** (React/Vite) and **Backend** (Node/Express).

---

## 🛠 Tech Stack

### Frontend
- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State/Routing:** React Router v7
- **Forms & Validation:** React Hook Form + Zod
- **API Client:** Axios
- **Notifications:** React Hot Toast
- **Icons:** React Icons

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (w/ Mongoose)
- **Authentication:** JWT (JSON Web Tokens) + BCrypt
- **Storage:** Appwrite (Cloud Storage)
- **Validation:** Zod
- **Security:** Cors, Dotenv

---

## 🏗 Architecture & Features

### Architecture
The project follows a standard **MVC (Model-View-Controller)** pattern on the backend and a **Component-Based Architecture** on the frontend.

- **Client:** Handles UI, state management, and API consumption.
- **Server:** RESTful API services handling business logic, database operations, and authentication.
- **Database:** MongoDB Atlas for storing user data and memory metadata.
- **Storage:** Appwrite Bucket for high-performance image delivery.

### Key Features
- **🔐 Secure Authentication:** User registration and login with JWT-based session management.
- **👤 Profile Management:** Update user details and change passwords securely.
- **📸 Memory Management:** Create, read, update, and delete (CRUD) memories with image uploads.
- **📱 Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop users.
- **⚡ Modern UI:** Glassmorphism effects, loading skeletons (shimmers), and smooth transitions.
- **🛡 Input Validation:** Robust data validation on both client and server sides using Zod.

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB URI
- Appwrite Project Credentials

### 1. Clone the Repository
```bash
git clone <url>
cd memories
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_super_secret_key
ACCESS_TOKEN_EXPIRY=1d
CORS_ORIGIN=*
```
Run the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
```
Create a `.env` file in the `client` directory:
```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_BUCKET_ID=your_appwrite_bucket_id
```
Run the client:
```bash
npm run dev
```

---

## 📁 Folder Structure

```
memories/
├── client/                 # Frontend Application
│   ├── src/
│   │   ├── Api/            # Axios instance
│   │   ├── Components/     # Reusable UI components
│   │   ├── Context/        # Auth Context
│   │   ├── Form/           # Form components (Login, Register, Memory)
│   │   ├── Hooks/          # Custom hooks (useAuthentication, useMemory)
│   │   ├── Layouts/        # Page layouts
│   │   ├── Pages/          # Application views
│   │   └── Utils/          # Helpers (Appwrite config)
│   └── ...
├── server/                 # Backend Application
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── db/             # Database connection
│   │   ├── middlewares/    # Auth & Error middlewares
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API Route definitions
│   │   └── utils/          # Helper functions
│   └── ...
└── README.md
```

---

## 📈 Production & Scalability

This application is designed with scalability in mind. Here is how it can be scaled for production:

### 1. Frontend Scaling (React + Vite)
- **Image Optimization (Appwrite):** Leverage Appwrite's built-in image transformation API to serve resized/compressed images based on the user's viewport, reducing bandwidth usage.
- **Lazy Loading Components:** Use `React.lazy()` and `Suspense` to split route-based chunks (e.g., `Auth` pages vs `Dashboard`), ensuring the initial bundle size stays small.
- **Vite Production Build:** Enable `splitVendorChunkPlugin` in Vite config to separate third-party vendor code from application logic for better cacheability.
- **State Management:** The current Context API is efficient for this scale, but migrating to **Zustand** or **Redux Toolkit** would prevent unnecessary re-renders as the global state grows.


### 2. Backend Scaling
- **Horizontal Scaling:** Run multiple instances of the Node.js server using **PM2 Cluster Mode** or container orchestration like **Docker Swarm/Kubernetes**.
- **Load Balancing:** Use Nginx or AWS ALB to distribute incoming traffic across server instances.
- **Microservices:** Decouple the "Auth" and "Core Logic" into separate services if complexity grows.

### 3. Database & Caching
- **Caching Layer:** Implement **Redis** to cache frequently accessed data (e.g., "All Memories" feed) to reduce database hits.
- **Indexing:** Ensure MongoDB fields (e.g., `userId`, `date`) are properly indexed for faster query execution.
- **Sharding:** For extremely large datasets, MongoDB sharding can distribute data across multiple machines.


---

## 🔮 Future Improvements
- [ ] **Social Features:** Allow users to "Like" or "Comment" on shared memories.
- [ ] **Public Feeds:** Option to make specific memories public.
- [ ] **Search & Filter:** Advanced filtering by date, tags, or location.
- [ ] **Dark Mode:** System-wide dark mode toggle.

---


## 📡 API Documentation

**Base URL:** `http://localhost:4000/api/v1`

### Authentication & Middleware
Protected routes require a **Token** in the header.
`auth-token : <your_access_token>`

### 1. User Routes (`/users`)

| Method | Endpoint           | Description              | Auth Required |
| :----- | :----------------- | :----------------------- | :------------ |
| POST   | `/register`        | Register a new user      | No            |
| POST   | `/login`           | Login user               | No            |
| GET    | `/profile`         | Get current user profile | **Yes**       |
| PATCH  | `/update-profile`  | Update user details      | **Yes**       |
| PATCH  | `/update-password` | Update password          | **Yes**       |

### 2. Memories Routes (`/memories`)

| Method | Endpoint | Description              | Auth Required |
| :----- | :------- | :----------------------- | :------------ |
| GET    | `/`      | Get all memories         | **Yes**       |
| POST   | `/`      | Create a new memory      | **Yes**       |
| GET    | `/:id`   | Get a specific memory    | **Yes**       |
| PATCH  | `/:id`   | Update a specific memory | **Yes**       |
| DELETE | `/:id`   | Delete a memory          | **Yes**       |


# 🔐 Authentication Routes

## 1️⃣ Register User

**POST** `/users/register`

### Request Body

```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "image": "https://example.com/profile.jpg"
}
```

### ✅ Success Response (201)

```json
{
  "statusCode": 201,
  "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "User registered successfully",
  "success": true
}
```

### ❌ Error Response (User Exists)

```json
{
  "statusCode": 400,
  "data": null,
  "message": "User already exists",
  "success": false,
  "errors": []
}
```

---

## 2️⃣ Login User

**POST** `/users/login`

### Request Body

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

### ✅ Success Response (200)

```json
{
  "statusCode": 200,
  "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "User logged in successfully",
  "success": true
}
```

### ❌ Error Response (Invalid Credentials)

```json
{
  "statusCode": 400,
  "data": null,
  "message": "Invalid credentials",
  "success": false,
  "errors": []
}
```

---

# 👤 Profile Routes

> Requires Header:

```
auth-token : <your_jwt_token>
```

---

## 3️⃣ Get Profile

**GET** `/users/profile`

### ✅ Success Response (200)

```json
{
  "statusCode": 200,
  "data": {
    "_id": "65f4ab12c123456789abcd12",
    "fullname": "John Doe",
    "email": "john@example.com",
    "image": "https://example.com/profile.jpg"
  },
  "message": "Profile fetched successfully",
  "success": true
}
```

---

## 4️⃣ Update Profile

**PATCH** `/users/update-profile`

### Request Body

```json
{
  "fullname": "John Updated",
  "email": "johnupdated@example.com",
  "image": "https://example.com/new.jpg"
}
```

### ✅ Success Response (200)

```json
{
  "statusCode": 200,
  "data": {
    "_id": "65f4ab12c123456789abcd12",
    "fullname": "John Updated",
    "email": "johnupdated@example.com",
    "image": "https://example.com/new.jpg"
  },
  "message": "Profile updated successfully",
  "success": true
}
```

---

## 5️⃣ Update Password

**PATCH** `/users/update-password`

### Request Body

```json
{
  "currentpassword": "Password123",
  "newpassword": "NewPassword123",
  "confirmpassword": "NewPassword123"
}
```

### ✅ Success Response (200)

```json
{
  "statusCode": 200,
  "data": {
    "_id": "65f4ab12c123456789abcd12",
    "fullname": "John Updated",
    "email": "johnupdated@example.com"
  },
  "message": "Password updated successfully",
  "success": true
}
```

---

# 🖼 Memories Routes

> Requires Header:

```
auth-token : <your_jwt_token>
```

---

## 6️⃣ Create Memory

**POST** `/memories`

### Request Body

```json
{
  "title": "Trip to Goa",
  "image": "https://example.com/goa.jpg",
  "date": "2025-02-01",
  "tag": "travel"
}
```

### ✅ Success Response (201)

```json
{
  "statusCode": 201,
  "data": {
    "_id": "65f4ab12c123456789abcd99",
    "title": "Trip to Goa",
    "image": "https://example.com/goa.jpg",
    "user": "65f4ab12c123456789abcd12",
    "date": "2025-02-01T00:00:00.000Z",
    "tag": "travel"
  },
  "message": "Memory created successfully",
  "success": true
}
```

---

## 7️⃣ Get All Memories

**GET** `/memories?page=1&limit=12&tag=travel&search=goa`

### ✅ Success Response (200)

```json
{
  "statusCode": 200,
  "data": {
    "data": [
      {
        "_id": "65f4ab12c123456789abcd99",
        "title": "Trip to Goa",
        "image": "https://example.com/goa.jpg",
        "date": "2025-02-01T00:00:00.000Z",
        "tag": "travel"
      }
    ],
    "pagination": {
      "totalPage": 1,
      "currentPage": 1,
      "hasNextPage": false,
      "hasPreviousPage": false
    }
  },
  "message": "Memories fetched successfully",
  "success": true
}
```

---

## 8️⃣ Get Single Memory

**GET** `/memories/:id`

### ✅ Success Response (200)

```json
{
  "statusCode": 200,
  "data": {
    "_id": "65f4ab12c123456789abcd99",
    "title": "Trip to Goa",
    "image": "https://example.com/goa.jpg",
    "date": "2025-02-01T00:00:00.000Z",
    "tag": "travel"
  },
  "message": "Memory fetched successfully",
  "success": true
}
```

---

## 9️⃣ Update Memory

**PATCH** `/memories/:id`

### Request Body

```json
{
  "title": "Trip to Manali",
  "image": "https://example.com/manali.jpg",
  "date": "2025-03-01",
  "tag": "mountain"
}
```

### ✅ Success Response (200)

```json
{
  "statusCode": 200,
  "data": {
    "_id": "65f4ab12c123456789abcd99",
    "title": "Trip to Manali",
    "image": "https://example.com/manali.jpg",
    "date": "2025-03-01T00:00:00.000Z",
    "tag": "mountain"
  },
  "message": "Memory updated successfully",
  "success": true
}
```

---

## 🔟 Delete Memory

**DELETE** `/memories/:id`

### ✅ Success Response (200)

```json
{
  "statusCode": 200,
  "data": {
    "_id": "65f4ab12c123456789abcd99",
    "title": "Trip to Manali"
  },
  "message": "Memory deleted successfully",
  "success": true
}
```

---

# 🧨 Standard Error Format (Global)

```json
{
  "statusCode": 400,
  "data": null,
  "message": "Validation failed",
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

