const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;
const mongodb = require("./config/database");
mongodb();

app.use(express.json());

app.use("/api/v1/user",require("./routes/auth.route"));


app.listen(PORT,()=>{
    console.log(`Server is listen at ${PORT}`)
})