const connectDB = require("../config/db");


const getClasses = async (req, res) => {
  try {
    const db = await connectDB();

    const [data] = await db.query(
      "SELECT * FROM classes"
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



const createClass = async (req, res) => {
  try {

    const { class_name, teacher_id } = req.body;

    if (!class_name) {
      return res.status(400).send({
        success: false,
        message: "Please provide class name",
      });
    }

    const db = await connectDB();

    const [data] = await db.query(
      "INSERT INTO classes(class_name,teacher_id) VALUES(?,?)",
      [class_name, teacher_id || null]
    );

    res.status(201).send({
      success: true,
      message: "Class Created Successfully",
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



const getClassById = async (req, res) => {
  try {
    const classId = req.params.id;

    const db = await connectDB();

    const [data] = await db.query(
      "SELECT * FROM classes WHERE id=?",
      [classId]
    );

    if (data.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Class Not Found",
      });
    }

    res.status(200).send({
      success: true,
      class: data[0],
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};


const updateClass = async (req, res) => {
  try {
    const classId = req.params.id;

    const { class_name, teacher_id } = req.body;

    const db = await connectDB();

    await db.query(
      "UPDATE classes SET class_name=?, teacher_id=? WHERE id=?",
      [class_name, teacher_id, classId]
    );

    res.status(200).send({
      success: true,
      message: "Class Updated Successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};


const deleteClass = async (req, res) => {
  try {
    const classId = req.params.id;

    const db = await connectDB();

    await db.query(
      "DELETE FROM classes WHERE id=?",
      [classId]
    );

    res.status(200).send({
      success: true,
      message: "Class Deleted Successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};


const assignTeacherToClass = async (req, res) => {
  try {
    const classId = req.params.id;

    const { teacher_id } = req.body;

    const db = await connectDB();

    await db.query(
      "UPDATE classes SET teacher_id=? WHERE id=?",
      [teacher_id, classId]
    );

    res.status(200).send({
      success: true,
      message: "Teacher Assigned Successfully",
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
  getClasses,
  createClass,
  getClassById,
  updateClass,
  deleteClass,
  assignTeacherToClass,
};