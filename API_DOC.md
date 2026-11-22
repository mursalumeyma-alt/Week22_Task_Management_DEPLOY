# Task Management System API Documentation

## 1. API Overview

This API provides a Task Management System where users can register, log in, manage tasks, and manage subtasks.

**Base URL (Local):**
```text
http://localhost:3000
```

**API Format:** JSON

**Authentication:** JWT (JSON Web Token)

Protected endpoints require a Bearer token.

---

## 2. Authentication

### 2.1 Register a New User

- **Method:** POST
- **Endpoint:** `/api/auth/register`
- **Authentication:** Not required
- **Success Status:** 201 Created

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "USER_ID",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "YOUR_JWT_TOKEN"
  }
}
```

Save the returned token for protected endpoints.

### 2.2 Login

- **Method:** POST
- **Endpoint:** `/api/auth/login`
- **Authentication:** Not required
- **Success Status:** 200 OK

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "USER_ID",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "YOUR_JWT_TOKEN"
  }
}
```

### 2.3 Get Current User Profile

- **Method:** GET
- **Endpoint:** `/api/auth/me`
- **Authentication:** Required
- **Success Status:** 200 OK

**Headers:**
```text
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response:**
```json
{
  "success": true,
  "data": {
    "id": "USER_ID",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## 3. Task Endpoints

All task endpoints require JWT authentication.

### 3.1 Get All Tasks

- **Method:** GET
- **Endpoint:** `/api/tasks`
- **Success Status:** 200 OK

**Headers:**
```text
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": "TASK_ID",
      "title": "Complete assignment",
      "description": "Finish the API documentation",
      "status": "pending",
      "priority": "high",
      "dueDate": null,
      "assignedTo": null,
      "subtasks": []
    }
  ]
}
```

### 3.2 Get a Task by ID

- **Method:** GET
- **Endpoint:** `/api/tasks/:id`
- **Success Status:** 200 OK

Replace `:id` with the actual task ID.

**Success Response:**
```json
{
  "success": true,
  "data": {
    "id": "TASK_ID",
    "title": "Complete assignment",
    "description": "Finish the API documentation",
    "status": "pending",
    "priority": "high",
    "subtasks": []
  }
}
```

### 3.3 Create a Task

- **Method:** POST
- **Endpoint:** `/api/tasks`
- **Success Status:** 201 Created

**Request Body:**
```json
{
  "title": "Complete assignment",
  "description": "Finish the Week 22 assignment",
  "status": "pending",
  "priority": "high",
  "dueDate": "2026-12-01",
  "assignedTo": "John",
  "subtasks": []
}
```

Required fields: `title`, `description`, `status`, and `priority`.

Optional fields: `dueDate`, `assignedTo`, and `subtasks`.

**Valid task statuses:**
- `pending`
- `in_progress`
- `completed`
- `cancelled`

**Valid priorities:**
- `low`
- `medium`
- `high`
- `urgent`

**Success Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": "TASK_ID",
    "title": "Complete assignment",
    "description": "Finish the Week 22 assignment",
    "status": "pending",
    "priority": "high"
  }
}
```

### 3.4 Update a Task

- **Method:** PUT
- **Endpoint:** `/api/tasks/:id`
- **Success Status:** 200 OK

**Request Body:**
```json
{
  "title": "Updated assignment",
  "description": "Complete and test the API",
  "status": "in_progress",
  "priority": "urgent"
}
```

Send the fields you want to update.

**Success Response:**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": "TASK_ID",
    "title": "Updated assignment",
    "status": "in_progress",
    "priority": "urgent"
  }
}
```

### 3.5 Delete a Task

- **Method:** DELETE
- **Endpoint:** `/api/tasks/:id`
- **Success Status:** 200 OK

**Success Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {
    "id": "TASK_ID",
    "title": "Complete assignment"
  }
}
```

Deleting a task also deletes its related subtasks.

---

## 4. Subtask Endpoints

All subtask endpoints require JWT authentication.

### 4.1 Get All Subtasks for a Task

- **Method:** GET
- **Endpoint:** `/api/tasks/:taskId/subtasks`
- **Success Status:** 200 OK

**Success Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": "SUBTASK_ID",
      "title": "Prepare documentation",
      "description": "Write API instructions",
      "completed": false,
      "taskId": "TASK_ID"
    }
  ]
}
```

### 4.2 Get One Subtask

- **Method:** GET
- **Endpoint:** `/api/subtasks/:id`
- **Success Status:** 200 OK

### 4.3 Create a Subtask

- **Method:** POST
- **Endpoint:** `/api/tasks/:taskId/subtasks`
- **Success Status:** 201 Created

**Request Body:**
```json
{
  "title": "Prepare documentation",
  "description": "Write API instructions",
  "completed": false
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Subtask created successfully",
  "data": {
    "id": "SUBTASK_ID",
    "title": "Prepare documentation",
    "description": "Write API instructions",
    "completed": false,
    "taskId": "TASK_ID"
  }
}
```

### 4.4 Update a Subtask

- **Method:** PUT
- **Endpoint:** `/api/subtasks/:id`
- **Success Status:** 200 OK

**Request Body:**
```json
{
  "title": "Updated subtask",
  "description": "Finish the documentation",
  "completed": true
}
```

### 4.5 Delete a Subtask

- **Method:** DELETE
- **Endpoint:** `/api/subtasks/:id`
- **Success Status:** 200 OK

**Success Response:**
```json
{
  "success": true,
  "message": "Subtask deleted successfully",
  "data": {
    "id": "SUBTASK_ID",
    "title": "Updated subtask"
  }
}
```

---

## 5. Protected Example Endpoint

### Check Authentication

- **Method:** GET
- **Endpoint:** `/api/protected`
- **Authentication:** Required
- **Success Status:** 200 OK

**Headers:**
```text
Authorization: Bearer YOUR_JWT_TOKEN
```

This endpoint returns a protected message and the authenticated user.

---

## 6. HTTP Status Codes and Error Handling

| Status Code | Meaning | Description |
|---|---|---|
| 200 | OK | Request completed successfully |
| 201 | Created | A new user, task, or subtask was created |
| 400 | Bad Request | Required registration/login fields are missing, or email already exists |
| 401 | Unauthorized | Missing, invalid, or expired JWT token, or invalid login credentials |
| 404 | Not Found | Requested API route, task, or subtask does not exist or cannot be accessed |
| 500 | Internal Server Error | Unexpected server, database, or authentication error |

### Example: 400 Bad Request

```json
{
  "success": false,
  "message": "Email and password are required"
}
```

### Example: 401 Unauthorized

```json
{
  "success": false,
  "message": "Access token required"
}
```

### Example: 404 Not Found

```json
{
  "success": false,
  "message": "Task not found"
}
```

### Example: 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## 7. How to Test the API Using Postman

### Step 1: Start the Server

Run the application locally:

```bash
npm run dev
```

The API should be available at:

```text
http://localhost:3000
```

### Step 2: Register a User

1. Open Postman.
2. Select POST.
3. Enter `http://localhost:3000/api/auth/register`.
4. Select Body → raw → JSON.
5. Enter a name, email, and password.
6. Click Send.
7. Confirm that the response is `201 Created`.

### Step 3: Login

1. Select POST.
2. Enter `http://localhost:3000/api/auth/login`.
3. Enter your email and password in Body → raw → JSON.
4. Click Send.
5. Copy the returned JWT token.

### Step 4: Authorize Protected Endpoints

For every protected request:

1. Open the Authorization tab.
2. Select Bearer Token.
3. Paste the JWT token.
4. Send the request.

Alternatively, add this header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

### Step 5: Test Task Operations

Test these requests:

- GET `/api/tasks`
- POST `/api/tasks`
- GET `/api/tasks/:id`
- PUT `/api/tasks/:id`
- DELETE `/api/tasks/:id`

Use the request bodies documented above where applicable.

### Step 6: Test Subtask Operations

Test:

- GET `/api/tasks/:taskId/subtasks`
- POST `/api/tasks/:taskId/subtasks`
- GET `/api/subtasks/:id`
- PUT `/api/subtasks/:id`
- DELETE `/api/subtasks/:id`

Replace the IDs with real IDs returned by your API.

### Step 7: Test Error Responses

Also test:

- Login with incorrect credentials → expect `401`.
- Access a protected endpoint without a token → expect `401`.
- Request a task with a nonexistent ID → expect `404`.
- Register without required fields → expect `400`.

Check the HTTP status code and JSON response in Postman.

---

## 8. Important Notes

- Passwords are hashed using bcrypt before being stored.
- Authentication uses JWT tokens.
- Tokens expire after 24 hours.
- Each user can access only their own tasks and subtasks.
- Task and subtask operations require authentication.
- Do not share your JWT token or environment secrets publicly.

**Documentation Version:** 1.0  
**Project:** Task Management System  
**Technology:** Node.js, Express.js, Prisma, PostgreSQL