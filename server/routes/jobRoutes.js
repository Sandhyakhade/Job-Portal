import express from "express";
import { createJob, getAllJobs } from "../controller/jobController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public: Anyone logged in (or browsing) can view jobs
router.get("/", getAllJobs);

// Protected: Must have valid JWT (protect) AND role === "employer"
router.post("/", protect, authorizeRoles("employer"), createJob);

export default router;
