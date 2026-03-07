# Task Manager API

A RESTful API built with Node.js, Express, and PostgreSQL for managing tasks.
The API supports creating, retrieving, updating, and deleting tasks while demonstrating a clean backend architecture with controllers, routes, middleware, and database modules.

---

## Features

* Create tasks
* Retrieve all tasks
* Update tasks
* Delete tasks
* PostgreSQL database integration
* Centralized error handling middleware
* Environment variable configuration using dotenv

---

## Tech Stack

* **Node.js**
* **Express.js**
* **PostgreSQL**
* **dotenv**

---

## Project Structure

```
task-manager-api
│
├── controllers
│   └── taskController.js
│
├── middleware
│   └── errorHandler.js
│
├── routes
│   └── taskRoutes.js
│
├── db
│   └── db.js
│
├── server.js
├── package.json
├── .env
└── README.md
```

---

## Architecture

The application follows a modular backend structure:

* **Routes** define the API endpoints.
* **Controllers** contain the request handling logic.
* **Database module** manages PostgreSQL connections and queries.
* **Middleware** provides centralized error handling.
* **Server** initializes the Express application and registers routes.

This structure improves maintainability and separation of concerns.

---

## API Endpoints

### Get All Tasks

```
GET /tasks
```

Example Response

```json
[
  {
    "id": 1,
    "title": "Learn Node.js",
    "completed": false
  }
]
```

---

### Create Task

```
POST /tasks
```

Request Body

```json
{
  "title": "Learn Express",
  "completed": false
}
```

Example Response

```json
{
  "id": 2,
  "title": "Learn Express",
  "completed": false
}
```

---

### Update Task

```
PUT /tasks/:id
```

Request Body

```json
{
  "title": "Learn PostgreSQL",
  "completed": true
}
```

---

### Delete Task

```
DELETE /tasks/:id
```

---

## Setup and Installation

### 1. Clone the repository

```
git clone <repository-url>
```

### 2. Navigate to the project folder

```
cd task-manager-api
```

### 3. Install dependencies

```
npm install
```

### 4. Create a `.env` file

```
PORT=3000
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
DB_PORT=5432
```

### 5. Start the server

```
node server.js
```

The API will run on:

```
http://localhost:3000
```

---

## Future Improvements

* Add JWT authentication
* Add request validation
* Implement pagination for task lists
* Add API documentation using Swagger
* Add automated tests using Jest
* Containerize the application with Docker

---

## Author

GitHub: https://github.com/Vrishali34
