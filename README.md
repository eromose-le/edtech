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
