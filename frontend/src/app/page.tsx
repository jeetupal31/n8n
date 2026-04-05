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
      type: "custom",
      data: {
        label: "Agent Node",
        type: "agent",
        query: ""
      },
      position: { x: 200, y: 100 }
    }
  ])

  const [edges, setEdges] = useState([])
  const [result, setResult] = useState("")
  const [query, setQuery] = useState("")
  const [selectedNode, setSelectedNode] = useState<any>(null)

  const onConnect = (params: any) =>
    setEdges((eds) => addEdge(params, eds))

  // 🔥 ADD NODE
  const addNode = (type: string) => {

    const newNode = {
      id: (nodes.length + 1).toString(),
      type: "custom",
      data: {
        label: type.toUpperCase() + " Node",
        type: type,
        query: ""
      },
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400
      }
    }

    setNodes((prev) => [...prev, newNode])
  }

  // 🔥 UPDATE NODE QUERY
  const updateNodeQuery = (value: string) => {

    if (!selectedNode) return

    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === selectedNode.id
          ? {
              ...node,
              data: {
                ...node.data,
                query: value
              }
            }
          : node
      )
    )

    setSelectedNode((prev: any) => ({
      ...prev,
      data: {
        ...prev.data,
        query: value
      }
    }))
  }

  // 🔥 RUN WORKFLOW
  const runWorkflow = async () => {

    if (!query && nodes.every(n => !n.data.query)) {
      alert("Please enter a query")
      return
    }

    const workflow = {
      nodes: nodes.map(n => ({
        id: n.id,
        type: n.data.type,
        parameters: {
          query: n.data.query || query
        }
      })),
      edges: edges
    }

    const res = await fetch("http://localhost:5000/run-workflow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(workflow)
    })

    const data = await res.json()

    setResult(data["1"])
  }

  return (
    <div className="w-full h-screen">

      {/* 🔥 GLOBAL INPUT */}
      <input
        type="text"
        placeholder="Enter global query..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="absolute top-4 left-40 z-10 border px-3 py-2 rounded w-64"
      />

      {/* 🔥 RUN BUTTON */}
      <button
        onClick={runWorkflow}
        className="absolute top-4 left-4 z-10 bg-black text-white px-4 py-2 rounded"
      >
        Run Workflow
      </button>

      {/* 🔥 NODE BUTTONS */}
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

      {/* 🔥 RESULT PANEL */}
      <div className="absolute top-16 left-4 z-10 bg-white shadow-lg p-4 rounded w-64">
        <h2 className="font-bold mb-2">Result</h2>
        <p>{result || "No result yet"}</p>
      </div>

      {/* 🔥 NODE CONFIG PANEL */}
      {selectedNode && (
        <div className="absolute top-4 right-4 z-20 bg-white shadow-lg p-4 rounded w-72">

          <h2 className="font-bold mb-2">Node Config</h2>

          <p className="text-sm mb-2">
            Type: {selectedNode.data.type}
          </p>

          <input
            type="text"
            placeholder="Enter node query"
            value={selectedNode.data.query || ""}
            onChange={(e) => updateNodeQuery(e.target.value)}
            className="border w-full px-2 py-1 rounded"
          />

        </div>
      )}

      {/* 🔥 FLOW */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={(event, node) => setSelectedNode(node)}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>

    </div>
  )
}