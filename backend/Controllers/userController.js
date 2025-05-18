import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Review from "../models/ReviewSchema.js";

export const updateUser = async (req, res) => {
  const id = req.params.id; // Get the user ID from the request parameters

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).select("-password"); // Update the user and exclude the password field

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update!",
      data: updateUser,
    });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);

    // 2. Delete all bookings made by this user
    await Booking.deleteMany({ user: id });

    // 3. Delete all reviews written by this user
    await Review.deleteMany({ user: id });

    res.status(200).json({
      success: true,
      message: "Successfully deleted user and related data!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user and related data!",
    });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password"); // Query the user by ID and exclude the password field

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No User Found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Found",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user!",
      data: error,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Query all users and exclude the password field

    res.status(200).json({
      success: true,
      message: "Users Found",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve users!",
      data: error.message, // Corrected error handling
    });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId; // Get the user ID from the request object

  try {
    const user = await User.findById(userId); // Query the user by ID

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No User Found!",
      });
    }

    const { password, ...userWithoutPassword } = user._doc; // Exclude the password field from the user object
    res.status(200).json({
      success: true,
      message: "Profile information found",
      data: { ...userWithoutPassword },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user profile information!",
      data: error,
    });
  }
};

export const getMyAppointments = async (req, res) => {
  const userId = req.userId;

  try {
    const bookings = await Booking.find({ user: userId });

    //map: Converts each booking's doctor field _id to its _id string.
    // Uses optional chaining (?.) to safely handle cases where doctor or _id might be missing 
    // if doctor or _id missing then it return the null or undefined values.
    // filter: Removes any undefined/null values (e.g., if a booking had no doctor).

    const doctorIds = bookings
      .map((booking) => booking.doctor?._id?.toString())
      .filter((id) => id);

    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
      "-password"
    );//Fetches all doctors whose _id is in the doctorIds array.

    res.status(200).json({
      success: true,
      message: "User appointments found",
      data: doctors,
    });
  } catch (error) {
    //console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user appointments!",
      data: error,
    });
  }
};
