import axios from "axios"

export async function httpNode(node: any) {

  const url = node.parameters.url

  if (!url) {
    return "No URL provided"
  }

  try {
    const res = await axios.get(url)
    return res.data
  } catch (error: any) {
    return "HTTP Error: " + error.message
  }
}