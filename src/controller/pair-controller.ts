import { RequestHandler } from "express"
import { handleError } from "./util/handle-error"
import { JoinPairUsecase } from "../usecase/pair/join-pair/join-pair-usecase"
import { JoinPairInputData } from "../usecase/pair/join-pair/join-pair-input-data"
import { GetPairListUsecase } from "../usecase/pair/get-pair-list/get-pair-list-usecase"

export class PairController {
  constructor(
    private joinPairUsecase: JoinPairUsecase,
    private getPairListUsecase: GetPairListUsecase
  ) {}

  public join: RequestHandler = async (req, res, next) => {
    try {
      const { participantId } = req.body
      if (typeof participantId !== "string") {
        throw new Error("participantId is required")
      }
      const inputData = new JoinPairInputData({
        participantId,
      })
      await this.joinPairUsecase.exec(inputData)
      res.json({ message: "success!" })
    } catch (err) {
      const { code, message } = handleError(err)
      res.status(code).json({ message })
    } finally {
      next()
    }
  }

  public getPairList: RequestHandler = async (_, res, next) => {
    try {
      const { pairs } = await this.getPairListUsecase.exec()
      res.json({ pairs })
    } catch (err) {
      const { code, message } = handleError(err)
      res.status(code).json({ message })
    } finally {
      next()
    }
  }
}
