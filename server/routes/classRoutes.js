const express = require("express");

const {
  getClasses,
  createClass,
} = require("../controllers/classController");

const router = express.Router();

router.get("/getall", getClasses);

router.post("/create", createClass);

module.exports = router;