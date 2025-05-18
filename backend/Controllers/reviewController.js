import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";
import mongoose from "mongoose";

// @desc Get all reviews
// @route GET /api/reviews
// @access Public
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});

    res
      .status(200)
      .json({ success: true, message: "Successful", data: reviews });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

//create a review
// @desc Create a review

export const createReview = async (req, res) => {
  //If req.body.doctor and req.body.user is missing (not provided in the request)
  if (!req.body.doctor) req.body.doctor = req.params.doctorId; //
  if (!req.body.user) req.body.user = req.userId; //set by authentication middleware like JWT).

  const newReview = new Review(req.body); //Creates a new review document from the request body.

  //Use a MongoDB transaction to ensure both operations 
  // (saving review + updating doctor) succeed or fail together:
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //Saves the review to the reviews collection in MongoDB.Returns the saved document with an _id (e.g., review789).
    const savedReview = await newReview.save({ session });

    await Doctor.findByIdAndUpdate(
      req.body.doctor,
      {
        $push: { reviews: savedReview._id }, //Appends the review ID to the doctor's reviews array field.
      },
      { session }
    );
    await session.commitTransaction();
    res
      .status(200)
      .json({ success: true, message: "Review submitted", data: savedReview });
  } catch (err) {
    console.log(err)
    await session.abortTransaction();
    res.status(500).json({ success: false, message: err.message });
  }
};
