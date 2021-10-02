import { TeamNameFactory } from "../team-name-factory"
import { ITeamRepository } from "../interface/team-repository"
import { TeamName } from "../team-name"
import { Team } from "../team"
import { TeamId } from "../team-id"

describe(`TeamNameFactory`, () => {
  const teamRepositoryMock: jest.Mocked<ITeamRepository> = {
    save: jest.fn(),
    getTeamById: jest.fn(),
    getAllTeamList: jest.fn(),
  }
  afterEach(() => {
    jest.resetAllMocks()
  })

  let teamNameFactory: TeamNameFactory
  beforeEach(() => {
    teamNameFactory = new TeamNameFactory(teamRepositoryMock)
  })

  describe(`重複のない名前を連番で自動生成する`, () => {
    it(`チームが1つも存在しない場合、 "1" を生成`, async () => {
      teamRepositoryMock.getAllTeamList.mockResolvedValue([])
      const actual = await teamNameFactory.create()
      expect(actual).toStrictEqual(TeamName.reconstruct("1"))
    })
    it(`チームが存在する場合、最後のチームの名前の次の番号で生成`, async () => {
      teamRepositoryMock.getAllTeamList.mockResolvedValue([
        Team.reconstruct(TeamId.reconstruct("1"), {
          name: TeamName.reconstruct("1"),
          participantIdList: [],
        }),
        Team.reconstruct(TeamId.reconstruct("2"), {
          name: TeamName.reconstruct("2"),
          participantIdList: [],
        }),
      ])
      const actual = await teamNameFactory.create()
      expect(actual).toStrictEqual(TeamName.reconstruct("3"))
    })
  })
  describe(`チーム名は3文字以下`, () => {
    it(`チーム数が999以上の場合、エラーになる`, async () => {
      teamRepositoryMock.getAllTeamList.mockResolvedValue(
        Array.from({ length: 999 }).map((_, i) => {
          const index = (i + 1).toString()
          return Team.reconstruct(TeamId.reconstruct(index), {
            name: TeamName.reconstruct(index),
            participantIdList: [],
          })
        })
      )
      await expect(teamNameFactory.create()).rejects.toThrowError(
        "これ以上チーム名を作成できません"
      )
    })
  })
})
