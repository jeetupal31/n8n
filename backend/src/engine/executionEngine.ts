import { nodeRegistry } from "../registry/nodeRegistry"

export async function runWorkflow(workflow: any) {

  const results: any = {}

  for (const node of workflow.nodes) {

    const executor = nodeRegistry[node.type]

    if (!executor) {
      results[node.id] = "Unknown node type"
      continue
    }

    try {
      const output = await executor(node)
      results[node.id] = output
    } catch (error: any) {
      results[node.id] = "Error: " + error.message
    }
  }

  return results
}