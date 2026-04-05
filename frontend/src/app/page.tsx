"use client"

import React, { useState, useEffect } from "react"
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap
} from "reactflow"
import "reactflow/dist/style.css"

import CustomNode from "@/components/CustomNode"
import Sidebar from "@/components/Sidebar"

const nodeTypes = {
  custom: CustomNode
}

export default function Home() {

  const [nodes, setNodes] = useState<any[]>([])
  const [edges, setEdges] = useState<any[]>([])
  const [result, setResult] = useState("")
  const [query, setQuery] = useState("")
  const [selectedNode, setSelectedNode] = useState<any>(null)

  const [workflows, setWorkflows] = useState<any[]>([])
  const [workflowName, setWorkflowName] = useState("")

  // 🔥 LOAD ALL WORKFLOWS
  useEffect(() => {
    const saved = localStorage.getItem("workflows")
    if (saved) {
      setWorkflows(JSON.parse(saved))
    }
  }, [])

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

  // 🔥 SAVE WORKFLOW (MULTIPLE)
  const saveWorkflow = () => {

    if (!workflowName) {
      alert("Enter workflow name")
      return
    }

    const newWorkflow = {
      id: Date.now(),
      name: workflowName,
      nodes,
      edges
    }

    const updated = [...workflows, newWorkflow]

    setWorkflows(updated)
    localStorage.setItem("workflows", JSON.stringify(updated))

    setWorkflowName("")
    alert("Workflow Saved ✅")
  }

  // 🔥 LOAD WORKFLOW
  const loadWorkflow = (wf: any) => {
    setNodes(wf.nodes || [])
    setEdges(wf.edges || [])
  }

  // 🔥 DELETE WORKFLOW
  const deleteWorkflow = (id: number) => {
    const updated = workflows.filter(w => w.id !== id)
    setWorkflows(updated)
    localStorage.setItem("workflows", JSON.stringify(updated))
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

      {/* 🔥 Sidebar */}
      <Sidebar addNode={addNode} />

      {/* 🔥 Top Controls */}
      <div className="absolute top-4 left-44 z-10 flex gap-2">

        <button
          onClick={runWorkflow}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Run
        </button>

        <input
          type="text"
          placeholder="Workflow name..."
          value={workflowName}
          onChange={(e) => setWorkflowName(e.target.value)}
          className="border px-3 py-2 rounded w-40"
        />

        <button
          onClick={saveWorkflow}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>

        <input
          type="text"
          placeholder="Global query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />

      </div>

      {/* 🔥 WORKFLOW LIST */}
      <div className="absolute top-16 left-44 z-10 bg-white p-3 shadow rounded w-72 max-h-48 overflow-y-auto">
        <h3 className="font-bold mb-2">Workflows</h3>

        {workflows.map((wf) => (
          <div key={wf.id} className="flex justify-between items-center mb-2">

            <button
              onClick={() => loadWorkflow(wf)}
              className="text-blue-600 underline"
            >
              {wf.name}
            </button>

            <button
              onClick={() => deleteWorkflow(wf.id)}
              className="text-red-500"
            >
              ✕
            </button>

          </div>
        ))}

      </div>

      {/* 🔥 RESULT */}
      <div className="absolute bottom-4 left-44 z-10 bg-white shadow-lg p-4 rounded w-72">
        <h2 className="font-bold mb-2">Result</h2>
        <p className="text-lg font-mono">{result || "No result yet"}</p>
      </div>

      {/* 🔥 NODE CONFIG */}
      {selectedNode && (
        <div className="absolute top-4 right-4 z-20 bg-white shadow-xl p-4 rounded w-80">

          <h2 className="font-bold mb-3">⚙ Node Config</h2>

          <p className="text-sm mb-2">
            Type: <strong>{selectedNode.data.type}</strong>
          </p>

          <input
            type="text"
            placeholder="Enter node query"
            value={selectedNode.data.query || ""}
            onChange={(e) => updateNodeQuery(e.target.value)}
            className="border w-full px-3 py-2 rounded"
          />

        </div>
      )}

      {/* 🔥 CANVAS */}
      <div className="ml-40 h-full">
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

    </div>
  )
}