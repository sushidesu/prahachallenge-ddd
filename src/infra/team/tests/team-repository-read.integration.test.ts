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
import { PairId } from "../../../domain/pair/pair-id"

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
    await context.prisma.team.create({
      data: {
        ...generateTeam("2"),
        pairs: {
          create: [
            {
              ...generatePair("b"),
              users: {
                create: [generateUser("04"), generateUser("05")],
              },
            },
            {
              ...generatePair("c"),
              users: {
                create: [generateUser("06"), generateUser("07")],
              },
            },
          ],
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
    teamRepository = new TeamRepository(context)
  })

  describe(`getTeamById()`, () => {
    it(`idが一致するチームを取得する`, async () => {
      const id = TeamId.reconstruct("id-team-1")
      const actual = await teamRepository.getTeamById(id)
      const expected = Team.reconstruct(TeamId.reconstruct("id-team-1"), {
        name: TeamName.reconstruct("1"),
        participantIdList: [
          ParticipantId.reconstruct("id-user-01"),
          ParticipantId.reconstruct("id-user-02"),
          ParticipantId.reconstruct("id-user-03"),
        ],
      })
      expect(actual).toStrictEqual(expected)
    })
  })

  describe(`getTeamByPair()`, () => {
    it(`ペアの親チームを取得する`, async () => {
      const id = PairId.reconstruct("id-pair-a")
      const actual = await teamRepository.getTeamByPair(id)
      const expected = Team.reconstruct(TeamId.reconstruct("id-team-1"), {
        name: TeamName.reconstruct("1"),
        participantIdList: [
          ParticipantId.reconstruct("id-user-01"),
          ParticipantId.reconstruct("id-user-02"),
          ParticipantId.reconstruct("id-user-03"),
        ],
      })
      expect(actual).toEqual(expected)
    })
    it(`親チームがない場合はundefinedを返す`, async () => {
      const id = PairId.reconstruct("unknown-pair")
      const actual = await teamRepository.getTeamByPair(id)
      expect(actual).toBe(undefined)
    })
  })

  describe(`getAllTeamList()`, () => {
    it(`すべてのチームのリストを返す`, async () => {
      const actual = await teamRepository.getAllTeamList()
      const expected = [
        Team.reconstruct(TeamId.reconstruct("id-team-1"), {
          name: TeamName.reconstruct("1"),
          participantIdList: [
            ParticipantId.reconstruct("id-user-01"),
            ParticipantId.reconstruct("id-user-02"),
            ParticipantId.reconstruct("id-user-03"),
          ],
        }),
        Team.reconstruct(TeamId.reconstruct("id-team-2"), {
          name: TeamName.reconstruct("2"),
          participantIdList: [
            ParticipantId.reconstruct("id-user-04"),
            ParticipantId.reconstruct("id-user-05"),
            ParticipantId.reconstruct("id-user-06"),
            ParticipantId.reconstruct("id-user-07"),
          ],
        }),
      ]
      expect(actual).toStrictEqual(expected)
    })
  })
})
