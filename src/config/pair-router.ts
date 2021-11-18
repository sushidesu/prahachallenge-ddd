import { Router } from "express"
import { PairController } from "../controller/pair-controller"
import { JoinPairUsecase } from "../usecase/participant/join-pair-usecase/join-pair-usecase"
import { createContext } from "../infra/shared/context"
import { ParticipantRepository } from "../infra/participant/participant-repository"
import { PairRepository } from "../infra/pair/pair-repository"
import { TeamRepository } from "../infra/team/team-repository"
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

// controller
const controller = new PairController(joinPairUsecase)

// register endpoints
const pairRouter = Router()
pairRouter.post("/pair/join", controller.join)

export { pairRouter }
