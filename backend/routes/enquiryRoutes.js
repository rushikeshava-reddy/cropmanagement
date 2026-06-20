import express from "express";
import {
  createEnquiry,
  getAllEnquiries,
  replyEnquiry,
  deleteEnquiry,
} from "../controllers/enquiryController.js";

const router = express.Router();

// Create a new enquiry
router.post("/", createEnquiry);

// Get all enquiries
router.get("/", getAllEnquiries);

// Reply to an enquiry
router.put("/:id/reply", replyEnquiry);

// Delete an enquiry
router.delete("/:id", deleteEnquiry);

export default router;