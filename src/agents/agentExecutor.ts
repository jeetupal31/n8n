import { calculator } from "../tools/calculator"
import { weather } from "../tools/weather"

const tools: any = {
  calculator,
  weather
}

export async function agentExecutor(query: string) {

  // 🧠 Simple rule-based "AI" (we improve later with Gemini)

  if (query.includes("*") || query.includes("+")) {
    return calculator.execute(query)
  }

  if (query.toLowerCase().includes("temperature")) {
    return await weather.execute("Delhi")
  }

  return "I don't understand"
}