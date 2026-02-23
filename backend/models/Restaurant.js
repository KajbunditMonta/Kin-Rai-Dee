import mongoose from "mongoose";

const restaurantSchema = mongoose.Schema({
    username : { type : String, required: [true, 'Please Enter Username'], unique: true},
    email : { type : String, required: [true, 'Please Enter Email'], unique: true},
    password : { type : String, required: [true, 'Please Enter Password'] },
    type : {type : String, default : "restaurant"},
    createAt : {type : Date, default : Date.now}
});

export default mongoose.model('Restaurant', restaurantSchema);