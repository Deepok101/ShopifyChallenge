const express = require("express");
const upload = require("../services/upload");
const { uploadImage, getImages, getUserImages, setInventory } = require("../controller/appController");
const router = express.Router();

// /api/images
router.get("/images", getImages);
router.get("/images/:username", getUserImages)
// /api/upload
router.post("/upload", upload.single("picture"), uploadImage);
router.post("/setInventory", setInventory)

// router.delete("/delete", deleteImage)
module.exports = router;