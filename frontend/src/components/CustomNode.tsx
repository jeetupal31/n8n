"use client"

export default function CustomNode({ data }: any) {

  const colors: any = {
    agent: "bg-blue-100 border-blue-400",
    http: "bg-green-100 border-green-400",
    llm: "bg-purple-100 border-purple-400"
  }

  return (
    <div className={`border-2 rounded-lg px-4 py-2 shadow ${colors[data.type]}`}>
      <strong>{data.label}</strong>
      <p className="text-xs text-gray-600">{data.type}</p>
    </div>
  )
}