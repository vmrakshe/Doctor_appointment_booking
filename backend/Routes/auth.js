import express from "express";
import { register, login } from "../Controllers/authController.js";   // Importing the register, login functions from the auth controller


const router = express.Router(); // Creating a new router instance

// Registering a new user
router.post("/register", register); // POST request to /register endpoint, calls the register function

// Logging in a user
router.post("/login", login); // POST request to /login endpoint, calls the login function


export default router; // Exporting the router instance for use in other parts of the application

// This code sets up the authentication routes for user registration and login in an Express application.
