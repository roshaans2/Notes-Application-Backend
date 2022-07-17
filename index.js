const express = require("express")

const {connectDB} = require("./helpers/db")
const User = require("./models/User")
const authRouter = require("./routes/auth")
const notesRouter = require("./routes/notes")

connectDB()
const app = express()
app.use(express.json())

app.use("/auth",authRouter)
app.use("/notes",notesRouter)

app.listen(3000,()=>{
    console.log("Server started at port 3000")
})