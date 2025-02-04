const express = require("express");
const app = express();
const db = require("./db/db");
const cors = require("cors");
const sendMail = require("./common/mail");
const fileUpload = require("express-fileupload")
require("dotenv").config();

const PORT = process.env.SERVER_PORT;
const corsOption = {
  origin: process.env.FRONT_END_DOMAIN,
};

db.connect();

//midlewares
app.use(fileUpload())
app.use(express.json());
app.use(cors(corsOption));

setTimeout(() => {
  //routes
  app.use("/api/admin", require("./routes/adminRoute"));
  app.use("/api", require("./routes/authenticateRoute"));
  app.use("/api/request", require("./routes/requestsRoute"));
  app.use("/api/events", require("./routes/eventsRoute"));
  app.use("/api/users", require("./routes/userRoute"));
  app.use("/api/departments", require("./routes/departmentRoute"));
  app.use("/api/reports", require("./routes/reportRoute"));
  app.use("/api/academic-year", require("./routes/academicYearRoute"));

  //server listen port
  app.listen(PORT, () => {
    console.log(`app running on port ${PORT} successfully`);
  });
}, 2000)
