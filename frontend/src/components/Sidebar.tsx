"use client"

export default function Sidebar({ addNode }: any) {
  return (
    <div className="absolute left-0 top-0 h-full w-40 bg-gray-900 text-white p-4 z-20">

      <h2 className="font-bold mb-4">Nodes</h2>

      <div className="flex flex-col gap-2">

        <button
          onClick={() => addNode("agent")}
          className="bg-blue-500 px-2 py-1 rounded"
        >
          Agent
        </button>

        <button
          onClick={() => addNode("http")}
          className="bg-green-500 px-2 py-1 rounded"
        >
          HTTP
        </button>

        <button
          onClick={() => addNode("llm")}
          className="bg-purple-500 px-2 py-1 rounded"
        >
          LLM
        </button>

      </div>

    </div>
  )
}