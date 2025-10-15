import mongoose from "mongoose";

const ngoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true }, // longitude, latitude
  },
  description: String,
});

ngoSchema.index({ location: "2dsphere" }); // for geo queries

export default mongoose.model("NGO", ngoSchema);
