# Express App

## Overview
This is an Express.js application that provides user authentication and management features. It includes user registration, login, and the ability to fetch the current user's data.

## Project Structure
```
express-app
├── src
│   ├── app.js               # Entry point of the application
│   ├── controllers          # Contains controllers for handling requests
│   │   └── index.js
│   ├── routes               # Defines application routes
│   │   └── index.js
│   ├── middlewares          # Middleware functions for authentication and authorization
│   │   └── index.js
│   └── models               # Mongoose models for database interaction
│       └── index.js
├── package.json             # NPM configuration file
├── .env                     # Environment variables
└── README.md                # Project documentation
```

## Setup Instructions

1. **Clone the repository**
   ```
   git clone <repository-url>
   cd express-app
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add the necessary environment variables, such as:
   ```
   DATABASE_URL=<your-database-url>
   JWT_SECRET=<your-jwt-secret>
   ```

4. **Run the application**
   ```
   npm start
   ```

## API Usage

### User Registration
- **Endpoint:** `POST /api/users/register`
- **Body:** `{ "first_name": "John", "last_name": "Doe", "email": "john@example.com", "age": 30, "password": "yourpassword" }`

### User Login
- **Endpoint:** `POST /api/users/login`
- **Body:** `{ "email": "john@example.com", "password": "yourpassword" }`

### Get Current User
- **Endpoint:** `GET /api/sessions/current`
- **Headers:** `Authorization: Bearer <token>`

## License
This project is licensed under the MIT License.