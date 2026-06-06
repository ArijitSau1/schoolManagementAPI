const connectDB = require("../config/db");

const bcrypt = require("bcryptjs");



const createStudent = async (req, res) => {
  try {
    const { name, email, password, class_id } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide name, email and password",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const db = await connectDB();

    const [data] = await db.query(
      "INSERT INTO students(name,email,password,class_id) VALUES(?,?,?,?)",
      [name, email, hashedPassword, class_id || null]
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




const getStudents = async (req, res) => {
  try {

    const search = req.query.search || "";

    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 5;

    const offset = (page - 1) * limit;

    const db = await connectDB();

    const [data] = await db.query(
      `SELECT * FROM students
       WHERE name LIKE ?
       LIMIT ? OFFSET ?`,
      [`%${search}%`, limit, offset]
    );

    res.status(200).send({
      success: true,
      page,
      limit,
      totalRecords: data.length,
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


const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    const { name, email, class_id } = req.body;

    const db = await connectDB();

    await db.query(
      "UPDATE students SET name=?, email=?, class_id=? WHERE id=?",
      [name, email, class_id, studentId]
    );

    res.status(200).send({
      success: true,
      message: "Student Updated Successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};





const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    const db = await connectDB();

    await db.query(
      "DELETE FROM students WHERE id=?",
      [studentId]
    );

    res.status(200).send({
      success: true,
      message: "Student Deleted Successfully",
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
  updateStudent,
  deleteStudent,
};