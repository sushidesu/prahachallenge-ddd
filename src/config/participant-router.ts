import { Router } from "express"
import { ParticipantController } from "../controller/participant-controller"
import { CreateParticipantUsecase } from "../usecase/participant/create-participant/create-participant-usecase"
import { UpdateProfileUsecase } from "../usecase/participant/update-profile/update-profile-usecase"
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
const updateProfileUsecase = new UpdateProfileUsecase(
  participantRepository,
  checkEmailAlreadyExists
)

// controller
const controller = new ParticipantController(
  createParticipantUsecase,
  updateProfileUsecase
)

// register endpoints
const participantRouter = Router()
participantRouter.post("/participant", controller.create)
participantRouter.post("/participant/:id", controller.update)

export { participantRouter }
