import { GoogleGenerativeAI } from "@google/generative-ai"
import dotenv from "dotenv"

dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function callLLM(prompt: string) {

  const model = genAI.getGenerativeModel({ model: "gemini-pro" })

  const result = await model.generateContent(prompt)

  return result.response.text()
}