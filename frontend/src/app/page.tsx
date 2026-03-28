"use client"

import React, { useState } from "react"
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap
} from "reactflow"
import "reactflow/dist/style.css"

export default function Home() {

  const [nodes, setNodes] = useState([
    {
      id: "1",
      data: { label: "Agent Node" },
      position: { x: 200, y: 100 }
    }
  ])

  const [edges, setEdges] = useState([])

  const onConnect = (params: any) =>
    setEdges((eds) => addEdge(params, eds))

  return (
    <div className="w-full h-screen">

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>

    </div>
  )
}