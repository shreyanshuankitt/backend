require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");

const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//my-routes
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const categoryrRoutes = require("./routes/category.js");
const productRoutes = require("./routes/product.js");
const orderRoutes = require("./routes/order.js");

//db-connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONEECTED");
  })
  .catch(console.log("DB not CONNECTED"));

//this is middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//my-routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryrRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

const port = 8000;
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
