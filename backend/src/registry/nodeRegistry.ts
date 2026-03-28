import { httpNode } from "../nodes/httpNode";
import { llmNode } from "../nodes/llmNode";
import { agentNode } from "../nodes/agentNode";

export const nodeRegistry: any = {
    http: httpNode,
    llm: llmNode,
    agent: agentNode
}