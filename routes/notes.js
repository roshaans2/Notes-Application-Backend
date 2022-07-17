const express = require("express")
const router = express.Router()
const {Authorized} = require("../middlewares/index")
const { User,Note } = require("../models/index")



router.get("/",Authorized,async(req,res)=>{
    try {
        const userId = req.user
        const notes = await Note.find({author:userId})


        const data = {
            success:true,
            data:{notes},
            message:"Note fetched successfully"
         }
        res.status(200).json(data)

    } catch (error) {
        console.log(error)
        const data = {
            success:false,
            data:{notes:null},
            message:error.message
         }
        res.status(400).json(data)
    }
})


router.post("/add",Authorized,async(req,res)=>{
    try {
        const userId = req.user
        const {title,content} = req.body
        const note = new Note({
            title,content,author:userId
        })
        await note.save()
        const user = await User.findById(userId)
        const userNotes = user.notes
        userNotes.push(note._id)
        await user.save()
        console.log(user)
        // await User.findByIdAndUpdate(userId,user)
        const data = {
            success:true,
            data:{note},
            message:"Note added successfully"
         }
        res.status(200).json(data)

    } catch (error) {
        console.log(error)
        const data = {
            success:false,
            data:{user:null},
            message:error.message
         }
        res.status(400).json(data)
    }
})

router.delete("/delete/:id",Authorized,async(req,res)=>{
    try {
        const userId = req.user
        const {id:noteId} = req.params

        const note = await Note.findById(noteId)

        if(note.author.toString() != userId){
            const data = {
                success:false,
                data:{note:null},
                message:"You are not authorized to delete this note"

            }
            return res.status(400).json(data)
        }

        await Note.findByIdAndDelete(noteId)

        await User.findByIdAndUpdate(userId,{
            $pull:{notes:noteId}

        })
        const data = {
            success:true,
            data:{note},
            message:"Note deleted successfully"
         }
        res.status(200).json(data)

    } catch (error) {
        console.log(error)
        const data = {
            success:false,
            data:{user:null},
            message:error.message
         }
        res.status(400).json(data)
    }
})

module.exports = router