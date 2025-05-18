import express from "express"; //to create server
import cookieParser from "cookie-parser"; //to parse cookies
import cors from "cors"; //to enable CORS
import mongoose from "mongoose"; //for database connection
import dotenv from "dotenv"; //for environment variables

import authRoutes from "./Routes/auth.js"; //importing auth routes
import userRoutes from "./Routes/user.js"; //importing user routes
import doctorRoutes from "./Routes/doctor.js"; //importing doctor routes
import reviewRoutes from "./Routes/review.js"; //importing review routes
import bookingRoutes from "./Routes/booking.js"

dotenv.config(); //load environment variables from .env file
const app = express(); //create express app
const port = process.env.PORT || 8000; //set port number from environment variable or default to 8000
const corsOptions = {
  origin: true,
}; //set cors options to allow all origins

// built-in middlewares
app.use(express.json()); //parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); //parse incoming URL-encoded requests
app.use(cookieParser()); //parse cookies from requests
app.use(cors(corsOptions)); //enable CORS middleware

// Routes
app.use("/api/v1/auth", authRoutes); //use auth routes for /api/auth endpoint
app.use("/api/v1/users", userRoutes); //use user routes for /api/users endpoint
app.use("/api/v1/doctors", doctorRoutes); //use doctor routes for /api/doctors endpoint
app.use("/api/v1/reviews", reviewRoutes); //use review routes for /api/reviews endpoint
app.use("/api/v1/bookings", bookingRoutes);


//database connection
mongoose.set("strictQuery", false); //set mongoose to not use strict query
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDb Database is connected");
  } catch (error) {
    console.error("Database Connection Error:", error); // Log the error message
  }
};

app.get("/", (req, res) => {
  res.send("backend api working"); //send hello world response
});

app.listen(port, () => {
  connectDB(); //connect to database
  console.log(`Server is running on port ${port}`); //log server start message
});
