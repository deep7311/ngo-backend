import mongoose from "mongoose";

const requirementSchema = new mongoose.Schema({
  ngo: { type: mongoose.Schema.Types.ObjectId, ref: "NGO", required: true },
  title: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
  applicants: [
    {
      volunteer: { type: mongoose.Schema.Types.ObjectId, ref: "Volunteer" },
      message: String,
      appliedAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("Requirement", requirementSchema);
