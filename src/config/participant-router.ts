import { Router } from "express"
import { ParticipantController } from "../controller/participant-controller"
import { JoinPrahaChallengeUsecase } from "../usecase/participant/join-praha-challenge-usecase/join-praha-challenge-usecase"
import { createContext } from "../infra/shared/context"
import { ParticipantRepository } from "../infra/participant/participant-repository"
import { PairRepository } from "../infra/pair/pair-repository"
import { TeamRepository } from "../infra/team/team-repository"
import { CheckEmailAlreadyExists } from "../domain/participant/check-email-already-exists"
import { ParticipantFactory } from "../domain/participant/participant-factory"
import { PairFactory } from "../domain/pair/pair-factory"
import { GeneratePairName } from "../domain/pair/domain-service/generate-pair-name"
import { JoinPair } from "../domain/pair/join-pair"
import { GetVacantPairList } from "../domain/pair/get-vacant-pair-list"
import { GetParentTeam } from "../domain/pair/domain-service/get-parent-team"

// repository
const context = createContext()
const participantRepository = new ParticipantRepository(context)
const pairRepository = new PairRepository(context)
const teamRepository = new TeamRepository(context)

// domain-service
const checkEmailAlreadyExists = new CheckEmailAlreadyExists(
  participantRepository
)
const participantFactory = new ParticipantFactory(checkEmailAlreadyExists)
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
const joinPrahaChallengeUsecase = new JoinPrahaChallengeUsecase(
  participantRepository,
  pairRepository,
  teamRepository,
  participantFactory,
  joinPair
)

// controller
const controller = new ParticipantController(joinPrahaChallengeUsecase)

// register endpoints
const participantRouter = Router()
participantRouter.post("/participant", controller.create)

export { participantRouter }
