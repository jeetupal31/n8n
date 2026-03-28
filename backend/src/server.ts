import express from "express"
import { runWorkflow } from "./engine/executionEngine"

const app = express()

app.use(express.json())

app.get("/", (req,res)=>{
 res.send("n8n clone server running")
})

app.post("/run-workflow", async (req, res) => {

    try {
        
        const result = await runWorkflow(req.body)

        res.json(result)

    } catch (error: any) {
        
        res.status(500).json({ error: error.message })
    }

})

app.listen(5000, ()=>{
 console.log("backend running on port 5000")
})