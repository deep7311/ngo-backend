import NGO from "../models/ngoModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register
export const registerNGO = async (req, res) => {
  const { name, email, password, address, description, coordinates } = req.body;
  try {
    const existing = await NGO.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);
    const ngo = await NGO.create({
      name,
      email,
      password: hash,
      address,
      description,
      location: { type: "Point", coordinates },
    });

    res.json(ngo);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// login
export const loginNGO = async (req, res) => {
  const { email, password } = req.body;
  try {
    const ngo = await NGO.findOne({ email });
    if (!ngo) return res.status(404).json({ msg: "NGO not found" });

    const match = await bcrypt.compare(password, ngo.password);
    if (!match) return res.status(401).json({ msg: "Wrong password" });

    const token = jwt.sign({ id: ngo._id, role: "ngo" }, process.env.JWT_SECRET);
    res.json({ token, ngo });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Search ngos by their name
export const searchNGOByName = async (req, res) => {
  const { name } = req.query;
  const ngos = await NGO.find({ name: { $regex: name, $options: "i" } });
  res.json(ngos);
};


// Nearby NGOs
export const nearbyNGOs = async (req, res) => {
  const { lat, lng } = req.query;
  console.log(lat, lng);
  try {
    const ngos = await NGO.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: 20000, // 20 km
        },
      },
    });
    res.json(ngos);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};