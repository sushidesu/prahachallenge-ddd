import { Context } from "../shared/context"
import { IPairRepository } from "../../domain/pair/interface/pair-repository"
import { Pair } from "../../domain/pair/pair"
import { PairId } from "../../domain/pair/pair-id"
import { PairName } from "../../domain/pair/pair-name"
import { TeamId } from "../../domain/team/team-id"
import { ParticipantId } from "../../domain/participant/participant-id"

export class PairRepository implements IPairRepository {
  constructor(private readonly context: Context) {}

  async insert(): Promise<void> {
    // TODO:
  }
  async update(): Promise<void> {
    // TODO:
  }

  async getAllPairList(): Promise<Pair[]> {
    const result = await this.context.prisma.pair.findMany({
      include: {
        teams: {
          select: {
            id: true,
          },
        },
        users: {
          select: {
            id: true,
          },
        },
      },
    })
    return result.map((resource) =>
      Pair.reconstruct(PairId.reconstruct(resource.id), {
        name: PairName.reconstruct(resource.name),
        teamId: TeamId.reconstruct(resource.teams[0].id),
        participantIdList: resource.users.map(({ id }) =>
          ParticipantId.reconstruct(id)
        ),
      })
    )
  }
  async getPairListInTeam(): Promise<Pair[]> {
    // TODO:
    return []
  }
  async getVacantPairList(): Promise<Pair[]> {
    // TODO:
    return []
  }
}
