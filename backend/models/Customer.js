import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    username : { type : String, required: [true, 'Please Enter Username'], unique: true},
    email : { type : String, required: [true, 'Please Enter Email'], unique: true},
    password : { type : String, required: [true, 'Please Enter Password'] },
    createdAt : { type : Date, default : Date.now },
    type : { type : String, default : "customer"},
    resetPasswordToken: String,
    resetPasswordExpired: Date
});

export default mongoose.model('Customer', customerSchema);