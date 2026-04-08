import express from "express"
import { Workflow } from "../models/Workflow"
import { authMiddleware } from "../middleware/auth"

const router = express.Router()

// SAVE
router.post("/", authMiddleware, async (req: any, res) => {
  const workflow = await Workflow.create({
    ...req.body,
    userId: req.user.id
  })
  res.json(workflow)
})

// GET ALL
router.get("/", authMiddleware, async (req: any, res) => {
  const workflows = await Workflow.find({ userId: req.user.id })
  res.json(workflows)
})

// DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
  await Workflow.findByIdAndDelete(req.params.id)
  res.json({ success: true })
})

export default router