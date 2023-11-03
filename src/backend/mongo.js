const mongoose = require ("mongoose");


const url="mongodb://127.0.0.1:27017"
const connectDB = async()=>{
    try {
        const conn= await mongoose.connect(url);
        console.log(`connect to MongoDB`);
    } catch (error) {
        console.log(`Error in MongoDB ${error}`)        
    }
}
connectDB()
module.exports = connectDB;


const newSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const collection = mongoose.model("collection", newSchema)

module.exports = collection
