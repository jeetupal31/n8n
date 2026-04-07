import express from "express"
import cors from "cors"
import { runWorkflow } from "./engine/executionEngine"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Server running 🚀")
})

app.post("/run-workflow", async (req, res) => {

  try {
    const result = await runWorkflow(req.body)
    res.json(result)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }

})

app.listen(5000, () => {
  console.log("Backend running on port 5000")
})