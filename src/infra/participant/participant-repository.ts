import { User } from "@prisma/client"
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

  async update(participant: Participant): Promise<void> {
    const id = participant.id.props.value
    await this.context.prisma.user.update({
      where: {
        id,
      },
      data: {
        name: participant.name.props.value,
        email: participant.email.props.value,
      },
    })
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

    return this.build(result)
  }

  async getParticipantsByEmail(email: Email): Promise<Participant[]> {
    const result = await this.context.prisma.user.findMany({
      where: {
        email: email.props.value,
      },
    })
    return result.map((resource) => this.build(resource))
  }

  private build(resource: User): Participant {
    const id = ParticipantId.reconstruct(resource.id)
    const name = ParticipantName.reconstruct(resource.name)
    const email = Email.reconstruct(resource.email)
    return Participant.reconstruct(id, {
      name,
      email,
    })
  }
}
