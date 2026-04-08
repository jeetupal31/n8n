import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import { connectDB } from "./config/db"
import authRoutes from "./routes/authRoutes"
import workflowRoutes from "./routes/workflowRoutes"
import { runWorkflow } from "./engine/executionEngine"

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/workflows", workflowRoutes)

// EXISTING
app.post("/run-workflow", async (req, res) => {
  const result = await runWorkflow(req.body)
  res.json(result)
})

app.listen(5000, () => {
  console.log("Server running 🚀")
})