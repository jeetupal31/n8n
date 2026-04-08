import mongoose from "mongoose"

const workflowSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  nodes: Array,
  edges: Array
})

export const Workflow = mongoose.model("Workflow", workflowSchema)