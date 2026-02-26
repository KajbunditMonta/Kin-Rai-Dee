
import mongoose from 'mongoose';

const MenuSchema = new mongoose.Schema({
    name : { type : String, require : true },
    desc : { type : String, require : true },
    price : { type : Number, require : true },
    username : { type : String, require : true },
    createAt : { type : Date, default : Date.now}
});

export default mongoose.model("Menu", MenuSchema);