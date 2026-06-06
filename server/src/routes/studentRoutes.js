const express = require("express");

const {
  getStudents,
   createStudent,
   getStudentById,
   updateStudent,
   deleteStudent,
} = require("../controllers/studentController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/getall",
  authMiddleware,
  getStudents
);

router.post("/create", createStudent);

router.get("/get/:id", authMiddleware, getStudentById);

router.put("/update/:id", authMiddleware, updateStudent);

router.delete("/delete/:id", authMiddleware, deleteStudent);

module.exports = router;