import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

export async function callLLM(prompt: string) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
  {
    role: "system",
    content: "You must ONLY return JSON. No text."
  },
  {
    role: "user",
    content: prompt
  }
]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    )

    return response.data.choices[0].message.content

  } catch (error: any) {
    console.error("OpenRouter Error:", error.response?.data || error.message)
    throw new Error("LLM request failed")
  }
}