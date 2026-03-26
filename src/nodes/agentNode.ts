import { agentExecutor } from "../agents/agentExecutor"

export async function agentNode(node: any) {
  return await agentExecutor(node.parameters.query)
}