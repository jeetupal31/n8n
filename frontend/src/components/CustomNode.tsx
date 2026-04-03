"use client"

export default function CustomNode({ data }: any) {
  return (
    <div className="bg-white border rounded shadow px-4 py-2">
      <strong>{data.label}</strong>
    </div>
  )
}