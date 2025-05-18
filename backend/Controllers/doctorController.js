import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import Review from "../models/ReviewSchema.js";

export const updateDoctor = async (req, res) => {
  const id = req.params.id; // Get the doctor ID from the request parameters

  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).select("-password"); // Update the doctor and exclude the password field

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update!",
      data: updateDoctor,
    });
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    await Doctor.findByIdAndDelete(id);

    // 2. Delete all bookings made by this user
    await Booking.deleteMany({ doctor: id });

    // 3. Delete all reviews written by this user
    await Review.deleteMany({ doctor: id });

    res.status(200).json({
      success: true,
      message: "Successfully deleted your account and related data!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete your account!",
      data: updateDoctor,
    });
  }
};

export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    //Replaces the reviews field (which typically contains just 
    // Review ObjectIds) with the full review documents.
    // Prerequisite: The Doctor schema must have a reviews field defined as 
    // a reference to the Review model:

    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "No Doctor Found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "doctor Found",
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user!",
      data: error,
    });
  }
};

export const getAllDoctor = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;

    // Check if a query parameter is provided
    // If so, filter the doctors based on the query
    // Otherwise, retrieve all doctors
    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          //regex : Performs partial text matching (e.g., "car" matches "Cardiologist").
          { name: { $regex: query, $options: "i" } },// Match name (i means case-insensitive)
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }
    //const doctors = await Doctor.find().select("-password"); // Query all doctors and exclude the password field
    res.status(200).json({
      success: true,
      message: "Users Found",
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve users!",
      data: error.message, // Corrected error handling
    });
  }
};

export const getDoctorProfile = async (req, res) => {
  try {
    const doctorId = req.userId; // Get the doctor ID from the authenticated user
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    const { password, ...doctorWithoutPassword } = doctor._doc;
    const appointments = await Booking.find({ doctor: doctorId });
    res.status(200).json({
      success: true,
      message: "Doctor profile retrieved successfully",
      data: { ...doctorWithoutPassword, appointments }, //
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve doctor profile",
      data: error.message,
    });
  }
};

//for admin page
export const getAllDoctorsProfile = async (req, res) => {
  let doctors;
  try {
    doctors = await Doctor.find({}).select("-password");

    if (!doctors) {
      return res.status
        .status(404)
        .json({ success: false, message: "Doctor Profiles are  not found" });
    }
    res.status(200).json({
      success: true,
      message: "Doctors profile found",
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve doctors profile!",
      data: error.message, // Corrected error handling
    });
  }
};
