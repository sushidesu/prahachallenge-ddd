import express from "express"
import cors from "cors"
import { participantRouter } from "./config/participant-router"
import { pairRouter } from "./config/pair-router"

const app = express()
const PORT = 8000

app.use(express.json())
app.use(cors())

app.get("/", (_, res) => {
  res.send("hello")
})
app.use(participantRouter)
app.use(pairRouter)

app.listen(PORT, () => {
  console.log(`start listening localhost:${PORT}`)
})
