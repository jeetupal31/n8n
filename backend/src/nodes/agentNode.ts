import { agentExecutor } from "../agents/agentExecutor"

export async function agentNode(node: any) {

  const query = node.parameters.query

  return await agentExecutor(query)
}