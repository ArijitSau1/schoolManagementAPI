const connectDB = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const db = await connectDB();

    const [data] = await db.query(
      "SELECT * FROM students WHERE email=?",
      [email]
    );

    if (data.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Student Not Found",
      });
    }

    const student = data[0];
    

    const match = await bcrypt.compare(
      password,
      student.password
    );

    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: student.id,
        email: student.email,
      },
      "mysecretkey",
      {
        expiresIn: "1d",
      }
    );


    delete student.password;
    res.status(200).send({
      success: true,
      message: "Login Successful",
      token,
      student,
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
  loginStudent,
};