const express = require("express");

const {
  getClasses,
  createClass,
  getClassById,
  updateClass,
  deleteClass,assignTeacherToClass,
} = require("../controllers/classController");

const router = express.Router();

router.get("/getall", getClasses);

router.post("/create", createClass);

router.get("/get/:id", getClassById);

router.put("/update/:id", updateClass);

router.delete("/delete/:id", deleteClass);

router.put("/assign-teacher/:id", assignTeacherToClass);

module.exports = router;