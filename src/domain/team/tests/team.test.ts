import { Team } from "../team"
import { TeamId } from "../team-id"
import { TeamName } from "../team-name"
import { TeamNameFactory } from "../team-name-factory"
import { ParticipantId } from "../../participant/participant-id"

describe(`Team`, () => {
  describe(`create()`, () => {
    describe(`チーム名`, () => {
      // team-name.test.ts
      // team-name-factory.test.ts でテスト済み
      // HELP: このように重複するテストも書くべきか？
    })
    describe(`参加者は3名以上`, () => {
      // HELP: モックのやり方これでいいのか？
      const teamNameFactoryMock: jest.Mocked<TeamNameFactory> = {
        create: jest.fn(),
        // @ts-expect-error _brand
        _brand: undefined,
        // @ts-expect-error private property
        teamRepository: undefined,
      }
      afterEach(() => {
        jest.resetAllMocks()
      })
      it(`参加者が3名の場合、正しくチームを作成できる`, async () => {
        teamNameFactoryMock.create.mockResolvedValue(TeamName.reconstruct("1"))
        const actual = await Team.create(teamNameFactoryMock, [
          ParticipantId.reconstruct("participant-a"),
          ParticipantId.reconstruct("participant-b"),
          ParticipantId.reconstruct("participant-c"),
        ])
        expect(actual).toStrictEqual(
          Team.reconstruct(expect.any(TeamId), {
            name: TeamName.reconstruct("1"),
            participantIdList: [
              ParticipantId.reconstruct("participant-a"),
              ParticipantId.reconstruct("participant-b"),
              ParticipantId.reconstruct("participant-c"),
            ],
          })
        )
      })
      it(`参加者が2名の場合、エラーになる`, async () => {
        teamNameFactoryMock.create.mockResolvedValue(TeamName.reconstruct("1"))
        await expect(
          Team.create(teamNameFactoryMock, [
            ParticipantId.reconstruct("participant-a"),
            ParticipantId.reconstruct("participant-b"),
          ])
        ).rejects.toThrowError("チームの参加者は最低3名必要です")
      })
    })
  })
})
