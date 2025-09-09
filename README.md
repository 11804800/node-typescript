# Restaurant API

Welcome to the Restaurant API! This API allows managing users, dishes, and orders for a restaurant system. It supports user authentication, managing menu items, and processing orders.

---

## Base URL
All API requests are made to your server's base URL, for example:


### Dockerized API

This REST API is containerized using Docker for easy deployment and consistency across environments.

#### How to run the API with Docker

1. **Build the Docker image:**

```bash
docker build -t my-api .

## Authentication
Most user-specific endpoints require authentication via a Bearer token. Obtain a token by signing in.

**Include in headers:**

Authorization: Bearer <your_token>
```


---

## Endpoints Overview

- **User Management:** Sign up, login, password reset, profile management
- **Dish Management:** View, add dishes
- **Order Management:** View, create, delete orders

---

## User Endpoints (`/user`)

### 1. Get User Profile
- **Method:** `GET`
- **Endpoint:** `/user/`
- **Description:** Retrieves the profile information of the authenticated user.
- **Headers:**
```
Authorization: Bearer <your_token>
```

- **Responses:**
- `200 OK` — User data returned
- `401 Unauthorized` — Authentication failed

---

### 2. Sign Up
- **Method:** `POST`
- **Endpoint:** `/user/signup`
- **Description:** Creates a new user account.
- **Request Body:**
```json
{
  "fistname": "string",
  "lastname":"string",
  "username":"string",
  "email": "string",
  "password": "string"
}

```
- **Responses:**
- `200 Created` — User successfully registered
- `400 Bad Request` — Validation errors

### 3. Login
- **Method**: `POST`
- **Endpoint**: `/user/login`
- **Description**: `Authenticates user and returns a token.`
- **Request Body:**
```
{
  "username": "string",
  "password": "string"
}`

```
- **Responses:**
- `200 OK` — Returns auth token
-  `401 Unauthorized` — Invalid credentials

### 4. Reset Password
- **Method:** `POST`
- **Endpoint:** `/user/reset-password`
- **Description:** Initiates the password reset process by sending reset instructions to the user's email.
- **Request Body:**
  ```json
  {
    "username": "string",
    "password":"string"
  }

  ```
 - **Responses:**
 - `200 OK` — Reset instructions sent successfully
-  `404 Not Found` — Username not registered or user does not exist

### 5. Change Password
- **Method:** `POST`
- **Endpoint:** `/user/Change-password`
- **Description:** Allows an authenticated user to change their password.

- **Request Body:**
```json
{
  "username":"string",
  "oldPassword": "string",
  "newPassword": "string"
}
```
- **Responses:**
- `200 OK` — Password changed successfully
- `400 Bad Request` — Validation errors or incorrect old password

### 6. Order Create

#### Create Order
- **Method:** `POST`
- **Endpoint:** `/orders`
- **Description:** Creates a new order with the provided details.
- **Headers:**
- `Authorization`: Bearer <your_token>

- **Request Body:**
```json
{
  "orderItem": [
    {
      "productId": "string",
      "quantity": number
    }
  ]
}
```

- **Responses:**
- `200` Created — Order created successfully
- `400` Bad Request — Invalid input data


### 7 Get Order

#### Get Order
- **Method:** `Get`
- **Endpoint:** `/orders`
- **Description:** get order with the provided details.
- **Headers:**
- `Authorization`: Bearer <your_token>

- **Responses:**
- `200 OK` — Returns an array of orders
- `401 Unauthorized` — User not authenticated