import express from "express"
import { participantRouter } from "./config/participant-router"

const app = express()
const PORT = 8000

app.use(express.json())

app.get("/", (_, res) => {
  res.send("hello")
})
app.use(participantRouter)

app.listen(PORT, () => {
  console.log(`start listening localhost:${PORT}`)
})
