import express from "express";
import { createRequirement, getAllRequirements, applyRequirement } from "../controllers/requirementController.js";
import { protect } from "../middlewares/authMiddleware.js"

const router = express.Router();

router.post("/create", protect, createRequirement);
router.get("/", getAllRequirements);
router.post("/apply/:id", protect, applyRequirement);

export default router;
