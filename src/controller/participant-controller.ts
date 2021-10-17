import { RequestHandler } from "express"
import { JoinPrahaChallengeUsecase } from "../usecase/participant/join-praha-challenge-usecase/join-praha-challenge-usecase"
import { JoinPrahaChallengeInputData } from "../usecase/participant/join-praha-challenge-usecase/join-praha-challenge-input-data"

export class ParticipantController {
  constructor(private joinPrahaChallengeUsecase: JoinPrahaChallengeUsecase) {}
  public create: RequestHandler = async (_, res) => {
    const inputData = new JoinPrahaChallengeInputData({
      name: "",
      email: "",
    })
    await this.joinPrahaChallengeUsecase.exec(inputData)
    res.json({ result: "true" })
  }
}
