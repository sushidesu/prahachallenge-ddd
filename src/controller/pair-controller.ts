import { RequestHandler } from "express"
import { handleError } from "./util/handle-error"
import { JoinPairUsecase } from "../usecase/pair/join-pair/join-pair-usecase"
import { JoinPairInputData } from "../usecase/pair/join-pair/join-pair-input-data"
import { GetPairListUsecase } from "../usecase/pair/get-pair-list/get-pair-list-usecase"
import { IAuthClient } from "./interface/auth-client"

export class PairController {
  constructor(
    private joinPairUsecase: JoinPairUsecase,
    private getPairListUsecase: GetPairListUsecase,
    private authClient: IAuthClient
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

  public getPairList: RequestHandler = async (req, res, next) => {
    try {
      // ヘッダーからトークンを取得
      const { authorization } = req.headers
      if (typeof authorization !== "string") {
        throw new Error("authorization header is required")
      }
      // 認可
      const result = await this.authClient.verifyToken(authorization)
      if (!result.ok) {
        console.log("authorization failed")
        res.status(401).json({ message: "authorization failed" })
        return
      } else {
        console.log("authorization succeeded")
      }

      // ペアを取得する
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
