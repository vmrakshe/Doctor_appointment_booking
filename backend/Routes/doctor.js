import express from "express";
import Doctor from "../models/DoctorSchema.js";
import {
  updateDoctor,
  deleteDoctor,
  getAllDoctor,
  getSingleDoctor,
  getDoctorProfile,
  getAllDoctorsProfile,
} from "../Controllers/doctorController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRoutes from "./review.js"; // Import review routes

const router = express.Router();

// Merge review routes into doctor routes
//nested routes
router.use("/:doctorId/reviews", reviewRoutes);

router.get("/:id", getSingleDoctor); // Public route anyone can access this route
router.get("/", getAllDoctor); // Public route anyone can access this route
router.put("/:id", authenticate, restrict(["doctor", "admin"]), updateDoctor); // Protected route
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor); // Protected route
router.get(
  "/profile/me",
  authenticate,
  restrict(["doctor", "admin"]),
  getDoctorProfile
);
router.get(
  "/allprofile/admin",
  authenticate,
  restrict(["admin"]),
  getAllDoctorsProfile
);
//to update the status
router.put(
  "/status/:id",
  authenticate,
  restrict(["admin"]),
  async (req, res) => {
    const doctorId = req.params.id;
    const { isApproved } = req.body;

    try {
      const doctor = await Doctor.findByIdAndUpdate(
        doctorId,
        { isApproved },
        { new: true } // Returns the UPDATED document
      );

      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      res.status(200).json({
        message: "Doctor status updated successfully to " + isApproved,
        doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
