# API Documentation for User Management Backend (BackSim API)

### Task Description:

Document all API endpoints related to user authentication and user management so that the frontend team can use the API without confusion.

The documentation should include:

- Description of each endpoint
- HTTP method
- Endpoint URL
- Input parameters (path, query, or body)
- Required headers (e.g., Authorization)
- Success response format
- Error response format
- Example requests and responses (JSON)
- Explanation of possible errors and their meanings

### Endpoints:
#### 1. POST `/auth/login`

- Purpose: Obtain authentication token
- Request Body:

    ```json
    {
        "username": "test",
        "password": "123"
    }
- Successful Response:
    ```json
    {
    "token": "faketoken123",
    "message": "Welcome! Use this token in Authorization header"
    }
- Errors:

- 401 Unauthorized for invalid credentials
    ```json
    { "error": "Invalid credentials" }
#### 2. GET /users

- Purpose: Retrieve a list of all users
- Headers:
    - Authorization: `Bearer faketoken123`
- Successful Response:
    ```json
    {
        "description": "This endpoint returns all users. You can use GET method to fetch user list.",
        "data":
        [
            {
                "id": 13577405,
                "name": "Yaser",
                "email": "Yaser@example.com"
            },
            {
                "id": 17008506,
                "name": "Bob",
                "email": "bob@example.com"
            }
        ]
    }
- #### Errors:

    - 401 Unauthorized if token is missing or invalid
        ```json
        { "error": "Unauthorized: Please provide valid token" }
    - 500 Internal Server Error (simulated)

#### 3. GET /users/:id

- Purpose: Retrieve details for a specific user by ID
- Path Parameter:
    - id (integer)
- Headers:
    - Authorization: `Bearer faketoken123`
- Successful Response:
    ```json
    {
        "description": "This endpoint returns user details for user id 13577405.",
        "data": 
        {
            "id": 13577405,
            "name": "Yaser",
            "email": "Yaser@example.com" 
        }
    }
- Errors:

  - 404 Not Found if user does not exist

    ```json
    { "error": "User not found" }
#### 4. POST /users

- Purpose: Create a new user
- Headers:
    - Authorization: Bearer faketoken123
- Request Body:
    ```json
    {
    "name": "Alice",
    "email": "alice@example.com"
    }
- Successful Response:
  - Status 201 Created
    ```json
    {
        "description": "User created successfully!",
        "data":
        {
            "id": 3,
            "name": "Alice",
            "email": "alice@example.com"
        }
    }
- Errors:
  - 400 Bad Request if name or email is missing
    ```json
    { "error": "Name and email are required" }
#### 5. PUT /users/:id

- Purpose: Update user information
- Path Parameter:
    - id (integer)
- Headers:
    - Authorization: `Bearer faketoken123`
- Request Body: (optional)
    ```json
    {
        "name": "New Name",
        "email": "newemail@example.com"
    }
- Successful Response:
    ```json
    {
        "description": "User id 3 updated successfully.",
        "data":
        {
            "id": 3,
            "name": "New Name",
            "email": "newemail@example.com"
        }
    }
- Errors:
    - 404 Not Found if user does not exist
    ```json
    { "error": "User not found" }
#### 6. DELETE /users/:id

- Purpose: Delete a user by ID
- Path Parameter:
    - id (integer)
- Headers:
- Authorization: `Bearer faketoken123`
- Successful Response:
    ```json
    {
    "description": "User id 3 deleted successfully."
    }
- Errors:
    - 404 Not Found if user does not exist
    ```json
    { "error": "User not found" }
### Additional Notes:

- #### Token Usage:
    The frontend must include the token received from /auth/login in the Authorization header as Bearer faketoken123 in all /users requests.
- #### Simulated Errors:
    The server may randomly return 400 or 500 errors in some requests; the frontend should handle these gracefully.
- #### API Base URL:
    Assume `http://localhost:4000` for local development.
