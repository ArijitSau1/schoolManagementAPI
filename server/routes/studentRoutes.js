const express = require("express");

const {
  getStudents,
   createStudent,
} = require("../controllers/studentController");

const router = express.Router();

router.get("/getall", getStudents);

router.post("/create", createStudent);

module.exports = router;