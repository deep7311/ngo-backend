import Volunteer from "../models/volunteerModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerVolunteer = async (req, res) => {
  const { name, email, password, skills } = req.body;
  try {
    const exists = await Volunteer.findOne({ email });
    if (exists) return res.status(400).json({ msg: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);
    const volunteer = await Volunteer.create({ name, email, password: hash, skills });
    res.json(volunteer);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const loginVolunteer = async (req, res) => {
  const { email, password } = req.body;
  try {
    const volunteer = await Volunteer.findOne({ email });
    if (!volunteer) return res.status(404).json({ msg: "Not found" });

    const match = await bcrypt.compare(password, volunteer.password);
    if (!match) return res.status(401).json({ msg: "Wrong password" });

    const token = jwt.sign({ id: volunteer._id, role: "volunteer" }, process.env.JWT_SECRET);
    res.json({ token, volunteer });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
