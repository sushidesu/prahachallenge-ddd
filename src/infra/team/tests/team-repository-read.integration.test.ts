import { TeamRepository } from "../team-repository"
import { createContext } from "../../shared/context"
import { Team } from "../../../domain/team/team"
import { TeamId } from "../../../domain/team/team-id"
import { TeamName } from "../../../domain/team/team-name"
import { generatePair, generateTeam } from "../../util/db-value-generator"
import { truncateAllTables } from "../../util/truncate-all-tables"
import { PairId } from "../../../domain/pair/pair-id"

describe(`TeamRepository`, () => {
  const context = createContext()

  beforeAll(async () => {
    await context.prisma.team.create({
      data: {
        ...generateTeam("1"),
        pairs: {
          create: generatePair("a"),
        },
      },
    })
    await context.prisma.team.create({
      data: {
        ...generateTeam("2"),
        pairs: {
          create: [generatePair("b"), generatePair("c")],
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
        pairIdList: [PairId.reconstruct("id-pair-a")],
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
        pairIdList: [PairId.reconstruct("id-pair-a")],
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
          pairIdList: [PairId.reconstruct("id-pair-a")],
        }),
        Team.reconstruct(TeamId.reconstruct("id-team-2"), {
          name: TeamName.reconstruct("2"),
          pairIdList: [
            PairId.reconstruct("id-pair-b"),
            PairId.reconstruct("id-pair-c"),
          ],
        }),
      ]
      expect(actual).toStrictEqual(expected)
    })
  })
})
