import app from "./src/app.js"
import connectDB from "./src/db/connect.js"
import dotenv from "dotenv"
dotenv.config({
    path : "../.env"
})


try {
    await connectDB()
    .then(()=>{
        app.listen(process.env.PORT || 8000)
    })
    
} catch (error) {
    console.log("failed to start the server",error)
}