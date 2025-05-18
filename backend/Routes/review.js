import express from "express";
import {
  getAllReviews,
  createReview,
} from "../Controllers/reviewController.js";
import { authenticate, restrict } from "./../auth/verifyToken.js";


//When set to true, it merges parameters from parent routes with the current router's parameters. 
// This is useful for nested routes where child routes need access to parent route parameters.
const router = express.Router({ mergeParams: true });// Merge params to access doctorId from the URL

router
  .route("/")
  .get(getAllReviews)
  .post(authenticate, restrict(["patient"]), createReview);

export default router;
