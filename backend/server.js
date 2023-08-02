//packages
require("dotenv/config");
const express            = require("express");
const app                = express();
const mongoose           = require("mongoose");
const cors               = require("cors");
const { logger }         = require("./middleware/logger");
const userRoutes         = require("./routes/userRoutes");
const transacationRoutes = require("./routes/transactionRoutes");
const {authenticate}     = require("./middleware/auth");

//Middleware
app.use(logger);
app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
app.use("/transactions", authenticate, transacationRoutes);

//Connect to the DB
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(`Error connecting to the Db ${err.message}`));

//Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is up and running on PORT ${process.env.PORT}`);
});
