import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketPrice: { type: String, required: true },

    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

//This code defines a Mongoose middleware function that automatically 
// populates referenced fields (user and doctor) whenever a find operation
//  (like find(), findOne(), findById(), etc.) is executed on the Booking model.

bookingSchema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "doctor",
    select: "name",//select only name of doctor
  });
  next();//Proceeds to execute the query after population.
});

export default mongoose.model("Booking", bookingSchema);
