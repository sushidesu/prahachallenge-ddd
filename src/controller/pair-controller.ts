import { RequestHandler } from "express"

export class PairController {
  public join: RequestHandler = async (req, res, next) => {
    try {
      console.log(req.body)
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ message: err.message })
      } else {
        res.status(500).json({ message: "unexpected error occurred" })
      }
    } finally {
      next()
    }
  }
}
