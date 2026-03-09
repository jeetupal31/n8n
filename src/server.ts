import express from "express"

const app = express()

app.use(express.json())

app.get("/", (req,res)=>{
 res.send("n8n clone server running")
})

app.listen(3000, ()=>{
 console.log("server running on port 3000")
})