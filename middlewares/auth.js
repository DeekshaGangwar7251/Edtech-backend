const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async (req, res, next) => {
    try {
        // 1. Safely extract token using optional chaining (?.) and a fallback ternary operator
        const token = req.cookies?.token 
                      || req.body?.token 
                      || (req.header("Authorization") ? req.header("Authorization").replace("Bearer ", "") : null);

        // if token is missing then return response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token is missing',
            });
        }

        // verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Token decoded successfully:", decode);
            req.user = decode;

        } catch (error) {
            // Fix: Changed success to false since verification failed
            return res.status(401).json({
                success: false,
                message: 'token is invalid',
            });
        }
        
        next();

    } catch (error) {
        // This log helps you see any other hidden errors in your server console terminal
        console.error("Global Auth Middleware Error:", error);

        return res.status(500).json({
            success: false,
            message: 'Something went wrong while validating the token',
            error: error.message
        });
    }
}

//isStudent
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for students only ',
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User role cannot be verified, please try again'
        });
    }
}

//isInstructor
exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for instructors only ',
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User role cannot be verified, please try again'
        });
    }
}

//isAdmin
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for Admins only ',
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User role cannot be verified, please try again'
        });
    }
}

