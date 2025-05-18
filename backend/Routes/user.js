import express from "express";
import {
  updateUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  getUserProfile,
  getMyAppointments,
} from "../Controllers/userController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/:id", authenticate, restrict(["patient"]), getSingleUser); // only user can access this route
router.get("/", authenticate, restrict(["admin"]), getAllUser); // Protected route
router.put("/:id", authenticate, restrict(["patient"]), updateUser); // only user can access this route
router.delete("/:id", authenticate, restrict(["patient"]), deleteUser); // only user can access this route
router.get("/profile/me", authenticate, restrict(["patient"]), getUserProfile);
router.get(
  "/appointments/my-appointments",
  authenticate,
  restrict(["patient"]),
  getMyAppointments
);

export default router;
