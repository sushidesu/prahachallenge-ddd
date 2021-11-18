import { RequestHandler } from "express"
import { JoinPairUsecase } from "../usecase/participant/join-pair-usecase/join-pair-usecase"
import { JoinPairInputData } from "../usecase/participant/join-pair-usecase/join-pair-input-data"

export class ParticipantController {
  constructor(private joinPrahaChallengeUsecase: JoinPairUsecase) {}
  public create: RequestHandler = async (req, res, next) => {
    try {
      const { participantId } = req.body
      if (typeof participantId !== "string") {
        throw new Error("participantId is required")
      }
      const inputData = new JoinPairInputData({
        participantId,
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
