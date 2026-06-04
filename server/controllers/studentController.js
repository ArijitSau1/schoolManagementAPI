const connectDB = require("../config/db");

const getStudents = async (req, res) => {
  try {
    const db = await connectDB();

    const [data] = await db.query(
      "SELECT * FROM students"
    );

    res.status(200).send({
      success: true,
      data,
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const createStudent = async (req, res) => {
  try {
    const { name, email, class_id } = req.body;

    if (!name || !email) {
      return res.status(400).send({
        success: false,
        message: "Please provide name and email",
      });
    }

    const db = await connectDB();

    const [data] = await db.query(
      "INSERT INTO students(name,email,class_id) VALUES(?,?,?)",
      [name, email, class_id || null]
    );

    res.status(201).send({
      success: true,
      message: "Student Created Successfully",
      data,
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;

    const db = await connectDB();

    const [data] = await db.query(
      "SELECT * FROM students WHERE id = ?",
      [studentId]
    );

    if (data.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Student Not Found",
      });
    }

    res.status(200).send({
      success: true,
      student: data[0],
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getStudents,
  createStudent,
  getStudentById,
};