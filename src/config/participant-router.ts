import { Router } from "express"
import { ParticipantController } from "../controller/participant-controller"
import { JoinPrahaChallengeUsecase } from "../usecase/participant/join-praha-challenge-usecase/join-praha-challenge-usecase"
import { ParticipantRepository } from "../infra/participant/participant-repository"
import { PairRepository } from "../infra/pair/pair-repository"
import { TeamRepository } from "../infra/team/team-repository"
import { CheckEmailAlreadyExists } from "../domain/participant/check-email-already-exists"
import { ParticipantFactory } from "../domain/participant/participant-factory"
import { PairNameFactory } from "../domain/pair/pair-name-factory"
import { PairFactory } from "../domain/pair/pair-factory"
import { JoinPair } from "../domain/pair/join-pair"

const participantRouter = Router()

// repository
const participantRepository = new ParticipantRepository()
const pairRepository = new PairRepository()
const teamRepository = new TeamRepository()

// domain-service
const checkEmailAlreadyExists = new CheckEmailAlreadyExists(
  participantRepository
)
const participantFactory = new ParticipantFactory(checkEmailAlreadyExists)
const pairNameFactory = new PairNameFactory(pairRepository)
const pairFactory = new PairFactory(pairNameFactory)
const joinPair = new JoinPair(pairRepository, teamRepository, pairFactory)

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
