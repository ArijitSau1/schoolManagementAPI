const connectDB = require("../config/db");


const getTeacher = async (req, res) => {
  try {

    const search = req.query.search || "";

    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 5;

    const offset = (page - 1) * limit;

    const db = await connectDB();

    const [data] = await db.query(
      `SELECT * FROM teachers
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


const createTeacher = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).send({
        success: false,
        message: "Please provide name and email",
      });
    }

    const db = await connectDB();

    const [data] = await db.query(
      "INSERT INTO teachers(name,email) VALUES(?,?)",
      [name, email]
    );

    res.status(201).send({
      success: true,
      message: "Teacher Created Successfully",
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


const getTeacherById = async (req, res) => {
  try {
    const teacherId = req.params.id;

    const db = await connectDB();

    const [data] = await db.query(
      "SELECT * FROM teachers WHERE id = ?",
      [teacherId]
    );

    if (data.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Teacher Not Found",
      });
    }

    res.status(200).send({
      success: true,
      teacher: data[0],
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};


const updateTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;

    const { name, email } = req.body;

    const db = await connectDB();

    await db.query(
      "UPDATE teachers SET name=?, email=? WHERE id=?",
      [name, email, teacherId]
    );

    res.status(200).send({
      success: true,
      message: "Teacher Updated Successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};


const deleteTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;

    const db = await connectDB();

    await db.query(
      "DELETE FROM teachers WHERE id=?",
      [teacherId]
    );

    res.status(200).send({
      success: true,
      message: "Teacher Deleted Successfully",
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
  getTeacher,
  createTeacher,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};