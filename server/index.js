const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(express.json());



app.use(
  "/api/v1/student",
  require("./routes/studentRoutes")
);


app.use(
  "/api/v1/teacher",
  require("./routes/teacherRoutes")
);

app.get("/", (req, res) => {
  res.send("School Management System API");
});

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
