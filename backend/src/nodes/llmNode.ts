export async function llmNode(node: any) {

  return `LLM Response for: ${node.parameters.prompt}`
}