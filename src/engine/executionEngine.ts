import { nodeRegistry } from "../registry/nodeRegistry"

export async function runWorkflow(workflow: any) {

    const results: any = {}

    const { nodes, edges } = workflow

    const executed: Set<string> = new Set()

    while (executed.size < nodes.length) {

        for (const node of nodes) {

            if(executed.has(node.id)) continue

            const dependencies = edges
            .filter((e: any) => e.to === node.id)
            .map((e: any) => e.from)

            const ready = dependencies.every((dep: string) => executed.has(dep))

            if(!ready) continue

            const handler = nodeRegistry[node.type]

            const output = await handler(node, results)

            results[node.id] = output

            executed.add(node.id)
        }
    }

    return results
}

