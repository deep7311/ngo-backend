import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  skills: [String],
});

export default mongoose.model("Volunteer", volunteerSchema);
