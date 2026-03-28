export function resolveParams(params: any, results: any) {

  const resolved: any = {}

  for (const key in params) {

    let value = params[key]

    if (typeof value === "string") {

      value = value.replace(/\{\{\$node\[(.*?)\]\}\}/g, (_, nodeId) => {
        return JSON.stringify(results[nodeId] || "")
      })
    }

    resolved[key] = value
  }

  return resolved
}