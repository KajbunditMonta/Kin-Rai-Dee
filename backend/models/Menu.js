
import mongoose from 'mongoose';

const MenuSchema = new mongoose.Schema({
    name : { type : String, required : true },
    desc : { type : String, required : true },
    price : { type : Number, required : true },
    username : { type : String, required : true },
    createdAt : { type : Date, default : Date.now}
});

export default mongoose.model("Menu", MenuSchema);