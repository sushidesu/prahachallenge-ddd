import { Email } from "../../domain/participant/email"
import { IParticipantRepository } from "../../domain/participant/interface/participant-repository"
import { Participant } from "../../domain/participant/participant"
import { ParticipantId } from "../../domain/participant/participant-id"
import { ParticipantName } from "../../domain/participant/participant-name"
import { Context } from "../shared/context"

export class ParticipantRepository implements IParticipantRepository {
  constructor(private readonly context: Context) {}
  async insert(participant: Participant): Promise<void> {
    await this.context.prisma.user.create({
      data: {
        id: participant.id.props.value,
        name: participant.name.props.value,
        email: participant.email.props.value,
      },
    })
  }
  async update(): Promise<void> {
    // TODO:
  }
  async getParticipantById(
    id: ParticipantId
  ): Promise<Participant | undefined> {
    const result = await this.context.prisma.user.findUnique({
      where: {
        id: id.props.value,
      },
    })

    if (result === null) {
      return undefined
    }

    return Participant.reconstruct(ParticipantId.reconstruct(result.id), {
      name: ParticipantName.reconstruct(result.name),
      email: Email.reconstruct(result.email),
    })
  }
  async getParticipantsByEmail(): Promise<Participant[]> {
    // TODO:
    return []
  }
}
