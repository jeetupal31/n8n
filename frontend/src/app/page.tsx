"use client"

import React, { useState } from "react"
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap
} from "reactflow"
import CustomNode from "@/components/CustomNode"
import "reactflow/dist/style.css"

const nodeTypes = {
  custom: CustomNode
}

export default function Home() {

  const [nodes, setNodes] = useState([
  {
    id: "1",
    type: "custom", // 🔥 VERY IMPORTANT
    data: {
      label: "Agent Node",
      type: "agent" // 🔥 used later
    },
    position: { x: 200, y: 100 }
  }
])

  const [edges, setEdges] = useState([])
  const [result, setResult] = useState("")
  const [query, setQuery] = useState("")

  const onConnect = (params: any) =>
    setEdges((eds) => addEdge(params, eds))

  const addNode = (type: string) => {

  const newNode = {
    id: (nodes.length + 1).toString(),
    type: "custom", // 🔥 must match nodeTypes
    data: {
      label: type.toUpperCase() + " Node",
      type: type // 🔥 used for backend
    },
    position: {
      x: Math.random() * 400,
      y: Math.random() * 400
    }
  }

  setNodes((prev) => [...prev, newNode])
}


  const runWorkflow = async () => {
  try {
    const workflow = {
      nodes: [
        {
          id: "1",
          type: "agent",
          parameters: {
            query: query
          }
        }
      ],
      edges: []
    }

    const res = await fetch("http://localhost:5000/run-workflow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(workflow)
    })

    const data = await res.json()

    console.log("Result:", data)

    setResult(data["1"])

  } catch (error) {
    console.error(error)
    alert("Error calling backend")
  }
}

  return (
    <div className="w-full h-screen">

    <input
  type="text"
  placeholder="Enter your query..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  className="absolute top-4 left-40 z-10 border px-3 py-2 rounded w-64"
/>

      <button
  onClick={runWorkflow}
  className="absolute top-4 left-4 z-10 bg-black text-white px-4 py-2 rounded"
>
  Run Workflow
</button>

<div className="absolute top-16 right-4 z-10 flex gap-2">

  <button
    onClick={() => addNode("agent")}
    className="bg-blue-500 text-white px-3 py-1 rounded"
  >
    + Agent
  </button>

  <button
    onClick={() => addNode("http")}
    className="bg-green-500 text-white px-3 py-1 rounded"
  >
    + HTTP
  </button>

  <button
    onClick={() => addNode("llm")}
    className="bg-purple-500 text-white px-3 py-1 rounded"
  >
    + LLM
  </button>

</div>

<div className="absolute top-16 left-4 z-10 bg-white shadow-lg p-4 rounded w-64">
  <h2 className="font-bold mb-2">Result</h2>
  <p>{result || "No result yet"}</p>
</div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>

    </div>
  )
}