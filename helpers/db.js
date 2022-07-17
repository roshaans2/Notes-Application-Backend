const mongoose = require("mongoose")

const MONGO_URI = "mongodb+srv://Roshaan:roshaan@roshaan.lwu23.mongodb.net/test"

module.exports.connectDB = async ()=>{
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
}
