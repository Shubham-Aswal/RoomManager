import mongoose  from "mongoose"
import dotenv from "dotenv"
import fs from "fs"
import { time } from "console"
dotenv.config({
    path : "../.env"
})
const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log("Connected to db successfully")
            fs.appendFileSync("src/db/startupLog.txt",`[success] connected to db, time - ${time()}, date - ${Date.now()}`,()=>{
            console.log("logged--")
        })

        })
        

    } catch (error) {
        console.error("unable to connect to db - connect.js:", error.message)
        fs.appendFileSync("src/db/startupLog.txt",`\n[failure] unable to connected to db, time - ${new Date().toLocaleTimeString()}, date - ${Date.now()}`)
            

    }
}
export default connectDB;