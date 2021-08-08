import express from "express"

const app = express()
const PORT = 8000

app.get("/", (_, res) => {
  res.send("hello")
})

app.listen(PORT, () => {
  console.log(`start listening localhost:${PORT}`)
})
