const mongoose = require("mongoose");

const InvoiceSchema = mongoose.Schema({
    user : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "User"
    },
    courseName : String,
    price : String,
    address : String,
    pinCode : String,
    courseID : {
        type : mongoose.SchemaType.ObjectId,
        ref : "Course"
    }
})

module.exports = mongoose.model("Invoice",InvoiceSchema);