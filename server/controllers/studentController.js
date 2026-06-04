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

module.exports = {
  getStudents,
};