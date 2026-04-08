"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (data.token) {
        localStorage.setItem("token", data.token)
        router.push("/")
      } else {
        alert("Login failed ❌")
      }
    } catch {
      alert("Error logging in")
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">

      <div className="bg-white p-6 shadow rounded w-80">

        <h2 className="text-xl mb-4 font-bold">Login</h2>

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
          onClick={handleLogin}
          className="bg-black text-white w-full py-2 rounded"
        >
          Login
        </button>

        <p className="mt-3 text-sm">
          No account? <a href="/signup" className="text-blue-500">Signup</a>
        </p>

      </div>

    </div>
  )
}