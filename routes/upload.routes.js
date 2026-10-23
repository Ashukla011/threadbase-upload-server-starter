import express from "express";
import { verifyToken } from "../middleware/auth.js";
import upload from "../config/upload.js";

const router = express.Router();

// POST /api/upload
router.post(
  "/upload",
  verifyToken, // Ensures the user is authenticated via middleware
  (req, res) => {
    // Single file upload on the field named 'avatar'
    upload.single("avatar")(req, res, (err) => {
      if (err) {
        // Handle multer file filter or size limit errors
        return res.status(400).json({
          error: err.message || "File upload failed"
        });
      }

      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }

      // Construct file access URL
      const fileUrl = `/uploads/${req.file.filename}`;

      return res.status(201).json({
        message: "File uploaded successfully",
        filename: req.file.filename,
        url: fileUrl
      });
    });
  }
);

export default router;