import { callLLM } from "../agents/llm"

export async function llmNode(node: any) {

  const query = node.parameters.query

  if (!query) {
    return "No query provided"
  }

  const result = await callLLM(query)

  return result
}