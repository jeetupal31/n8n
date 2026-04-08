import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { User } from "../models/User"

const router = express.Router()

// 🔐 SIGNUP
router.post("/signup", async (req, res) => {
  const { email, password } = req.body

  const hashed = await bcrypt.hash(password, 10)

  const user = await User.create({ email, password: hashed })

  res.json(user)
})

// 🔐 LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) return res.status(400).json({ message: "User not found" })

  const valid = await bcrypt.compare(password, user.password)

  if (!valid) return res.status(400).json({ message: "Wrong password" })

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET as string
  )

  res.json({ token })
})

export default router