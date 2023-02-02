const mongoose = require("mongoose");

async function connectDB() {
  mongoose
    .connect(process.env.DB)
    .then(() => {
      console.log("Connected to the database.");
    })

    .catch((error) => {
      console.log("unable ta connect to the database.");
      console.log(error);
    });
}

module.exports = connectDB;
