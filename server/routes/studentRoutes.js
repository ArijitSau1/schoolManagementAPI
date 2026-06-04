const express = require("express");

const {
  getStudents,
   createStudent,
   getStudentById,
} = require("../controllers/studentController");

const router = express.Router();

router.get("/getall", getStudents);

router.post("/create", createStudent);

router.get("/get/:id", getStudentById);

module.exports = router;