import { nodeRegistry } from "../registry/nodeRegistry"
import { resolveParams } from "./resolveParams"

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

            if (!handler) {
        throw new Error(`Node type ${node.type} not found`)
      }

       // 🔥 resolve params using previous results
      const resolvedParams = resolveParams(node.parameters, results)

            const output = await handler({
                ...node,
                parameters: resolveParams
            }, results)

            results[node.id] = output

            executed.add(node.id)
        }
    }

    return results
}

