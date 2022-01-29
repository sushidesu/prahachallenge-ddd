import express from "express"
import { participantRouter } from "./config/participant-router"
import { pairRouter } from "./config/pair-router"

const app = express()
const PORT = 8000

const hello = "hello"

app.use(express.json())

app.get("/", (_, res) => {
  res.send("hello")
})
app.use(participantRouter)
app.use(pairRouter)

app.listen(PORT, () => {
  console.log(`start listening localhost:${PORT}`)
})
