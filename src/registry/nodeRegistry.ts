import { httpNode } from "../nodes/httpNode";
import { llmNode } from "../nodes/llmNode";

export const nodeRegistry: any = {

    http: httpNode,
    llm: llmNode
}