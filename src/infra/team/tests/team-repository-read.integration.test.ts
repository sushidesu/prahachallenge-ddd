import { TeamRepository } from "../team-repository"
import { createContext } from "../../shared/context"
import { Team } from "../../../domain/team/team"
import { TeamId } from "../../../domain/team/team-id"
import { TeamName } from "../../../domain/team/team-name"
import { ParticipantId } from "../../../domain/participant/participant-id"
import {
  generatePair,
  generateTeam,
  generateUser,
} from "../../util/db-value-generator"
import { truncateAllTables } from "../../util/truncate-all-tables"

describe(`TeamRepository`, () => {
  const context = createContext()

  beforeAll(async () => {
    await context.prisma.team.create({
      data: {
        ...generateTeam("1"),
        pairs: {
          create: {
            ...generatePair("a"),
            users: {
              create: [
                generateUser("01"),
                generateUser("02"),
                generateUser("03"),
              ],
            },
          },
        },
      },
    })
  })
  afterAll(async () => {
    await truncateAllTables(context)
    await context.prisma.$disconnect()
  })

  let teamRepository: TeamRepository
  beforeEach(() => {
    teamRepository = new TeamRepository()
  })

  describe(`getTeamById()`, () => {
    it(`idが一致するチームを取得する`, async () => {
      const id = TeamId.reconstruct("id-team-1")
      const actual = await teamRepository.getTeamById(id)
      const expected = Team.reconstruct(TeamId.reconstruct("id-team-1"), {
        name: TeamName.reconstruct("1"),
        participantIdList: [
          ParticipantId.reconstruct("01"),
          ParticipantId.reconstruct("02"),
          ParticipantId.reconstruct("03"),
        ],
      })
      expect(actual).toStrictEqual(expected)
    })
  })
})
