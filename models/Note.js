const mongoose = require("mongoose")

const NoteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:1,
    },
    content:{
        type:String,
        required:true,
        minlength:1,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    pinned:{
        type:Boolean,
        required:true,
        default:false,
    },
    color:{
        type:String,
        required:true,
        default:"#fff"
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }]
},{timestamps:true})

const Note = mongoose.model("Note",NoteSchema)

module.exports = Note
