import { nodeRegistry } from "../registry/nodeRegistry"

export async function runWorkflow(workflow: any) {

    const results: any = {}

    for(const node of workflow.nodes) {

        const handler = nodeRegistry[node.type]

        if(!handler){
            throw new Error(`Node type ${node.type} not found`)
        }

        const output = await handler(node, results)

        results[node.id] = output
    }

    return results
}

