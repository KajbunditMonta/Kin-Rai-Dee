import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    username : { type : String, required: true, unique: true},
    email : { type : String, required: true, unique: true},
    password : { type : String },
    creatAt : { type : Date, default : Date.now },
    type : { type : String, default : "customer"}
});

export default mongoose.model('Customer', customerSchema);