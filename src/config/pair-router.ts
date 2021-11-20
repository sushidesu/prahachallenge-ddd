import { Router } from "express"
import { PairController } from "../controller/pair-controller"
// usecase
import { JoinPairUsecase } from "../usecase/pair/join-pair/join-pair-usecase"
import { GetPairListUsecase } from "../usecase/pair/get-pair-list/get-pair-list-usecase"
// infra
import { createContext } from "../infra/shared/context"
import { ParticipantRepository } from "../infra/participant/participant-repository"
import { PairRepository } from "../infra/pair/pair-repository"
import { TeamRepository } from "../infra/team/team-repository"
import { PairWithParticipantQueryService } from "../infra/pair/query-service/pair-with-participant-query-service"
// domain-service
import { PairFactory } from "../domain/pair/pair-factory"
import { GeneratePairName } from "../domain/pair/domain-service/generate-pair-name"
import { JoinPair } from "../domain/pair/domain-service/join-pair"
import { GetVacantPairList } from "../domain/pair/domain-service/get-vacant-pair-list"
import { GetParentTeam } from "../domain/pair/domain-service/get-parent-team"

// repository
const context = createContext()
const participantRepository = new ParticipantRepository(context)
const pairRepository = new PairRepository(context)
const teamRepository = new TeamRepository(context)

// query-service
const pairWithParticipantQueryService = new PairWithParticipantQueryService()

// domain-service
const pairFactory = new PairFactory()
const getVacantPairList = new GetVacantPairList(pairRepository)
const getParentTeam = new GetParentTeam(teamRepository)
const generatePairName = new GeneratePairName(pairRepository)
const joinPair = new JoinPair(
  pairRepository,
  pairFactory,
  getVacantPairList,
  getParentTeam,
  generatePairName
)

// usecase
const joinPairUsecase = new JoinPairUsecase(
  participantRepository,
  pairRepository,
  joinPair
)
const getPairListUsecase = new GetPairListUsecase(
  pairWithParticipantQueryService
)

// controller
const controller = new PairController(joinPairUsecase, getPairListUsecase)

// register endpoints
const pairRouter = Router()
pairRouter.post("/pair/join", controller.join)
pairRouter.get("/pair", controller.getPairList)

export { pairRouter }
