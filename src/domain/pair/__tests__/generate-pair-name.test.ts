import { mock } from "jest-mock-extended"
import { GeneratePairName } from "../generate-pair-name"
import { IPairRepository } from "../interface/pair-repository"
import { TeamId } from "../../team/team-id"
import { Pair } from "../pair"
import { PairId } from "../pair-id"
import { PairName } from "../pair-name"

describe(`PairNameFactory`, () => {
  const pairRepositoryMock = mock<IPairRepository>()

  afterEach(() => {
    jest.resetAllMocks()
  })

  let generatePairName: GeneratePairName
  beforeEach(() => {
    generatePairName = new GeneratePairName(pairRepositoryMock)
  })

  const team_id_1 = TeamId.reconstruct("1")

  const pair_a = Pair.reconstruct(PairId.reconstruct("a"), {
    name: PairName.reconstruct("a"),
    participantIdList: [],
  })
  const pair_b = Pair.reconstruct(PairId.reconstruct("b"), {
    name: PairName.reconstruct("b"),
    participantIdList: [],
  })
  const pair_c = Pair.reconstruct(PairId.reconstruct("c"), {
    name: PairName.reconstruct("c"),
    participantIdList: [],
  })

  describe(`チーム内で重複のないペア名を生成する`, () => {
    it(`チーム内にペアが一つもない場合、 "a" を生成`, async () => {
      pairRepositoryMock.getPairListInTeam.mockResolvedValue([])

      const name = await generatePairName.generate(team_id_1)
      expect(name.props.value).toBe("a")
    })

    describe(`チーム内にペアが存在する場合、重複の無い一番若いアルファベットで生成する`, () => {
      it(`"a", "b" が存在する場合、 "c" を生成する`, async () => {
        pairRepositoryMock.getPairListInTeam.mockResolvedValue([pair_a, pair_b])

        const name = await generatePairName.generate(team_id_1)
        expect(name.props.value).toBe("c")
      })
      it(`"a", "c" が存在する場合、 "b" を生成する`, async () => {
        pairRepositoryMock.getPairListInTeam.mockResolvedValue([pair_a, pair_c])

        const name = await generatePairName.generate(team_id_1)
        expect(name.props.value).toBe("b")
      })
      it(`"a", "b", ..., "y" が存在する場合、 "z" を生成する`, async () => {
        pairRepositoryMock.getPairListInTeam.mockResolvedValue(
          Array.from("abcdefghijklmnopqrstuvwxy").map((name) =>
            Pair.reconstruct(PairId.reconstruct(name), {
              name: PairName.reconstruct(name),
              participantIdList: [],
            })
          )
        )

        const name = await generatePairName.generate(team_id_1)
        expect(name.props.value).toBe("z")
      })
    })

    it(`チーム内にペアが26以上存在する場合、エラーになる`, async () => {
      pairRepositoryMock.getPairListInTeam.mockResolvedValue(
        Array.from("abcdefghijklmnopqrstuvwxyz").map((name) =>
          Pair.reconstruct(PairId.reconstruct(name), {
            name: PairName.reconstruct(name),
            participantIdList: [],
          })
        )
      )
      await expect(generatePairName.generate(team_id_1)).rejects.toThrowError(
        "これ以上ペアを作成できません"
      )
    })
  })
})
