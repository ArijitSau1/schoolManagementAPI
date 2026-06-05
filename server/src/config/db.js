const mysql = require("mysql2/promise");

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "school_db",
    });

    console.log("MySQL Connected");
    return connection;
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;