# StudyNotion – Backend (MERN Stack)

This project is the backend of an EdTech platform where students can enroll in courses and instructors can create and manage courses. Currently, the backend is fully implemented using Node.js, Express.js, and MongoDB.

## Features

- User signup and login with JWT authentication
- Role-based access control (Student / Instructor)
- OTP verification and forgot password functionality
- Create, update, and delete courses
- Course rating system
- Razorpay payment integration
- Cloudinary integration for media storage
- MongoDB Atlas cloud database

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Razorpay
- Cloudinary

## Sample API Endpoints

- POST /api/auth/signup
- POST /api/auth/login
- POST /api/auth/verify-otp
- POST /api/auth/forgot-password
- GET /api/courses
- POST /api/courses
- PUT /api/courses/:id
- DELETE /api/courses/:id
- POST /api/courses/:id/rate

## How to Run Locally

1. Clone the repository
2. Run: npm install
3. Create a .env file and add your configuration keys
4. Run: npm run dev

Server will run on http://localhost:5000

## Deployment

- Backend hosted on Render / Railway
- Database hosted on MongoDB Atlas
- Media storage handled using Cloudinary

This project helped me understand backend architecture, authentication, database schema design, and REST API development in a real-world application.
