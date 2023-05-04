const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: "string",
      required: [true, "Company must be provided"],
      trim: true,
    },

    position: {
      type: String,
      required: [true, "Position must be provided"],
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      required: [true, "CreatedBy must be provided"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
