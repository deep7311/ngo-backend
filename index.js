import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import ngoRoutes from "./routes/ngoRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import requirementRoutes from "./routes/requirementRoutes.js";

dotenv.config();
connectDB();

const app = express();
// app.use(cors({
//     origin: ["http://localhost:5173", "https://integretr-frontend.vercel.app/"],
//     credentials: true
// }));

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api/ngos", ngoRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/requirements", requirementRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
