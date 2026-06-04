const express = require("express");

const {
  getClasses,
  createClass,
  getClassById,
  updateClass,
  deleteClass,
} = require("../controllers/classController");

const router = express.Router();

router.get("/getall", getClasses);

router.post("/create", createClass);

router.get("/get/:id", getClassById);

router.put("/update/:id", updateClass);

router.delete("/delete/:id", deleteClass);

module.exports = router;