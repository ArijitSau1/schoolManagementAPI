const express = require("express");

const {
  getTeacher,
  createTeacher,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController");

const router = express.Router();

router.get("/getall", getTeacher);

router.get("/get/:id", getTeacherById);

router.post("/create", createTeacher);

router.put("/update/:id", updateTeacher);

router.delete("/delete/:id", deleteTeacher);

module.exports = router;