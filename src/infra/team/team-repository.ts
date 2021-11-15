import { Team as PrismaTeam } from "@prisma/client"
import { ITeamRepository } from "../../domain/team/interface/team-repository"
import { Context } from "../shared/context"
import { Team } from "../../domain/team/team"
import { TeamId } from "../../domain/team/team-id"
import { TeamName } from "../../domain/team/team-name"
import { ParticipantId } from "../../domain/participant/participant-id"
import { PairId } from "../../domain/pair/pair-id"

type PrismaTeamWithRelations = PrismaTeam & {
  pairs: {
    users: {
      id: string
    }[]
  }[]
}

export class TeamRepository implements ITeamRepository {
  constructor(private readonly context: Context) {}

  async insert(): Promise<void> {
    // TODO:
  }
  async update(): Promise<void> {
    // TODO:
  }

  async getTeamById(id: TeamId): Promise<Team | undefined> {
    const team = await this.context.prisma.team.findUnique({
      where: {
        id: id.props.value,
      },
      include: {
        pairs: {
          include: {
            users: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    })
    if (team === null) {
      return undefined
    }
    return this.build(team)
  }

  // HELP: 微妙かも? Team.pairsを作成後に削除するかも
  async getTeamByPair(pairId: PairId): Promise<Team | undefined> {
    const team = await this.context.prisma.team.findFirst({
      where: {
        pairs: {
          some: {
            id: {
              equals: pairId.props.value,
            },
          },
        },
      },
      include: {
        pairs: {
          include: {
            users: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    })
    if (team === null) {
      return undefined
    }
    return this.build(team)
  }

  async getAllTeamList(): Promise<Team[]> {
    const teams = await this.context.prisma.team.findMany({
      include: {
        pairs: {
          include: {
            users: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    })
    return teams.map((team) => this.build(team))
  }

  private build(resource: PrismaTeamWithRelations): Team {
    return Team.reconstruct(TeamId.reconstruct(resource.id), {
      name: TeamName.reconstruct(resource.name),
      participantIdList: resource.pairs.flatMap((pair) =>
        pair.users.map((user) => ParticipantId.reconstruct(user.id))
      ),
    })
  }
}
