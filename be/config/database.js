const mongoose = require("mongoose");
require("dotenv").config();
const mongodb = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log(`Database connected successfully`);
    })
    .catch((err) => {
      console.error(err);
      console.log(`Failed to connect database`);
      process.exit(1);
    });
};

module.exports = mongodb;
