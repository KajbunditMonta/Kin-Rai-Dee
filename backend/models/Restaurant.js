import mongoose from "mongoose";

const restaurantSchema = mongoose.Schema({
    username : {type : String, require : true, unique : true},
    email : {type : String, require : true, unique : true},
    password : {type : String},
    type : {type : String, default : "restaurant"},
    createAt : {type : Date, default : Date.now}
});

export default mongoose.model('Restaurant', restaurantSchema);