import { Router } from "express"
import { ParticipantController } from "../controller/participant-controller"
import { CreateParticipantUsecase } from "../usecase/participant/create-participant-usecase/create-participant-usecase"

// repository

// domain-service

// usecase
const createParticipantUsecase = new CreateParticipantUsecase()

// controller
const controller = new ParticipantController(createParticipantUsecase)

// register endpoints
const participantRouter = Router()
participantRouter.post("/participant", controller.create)

export { participantRouter }
