# API Documentation

## Authentication

### POST /signup
- **Description:** Register a new user (parent).
- **Request Body:**
  - `name` (string, required): name
  - `email` (string, required):  email
  - `password` (string, required): Password
- **Response:** AuthResponse (success, message, data, error)

### POST /signin
- **Description:** Sign in a user (parent).
- **Request Body:**
  - `email` (string, required):  email
  - `password` (string, required): Password
- **Response:** AuthResponse (success, message, data, error)

### POST /signout
- **Description:** Sign out the current user.
- **Response:** AuthResponse (success, message, data, error)

---






---

**Note:** All endpoints (except `/signup`, `/signin`, `/signout`) require authentication via a valid token.
