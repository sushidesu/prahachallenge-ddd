import { RequestHandler } from "express"
import { JoinPairUsecase } from "../usecase/participant/join-pair-usecase/join-pair-usecase"
import { JoinPairInputData } from "../usecase/participant/join-pair-usecase/join-pair-input-data"

export class ParticipantController {
  constructor(private joinPrahaChallengeUsecase: JoinPairUsecase) {}
  public create: RequestHandler = async (req, res, next) => {
    try {
      const { name, email } = req.body
      if (typeof name !== "string" || typeof email !== "string") {
        throw new Error("name, email is required")
      }
      const inputData = new JoinPairInputData({
        name,
        email,
      })
      await this.joinPrahaChallengeUsecase.exec(inputData)
      res.json({ message: "success!" })
    } catch (err) {
      console.error(err)
      if (err instanceof Error) {
        res.status(500).json({ message: err.message })
      } else {
        res.status(500).json({ message: "unexpected error occurred." })
      }
    } finally {
      next()
    }
  }
}
