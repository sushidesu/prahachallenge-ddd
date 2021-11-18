import { Router } from "express"
import { ParticipantController } from "../controller/participant-controller"
import { CreateParticipantUsecase } from "../usecase/participant/create-participant-usecase/create-participant-usecase"
import { createContext } from "../infra/shared/context"
import { ParticipantRepository } from "../infra/participant/participant-repository"
import { CheckEmailAlreadyExists } from "../domain/participant/domain-service/check-email-already-exists"
import { ParticipantFactory } from "../domain/participant/participant-factory"

// repository
const context = createContext()
const participantRepository = new ParticipantRepository(context)

// domain-service
const checkEmailAlreadyExists = new CheckEmailAlreadyExists(
  participantRepository
)
const participantFactory = new ParticipantFactory(checkEmailAlreadyExists)

// usecase
const createParticipantUsecase = new CreateParticipantUsecase(
  participantRepository,
  participantFactory
)

// controller
const controller = new ParticipantController(createParticipantUsecase)

// register endpoints
const participantRouter = Router()
participantRouter.post("/participant", controller.create)

export { participantRouter }
