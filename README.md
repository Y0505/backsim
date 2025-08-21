## How to Use BackSim API (For Frontend Developers)

BackSim is a simple fake user management API designed for learning, testing, and practice purposes. It does not store real data and is not meant for production use. Here's what you need to know to use it from your frontend app:

### What does this API do?

- Provides endpoints to login, get user list, get user details, create, update, and delete users.  
- Uses fake in-memory data — no database.  
- Has a simple authentication system that returns a static token for a fixed username and password.  
- Simulates random errors sometimes to help you test error handling.  

### Quick Frontend Integration Summary
- Run backend on port `4000` (or update API URL accordingly, e.g., to your deployed backend at `https://backsim.onrender.com`).
- Run frontend on port `3000`.
- First, call `/auth/login` with `{username: "test", password: "123"}` to get token.
- Include `Authorization: Bearer faketoken123` header on all `/users` requests.
- Handle possible errors gracefully.

### How to interact with this API?

#### 1. Login to get a token

Send a POST request to `/auth/login` with JSON body:

    {
        "username": "test",
        "password": "123"
    }
If successful, you'll get a JSON response with a token (always `"faketoken123"`).

#### 2. Use the token for all `/users` requests
All requests to `/users` endpoints require an `Authorization` header:

    Authorization: Bearer faketoken123

#### 3. Available endpoints:

- GET `/users` — get all users.
- GET `/users/:id` — get user details by ID.
- POST `/users` — create a new user (send `name` and `email` in JSON body).
- PUT `/users/:id` — update user by ID (send `name` and/or `email` in JSON body).
- DELETE `/users/:id` — delete a user by ID.

#### Important Notes for Frontend Developers

The backend only accepts requests from `http://localhost:3000` due to CORS settings.
So run your frontend app on port 3000 (e.g., `http://localhost:3000`) to avoid CORS errors.

The user data is fake and reset every time the server restarts.
The API simulates random errors (500 or 400) about 20% of the time to help you practice error handling.
Do not use real or sensitive data — this is a demo API for practice only.
Quick summary for frontend integration
Run backend on port `4000` (or any port, update API URL accordingly).

Run your frontend on port `3000`.

First, call `/auth/login` with `{username: "test", password: "123"}` to get token.

Include Authorization: Bearer faketoken123 header on all /users requests.

Handle possible simulated errors gracefully.

### Backend API URL

Instead of running the backend locally, you can use the deployed backend at:

    https://backsim.onrender.com


Just make sure to update your frontend’s API_BASE URL accordingly to point to this address.

#### Running the Frontend Locally
This project provides a simple frontend interface to interact with the BackSim API. To test and develop the frontend, you need to run it locally on port 3000. This is important because the backend API server (BackSim) is configured to accept requests only from `http://localhost:3000` for security reasons (CORS policy).

#### How to Run the Frontend
If your frontend project is built with frameworks like `React`, `Vue`, or `Angular`, usually it’s enough to run npm start or yarn start inside the project folder, which by default runs on port `3000`.

If your frontend consists of simple `HTML/CSS/JS` files, you can use any method you prefer to serve the files locally—for example, using Live Server extensions in VSCode or a simple HTTP server (like python -m http.server `3000`) running on port `3000`.

It’s important that the frontend runs on port `3000` to be compatible with the backend’s CORS settings.

Your frontend interface should load, and it will communicate properly with the backend API hosted on `http://localhost:4000` (or your deployed API URL, e.g. `https://backsim.onrender.com`).

### Important Security Note
The BackSim API and frontend use fake, demo user data for practice and testing only.
Never use real, sensitive, or personal information when testing or developing with this API.
This project is intended for learning purposes and not for production use.

### API Documentation

For the complete API documentation, please refer to the [API_DOCUMENTATION.md](https://github.com/Y0505/backsim/blob/main/API_DOCUMENTATION.md) file.
