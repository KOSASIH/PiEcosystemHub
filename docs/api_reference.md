# API Documentation

## Introduction
This document provides a reference for the API endpoints available in the Pi Ecosystem Integration Hub.

## Base URL

[http://localhost:3000/api](http://localhost:3000/api) 


## Authentication

### POST /auth/login
- **Description**: Log in a user.
- **Request Body**:
  ```json
  1 {
  2   "email": "user@example.com",
  3   "password": "yourpassword"
  4 }
  ```

- Response:
  - 200 OK: Returns user information and a token.
  - 401 Unauthorized: Invalid credentials.

**POST** /auth/register
- **Description**: Register a new user.
- **Request Body**:

  ```json
  1 {
  2   "username": "newuser",
  3   "email": "user@example.com",
  4   "password": "yourpassword"
  5 }
  ```
  
- Response:
  - 201 Created: Returns the created user information.
  - 400 Bad Request: Validation errors.

### dApp Management
- **GET** /dapps
- **Description**: Retrieve a list of all dApps.
- **Response**:
  - 200 OK: Returns an array of dApp objects.

### POST /dapps
- **Description**: Create a new dApp.
- **Request Body**:

  ```json
  1 {
  2   "name": "My dApp",
  3   "description": "Description of my dApp",
  4   "url": "http://mydapp.com"
  5 }

- Response:
  - 201 Created: Returns the created dApp object.
  - 400 Bad Request: Validation errors.

# Conclusion
For more detailed information on each endpoint, including additional parameters and response formats, please refer to the source code or contact the development team.
