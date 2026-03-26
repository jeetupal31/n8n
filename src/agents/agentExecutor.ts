import { callLLM } from "./llm"
import { calculator } from "../tools/calculator"
import { weather } from "../tools/weather"

const tools: any = {
  calculator,
  weather
}

export async function agentExecutor(query: string) {

  const prompt = `
You are an AI agent.

Available tools:
1. calculator → for math operations
2. weather → for temperature queries

Return ONLY JSON like this:
{
 "tool": "tool_name",
 "input": "input_for_tool"
}

User query:
${query}
`

  const response = await callLLM(prompt)

  // 🔥 extract JSON
  let parsed

  try {
    parsed = JSON.parse(response)
  } catch {
    return "Invalid AI response: " + response
  }

  const tool = tools[parsed.tool]

  if (!tool) {
    return "Tool not found"
  }

  return await tool.execute(parsed.input)
}