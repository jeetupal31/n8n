"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Signup() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      if (res.ok) {
        alert("Signup successful ✅")
        router.push("/login")
      } else {
        alert("Signup failed ❌")
      }
    } catch {
      alert("Error signing up")
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">

      <div className="bg-white p-6 shadow rounded w-80">

        <h2 className="text-xl mb-4 font-bold">Signup</h2>

        <input
          type="email"
          placeholder="Email"
          className="border w-full mb-2 px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full mb-4 px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Signup
        </button>

        <p className="mt-3 text-sm">
          Already have account? <a href="/login" className="text-blue-500">Login</a>
        </p>

      </div>

    </div>
  )
}