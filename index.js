const express = require("express");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const ProductsRouter = require("./routes/products.js");
const products = require("./model/allProducts.js");
const categories = require("./model/categories.js");
const titles = require("./model/titles.js");
const userRouter = require("./routes/userRoutes.js");
const logger  = require("./middleware/logger.js");
const app = express();
dotEnv.config();
app.use(bodyParser.json());

app.use(cors());

console.log(logger,'logger');

app.use(logger);

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("db connected");
    app.listen(5500, () => console.log("server connected"));
  })
  .catch((err) => console.log(err, "failed to connect !"));

app.use("/kids-store", ProductsRouter);
app.use("/", userRouter);
