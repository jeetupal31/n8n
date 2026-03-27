import { callLLM } from "./llm"
import { calculator } from "../tools/calculator"
import { weather } from "../tools/weather"

const tools: any = {
  calculator,
  weather
}

export async function agentExecutor(query: string) {

  let context = `User query: ${query}\n`

  for (let i = 0; i < 5; i++) {

    const prompt = `
You are an AI agent.

Available tools:
1. calculator → for math operations
2. weather → for temperature queries

If you need a tool, return:
{
 "action": "tool",
 "tool": "tool_name",
 "input": "input"
}

If you have final answer, return:
{
 "action": "final",
 "answer": "your answer"
}

Context:
${context}
`

    const response = await callLLM(prompt)

    const cleaned = response.replace(/```json|```/g, "").trim()

    let parsed

    try {
      parsed = JSON.parse(cleaned)
    } catch {
      return "Invalid response: " + response
    }

    // 🔥 If final answer
    if (parsed.action === "final") {
      return parsed.answer
    }

    // 🔥 If tool call
    if (parsed.action === "tool") {

      const tool = tools[parsed.tool]

      if (!tool) {
        return "Tool not found"
      }

      const result = await tool.execute(parsed.input)

      // 🧠 Add result to context
      context += `
Used tool: ${parsed.tool}
Input: ${parsed.input}
Result: ${result}
`
    }
  }

  return "Max steps reached"
}