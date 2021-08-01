import express from "express"
import { add } from "./hoge"

const app = express()
const PORT = 8000

app.get("/", (_, res) => {
  res.send(`Hello ${add(20)(20)}`)
})

app.listen(PORT, () => {
  console.log(`start listening localhost:${PORT}`)
})
