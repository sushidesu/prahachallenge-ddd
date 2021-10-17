import { RequestHandler } from "express"
import { JoinPrahaChallengeUsecase } from "../usecase/participant/join-praha-challenge-usecase/join-praha-challenge-usecase"
import { JoinPrahaChallengeInputData } from "../usecase/participant/join-praha-challenge-usecase/join-praha-challenge-input-data"

export class ParticipantController {
  constructor(private joinPrahaChallengeUsecase: JoinPrahaChallengeUsecase) {}
  public create: RequestHandler = async (req, res, next) => {
    try {
      const { name, email } = req.body
      const inputData = new JoinPrahaChallengeInputData({
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
