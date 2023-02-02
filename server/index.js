const express = require("express");
const app = express();
const cors = require("cors");
const records = require("./routes/records");
require("dotenv").config({ path: "./config.env" });

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/records", records);

const connectDB = require("./db/connect");

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
