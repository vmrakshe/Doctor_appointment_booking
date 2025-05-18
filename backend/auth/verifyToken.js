import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

// Middleware to authenticate the user using JWT
// This middleware checks if the request has a valid JWT token in the authorization header
export const authenticate = async (req, res, next) => {
  //get the token from the request header
  const authToken = req.headers.authorization;

  //check if the token is present and starts with "Bearer "
  //if not, return a 401 Unauthorized response
  if (!authToken || !authToken.startsWith("Bearer"))
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied!" });

  try {
    const token = authToken.split(" ")[1]; // Extract the token from the "Bearer " format

    //verify the token using the secret key
    //If the token is valid, it returns the decoded payload
    // (i.e. the data that was originally encoded when the token was created).
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    //attaching user info directly to the request object,
    // which makes it available to downstream route handlers or middleware.
    req.userId = decoded.id;
    req.role = decoded.role;

    next(); // Call the next middleware or route handler
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token is expired" });
    }
    console.log(error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

//authorization middleware
/// Middleware to restrict access to certain roles
export const restrict = (roles) => async (req, res, next) => {
  try {
    const userId = req.userId;
    let user = null;

    // First try User, then Doctor
    user = await User.findById(userId);
    if (!user) {
      user = await Doctor.findById(userId);
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "You're not authorized to access this resource",
      });
    }

    // Attach full user info (optional)
    //req.user = user;

    next();
  } catch (error) {
    console.error("Authorization error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// export const restrict = (roles) => async (req, res, next) => {
//   const userId = req.userId;

//   let user;

//   const patient = await User.findById(userId);

//   const doctor = await Doctor.findById(userId);

//   if (patient) {
//     user = patient;
//   }
//   if (doctor) {
//     user = doctor;
//   }

//   if (!roles.includes(user.role)) {
//     return res.status(401).json({
//       success: false,
//       message: "You're not authorized to access this resource",
//     });
//   }

//   next();
// };
