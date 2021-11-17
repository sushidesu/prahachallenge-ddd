import { mock } from "jest-mock-extended"
import { Team } from "../team"
import { TeamId } from "../team-id"
import { TeamName } from "../team-name"
import { PairId } from "../../pair/pair-id"
import { TeamNameFactory } from "../team-name-factory"
import { GetParticipantCountInPairs } from "../domain-service/get-participant-count-in-pairs"

describe(`Team`, () => {
  describe(`create()`, () => {
    // NOTE: クラスのモックは jest-mock-extendedがよさそう!
    const teamNameFactoryMock = mock<TeamNameFactory>()
    const getParticipantCountMock = mock<GetParticipantCountInPairs>()
    afterEach(() => {
      jest.resetAllMocks()
    })

    const pair_id_a = PairId.reconstruct("a")
    const pair_id_b = PairId.reconstruct("b")

    describe(`チーム名`, () => {
      // team-name.test.ts
      // team-name-factory.test.ts でテスト済み
      // HELP: このように重複するテストも書くべきか？
    })
    describe(`参加者は3名以上`, () => {
      it(`参加者が3名の場合、正しくチームを作成できる`, async () => {
        // チーム名は1とする
        teamNameFactoryMock.create.mockResolvedValue(TeamName.reconstruct("1"))
        // ペアaには参加者が3人所属している
        getParticipantCountMock.do.mockResolvedValue(3)

        const actual = await Team.create(
          teamNameFactoryMock,
          getParticipantCountMock,
          [pair_id_a]
        )
        expect(actual).toStrictEqual(
          Team.reconstruct(expect.any(TeamId), {
            name: TeamName.reconstruct("1"),
            pairIdList: [pair_id_a],
          })
        )
      })
      it(`参加者が2名の場合、エラーになる`, async () => {
        // チーム名は1とする
        teamNameFactoryMock.create.mockResolvedValue(TeamName.reconstruct("1"))
        // ペアbには参加者が2人所属している
        getParticipantCountMock.do.mockResolvedValue(2)

        await expect(
          Team.create(teamNameFactoryMock, getParticipantCountMock, [pair_id_b])
        ).rejects.toThrowError("チームの参加者は最低3名必要です")
      })
    })
  })
})
