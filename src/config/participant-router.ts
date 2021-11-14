import { Router } from "express"
import { ParticipantController } from "../controller/participant-controller"
import { JoinPrahaChallengeUsecase } from "../usecase/participant/join-praha-challenge-usecase/join-praha-challenge-usecase"
import { createContext } from "../infra/shared/context"
import { ParticipantRepository } from "../infra/participant/participant-repository"
import { PairRepository } from "../infra/pair/pair-repository"
import { TeamRepository } from "../infra/team/team-repository"
import { CheckEmailAlreadyExists } from "../domain/participant/check-email-already-exists"
import { ParticipantFactory } from "../domain/participant/participant-factory"
import { PairNameFactory } from "../domain/pair/pair-name-factory"
import { PairFactory } from "../domain/pair/pair-factory"
import { JoinPair } from "../domain/pair/join-pair"
import { GetVacantPairList } from "../domain/pair/get-vacant-pair-list"

const participantRouter = Router()

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
const pairNameFactory = new PairNameFactory(pairRepository)
const pairFactory = new PairFactory(pairNameFactory)
const getVacantPairList = new GetVacantPairList(pairRepository)
const joinPair = new JoinPair(
  pairRepository,
  teamRepository,
  pairFactory,
  getVacantPairList
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

// router
participantRouter.post("/participant", controller.create)
export { participantRouter }
