# 📝 Blog-Platform-API

**Blog-Platform-API** is a backend project developed as part of the **EBpearls backend traineeship** screening.  
It is built using **Node.js**, **Express.js**, and **MongoDB** and supports:

- User authentication via JWT
- CRUD operations for blogs
- Commenting on blogs
- Protected routes for write actions

---

## 🚀 Installation

Clone the repo and install dependencies:

```bash
npm install
```

---

## 🏃 Running the Project

Start the server using:

```bash
npm start
```

or

```bash
node index.js
```

---

## 📁 API Routes & Features

The API is structured into 3 core modules:

* **Auth**: Signup, login with JWT
* **Blog**: Create, update, delete, and retrieve blogs
* **Comment**: Add, update, and remove comments on blog posts

> 🔐 **Protected Actions**: Creating, updating, or deleting blogs/comments requires a valid Bearer token passed via the `Authorization` header.

---

## 🧪 Technologies Used

* **Node.js**
* **Express.js**
* **MongoDB**
* **JWT** (Authentication)

---

## 📄 API Documentation

Full Postman Docs: [View here](https://documenter.getpostman.com/view/39810500/2sB3BAMCn5)

### 🔐 Authentication

| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| POST   | `/api/user/signup` | Register a new user     |
| POST   | `/api/user/signin` | Login and receive token |
| DELETE | `/api/user/:id`    | Remove a user (admin)   |
| GET    | `/api/user/`       | Get all users           |

---

### 📝 Blog Routes

| Method | Endpoint               | Description            |
| ------ | ---------------------- | ---------------------- |
| GET    | `/api/blog/`           | Get all blogs          |
| POST   | `/api/blog/`           | Create a new blog      |
| GET    | `/api/blog/:id`        | Get blog by ID         |
| PATCH  | `/api/blog/:id`        | Update blog            |
| DELETE | `/api/blog/:id`        | Delete blog            |
| GET    | `/api/blog?search=...` | Search, sort, paginate |

---

### 💬 Comment Routes

| Method | Endpoint                  | Description                |
| ------ | ------------------------- | -------------------------- |
| POST   | `/api/comment/:blogId`    | Add comment to a blog      |
| GET    | `/api/comment/:blogId`    | Get all comments of a blog |
| PATCH  | `/api/comment/:commentId` | Update a comment           |
| DELETE | `/api/comment/:commentId` | Delete a comment           |

---

### 🔑 Protected Routes

All routes that require authentication use this header:

```http
Authorization: Bearer <your_token>
```