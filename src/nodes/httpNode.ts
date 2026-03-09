import axios from "axios"

export async function httpNode(node: any) {

    const response = await axios.get(node.parameters.url)

    return response.data
}
