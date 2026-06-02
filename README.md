# StudyNotion – MERN Stack

This project is the backend of an EdTech platform where students can enroll in courses and instructors can create and manage courses. Currently, the backend is fully implemented using Node.js, Express.js, and MongoDB.

## Features

- User signup and login with JWT authentication
- Role-based access control (Admin/Student / Instructor)
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

Frontend will run on http://localhost:3000

This project provided hands-on experience in full-stack application development, including frontend engineering, backend architecture, authentication and authorization, database schema design, API development, and third-party service integration.
