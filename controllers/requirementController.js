import Requirement from "../models/requirementModel.js";

// NGO creates requirement
export const createRequirement = async (req, res) => {
  const { title, description } = req.body;
  try {
    const requirement = await Requirement.create({
      ngo: req.user.id,
      title,
      description,
    });
    res.json(requirement);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get all requirements (public)
export const getAllRequirements = async (req, res) => {
  const requirements = await Requirement.find().populate("ngo", "name email");
  res.json(requirements);
};


// Volunteer applies
export const applyRequirement = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  console.log(message);
  try {
    const requirement = await Requirement.findById(id);
    requirement.applicants.push({
      volunteer: req.user.id,
      message,
    });
    await requirement.save();
    res.json({ msg: "Applied successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
