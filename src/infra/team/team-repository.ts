import { ITeamRepository } from "../../domain/team/interface/team-repository"
import { Context } from "../shared/context"
import { Team } from "../../domain/team/team"
import { TeamId } from "../../domain/team/team-id"
import { TeamName } from "../../domain/team/team-name"
import { ParticipantId } from "../../domain/participant/participant-id"

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
    return Team.reconstruct(TeamId.reconstruct(team.id), {
      name: TeamName.reconstruct(team.name),
      participantIdList: team.pairs.flatMap((pair) =>
        pair.users.map((user) => ParticipantId.reconstruct(user.id))
      ),
    })
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
    return teams.map((team) =>
      Team.reconstruct(TeamId.reconstruct(team.id), {
        name: TeamName.reconstruct(team.name),
        participantIdList: team.pairs.flatMap((pair) =>
          pair.users.map((user) => ParticipantId.reconstruct(user.id))
        ),
      })
    )
  }
}
