import { RequestHandler } from "express"
import { CreateParticipantUsecase } from "../usecase/participant/create-participant-usecase/create-participant-usecase"
import { CreateParticipantInputData } from "../usecase/participant/create-participant-usecase/create-participant-input-data"

export class ParticipantController {
  constructor(private createParticipantUsecase: CreateParticipantUsecase) {}
  public create: RequestHandler = async (req, res, next) => {
    try {
      const { name, email } = req.body
      // validate
      if (typeof name !== "string" || typeof email !== "string") {
        throw new Error("name, email are required")
      }

      const inputData = new CreateParticipantInputData({
        name,
        email,
      })
      this.createParticipantUsecase.exec(inputData)

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
