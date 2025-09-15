
# EdTech Backend with AI-based Course Recommendation

## Overview

This project is the backend for an **EdTech platform** that leverages **AI-based recommendations** to suggest courses to users based on their interests and engagement history. The system manages users, courses, engagement data, and computes AI-powered recommendations for courses using a scoring system that incorporates user interests, course popularity, and engagement history.

## Features

- **User Management**: Allows users to sign up and maintain their profile with career interests and engagement data.
- **Course Management**: Allows admins to create and manage courses in the system.
- **AI-Based Course Recommendations**: Recommends top courses to a user based on their engagement history, career interests, and course popularity.

## Tech Stack

- **Node.js**: JavaScript runtime for server-side logic.
- **Express.js**: Web framework to build the RESTful API.
- **MongoDB**: NoSQL database to store user data, course data, and engagement data.
- **Mongoose**: ODM to interact with MongoDB.
- **TypeScript**: Static type checking for better development experience.
- **Docker**: Containerization for easier deployment and management of services.
- **Docker Compose**: Orchestrates multi-container Docker applications (e.g., backend service and MongoDB).

## Project Structure

```plaintext
edtech-backend-ts/
│
├── src/
│   ├── controllers/
│   │   └── userController.ts
│   │   └── courseController.ts
│   │   └── recommendationController.ts
│   ├── models/
│   │   └── User.ts
│   │   └── Course.ts
│   │   └── Engagement.ts
│   ├── routes/
│   │   └── userRoutes.ts
│   │   └── courseRoutes.ts
│   │   └── recommendationRoutes.ts
│   ├── .env
│   ├── server.ts
│
├── dist/
├── Dockerfile
├── docker-compose.yml
├── tsconfig.json
├── package.json
```

## Endpoints

### 1. **User Management**

- **Create a new user**:
  - **URL**: `/api/user`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "careerInterest": ["AI", "Web Development", "Data Science"],
      "tags": ["beginner", "data science"],
      "engagementHistory": []
    }
    ```

- **Get user profile**:
  - **URL**: `/api/user/:userId`
  - **Method**: `GET`
  - **Response**:
    ```json
    {
      "_id": "60d3f1f18d5f83d207c15bc",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "careerInterest": ["AI", "Web Development", "Data Science"],
      "tags": ["beginner", "data science"],
      "engagementHistory": []
    }
    ```

### 2. **Course Management**

- **Create a new course**:
  - **URL**: `/api/course`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "title": "Introduction to AI",
      "description": "Learn the basics of Artificial Intelligence.",
      "popularity": 50,
      "category": "AI",
      "tags": ["AI", "beginner", "machine learning"]
    }
    ```

- **Get all courses**:
  - **URL**: `/api/courses`
  - **Method**: `GET`
  - **Response**:
    ```json
    [
      {
        "_id": "609d3f1f18d5f83d207c15bc",
        "title": "Introduction to AI",
        "description": "Learn the basics of Artificial Intelligence.",
        "popularity": 50,
        "category": "AI",
        "tags": ["AI", "beginner", "machine learning"]
      },
      ...
    ]
    ```

### 3. **AI-Based Course Recommendation**

- **Get recommended courses**:
  - **URL**: `/api/recommendations/:userId`
  - **Method**: `GET`
  - **Response**:
    ```json
    [
      {
        "_id": "609d3f1f18d5f83d207c15bc",
        "title": "Introduction to AI",
        "description": "Learn the basics of Artificial Intelligence.",
        "popularity": 50,
        "category": "AI",
        "tags": ["AI", "beginner", "machine learning"]
      },
      ...
    ]
    ```

---

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/eromose-le/edtech.git
cd edtech
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file at the root of the project and add the following variables:

```bash
MONGO_URI=mongodb://mongo:27017/edtech
PORT=5000
DB_NAME=edtech
ENVIRONMENT=development
```

### 4. Run the Application

To run the application with Docker:

1. **Build and start the containers**:

   ```bash
   docker-compose up --build
   ```

2. **Access the backend API**:
   - The backend will be accessible at `http://localhost:5000`.

3. **Access MongoDB**:
   - MongoDB will be available at `mongodb://localhost:27017/edtech`.

### 5. Stopping the Containers

To stop and remove the containers, networks, and volumes:

```bash
docker-compose down --volumes
```

### 6. Testing with Postman

You can test the API using Postman by sending requests to the following endpoints:

- **POST** `/api/user` to create a new user.
- **POST** `/api/course` to create a new course.
- **POST** `/api/engagement` (You may need to create an endpoint for this) to log user engagement.
- **GET** `/api/recommendations/:userId` to fetch top 3 course recommendations based on user data.

---

## Docker Setup

### Dockerfile

```dockerfile
# Use the official Node.js image as a base
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port that the app will run on
EXPOSE 5000

# Run the application
CMD ["node", "dist/server.js"]
```

### Docker Compose Configuration

```yaml
version: '3.8'

services:
  # Backend service
  backend:
    build: .
    container_name: edtech-backend
    environment:
      - MONGO_URI=mongodb://mongo:27017/edtech
      - PORT=5000
    ports:
      - "5000:5000"
    depends_on:
      - mongo
    networks:
      - edtech-net

  # MongoDB service
  mongo:
    image: mongo:latest
    container_name: edtech-mongo
    environment:
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=rootpassword
    ports:
      - "27017:27017"
    volumes:
      - mongodb-data:/data/db

networks:
  edtech-net:
    driver: bridge

volumes:
  mongodb-data:
    driver: local
```

---

## Conclusion

This project provides a backend solution for an **EdTech platform** with AI-powered course recommendations, using **Node.js**, **MongoDB**, and **TypeScript**. The backend is Dockerized to provide easy deployment and scaling, and the system can be tested via Postman.

Feel free to reach out if you need any assistance or improvements on this project!

