const express = require("express");
const app = express();
const cors = require("cors");
const { sequelize } = require('./models')
require("dotenv").config();

const PORT = process.env.SERVER_PORT;
const corsOption = {
  origin: process.env.FRONT_END_DOMAIN,
};

sequelize.authenticate().then(() => {
  console.log("Db connected")
})
.catch(err => {
  console.log("Error connecting to db "+err)
})

//midlewares
app.use(express.json());
app.use(cors(corsOption));

//routes
// app.use("/api/admin", require("./routes/adminRoute"));
// app.use("/api", require("./routes/authenticateRoute"));
// app.use("/api/request", require("./routes/requestsRoute"));
// app.use("/api/users", require("./routes/userRoute"));

//server listen port
app.listen(PORT, () => {
  console.log(`app running on port ${PORT} successfully`);
});
