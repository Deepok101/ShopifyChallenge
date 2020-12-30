const express = require("express");
const upload = require("../services/upload");
const { uploadImage, getImages, getUserImages, setInventory, setDiscount, deleteImage } = require("../controller/appController");
const router = express.Router();

// /api/images
router.get("/images", getImages);
router.get("/images/:username", getUserImages)
// /api/upload
router.post("/upload", upload.single("picture"), uploadImage);
router.post("/:id/setInventory", setInventory)
router.post("/:id/setDiscount", setDiscount)
router.post("/:id/delete", deleteImage)
// router.delete("/delete", deleteImage)
module.exports = router;