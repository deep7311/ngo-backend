import express from "express";
import { registerNGO, loginNGO, searchNGOByName, nearbyNGOs } from "../controllers/ngoController.js";
const router = express.Router();

router.post("/register", registerNGO);
router.post("/login", loginNGO);
router.get("/search", searchNGOByName);
router.get("/nearby", nearbyNGOs);

export default router;
