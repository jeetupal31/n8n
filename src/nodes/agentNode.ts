import { agentExecutor } from "../agents/agentExecutor"

export async function agentNode(node: any) {

  const query = node.parameters.query

  const result = await agentExecutor(query)

  return result
}