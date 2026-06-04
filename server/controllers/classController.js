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



module.exports = {
  getClasses,
  createClass,
};