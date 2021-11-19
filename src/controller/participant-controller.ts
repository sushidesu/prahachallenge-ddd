import { RequestHandler } from "express"
import { handleError } from "./util/handle-error"
import { CreateParticipantUsecase } from "../usecase/participant/create-participant/create-participant-usecase"
import { CreateParticipantInputData } from "../usecase/participant/create-participant/create-participant-input-data"
import { UpdateProfileUsecase } from "../usecase/participant/update-profile/update-profile-usecase"
import { UpdateProfileInputData } from "../usecase/participant/update-profile/update-profile-input-data"

export class ParticipantController {
  constructor(
    private createParticipantUsecase: CreateParticipantUsecase,
    private updateProfileUsecase: UpdateProfileUsecase
  ) {}
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
      await this.createParticipantUsecase.exec(inputData)

      res.json({ message: "success!" })
    } catch (err) {
      const { code, message } = handleError(err)
      res.status(code).json({ message })
    } finally {
      next()
    }
  }

  public update: RequestHandler<{ id: string }> = async (req, res, next) => {
    try {
      const { id } = req.params
      const { name, email } = req.body
      if (typeof name !== "string" || typeof email !== "string") {
        throw new Error("name, email are required")
      }

      const inputData = new UpdateProfileInputData({
        id,
        name,
        email,
      })
      await this.updateProfileUsecase.exec(inputData)

      res.json({ message: "success!" })
    } catch (err) {
      const { code, message } = handleError(err)
      res.status(code).json({ message })
    } finally {
      next()
    }
  }
}
