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

You MUST use tools for calculations.

Available tools:
- calculator → for math
- weather → for temperature

Rules:
- If question involves math → use calculator
- If question involves weather → use weather
- DO NOT guess answers

Response format ONLY JSON:

Tool call:
{"action":"tool","tool":"calculator","input":"45*20"}

Final answer:
{"action":"final","answer":"900"}

Context:
${context}
`

    const response = await callLLM(prompt)

    // 🔥 Clean response
    const cleaned = response.replace(/```json|```/g, "").trim()

    let parsed

    try {
      parsed = JSON.parse(cleaned)
    } catch {
      if (!response.includes("{")) {
  // fallback if LLM behaves like chat
  return response
}
    }

    // ✅ Final answer
    if (parsed.action === "final") {
      return parsed.answer
    }

    // ✅ Tool call
    if (parsed.action === "tool") {

      const tool = tools[parsed.tool]

      if (!tool) {
        return "Tool not found"
      }

      const result = await tool.execute(parsed.input)

      // 🔥 Add tool result to context (VERY IMPORTANT)
      context += `
Tool used: ${parsed.tool}
Input: ${parsed.input}
Result: ${result}
`
    }
  }

  return "Max steps reached"
}