import { Pair } from "../pair"
import { PairId } from "../pair-id"
import { PairName } from "../pair-name"
import { ParticipantId } from "../../participant/participant-id"

describe("Pair", () => {
  const name = PairName.reconstruct("a")

  const p_01 = ParticipantId.reconstruct("participant-01")
  const p_02 = ParticipantId.reconstruct("participant-02")
  const p_03 = ParticipantId.reconstruct("participant-03")
  const p_04 = ParticipantId.reconstruct("participant-04")

  describe("create()", () => {
    describe("参加者の人数は2または3名のみ", () => {
      it("参加者が1人もいない場合 エラーになる", () => {
        expect(() =>
          Pair.createFromFactory({
            name,
            participantIdList: [],
          })
        ).toThrowError()
      })
      it("参加者が1人の場合 エラーになる", () => {
        expect(() =>
          Pair.createFromFactory({
            name,
            participantIdList: [ParticipantId.reconstruct("a")],
          })
        ).toThrowError()
      })
      it("参加者が2人の場合 正しくペアを作成できる", () => {
        const pair = Pair.createFromFactory({
          name,
          participantIdList: [p_01, p_02],
        })
        expect(pair).toStrictEqual(
          Pair.reconstruct(expect.any(PairId), {
            name,
            participantIdList: [p_01, p_02],
          })
        )
      })
      it("参加者が3人の場合 正しくペアを作成できる", () => {
        const pair = Pair.createFromFactory({
          name,
          participantIdList: [p_01, p_02, p_03],
        })
        expect(pair).toBeInstanceOf(Pair)
      })
      it("参加者が4人の場合 エラーになる", () => {
        expect(() =>
          Pair.createFromFactory({
            name,
            participantIdList: [p_01, p_02, p_03, p_04],
          })
        ).toThrowError()
      })
    })
  })

  describe("acceptParticipant()", () => {
    it("所属している参加者が2名のとき、新たな参加者が加入できる", () => {
      const pair = Pair.reconstruct(PairId.reconstruct("a"), {
        name,
        participantIdList: [p_01, p_02],
      })

      pair.acceptParticipant(p_03)
      expect(pair.participantIdList).toEqual([p_01, p_02, p_03])
    })
    it("参加者が3名いるペアには加入できない", () => {
      const pair = Pair.reconstruct(PairId.reconstruct("a"), {
        name,
        participantIdList: [p_01, p_02, p_03],
      })
      expect(() =>
        pair.acceptParticipant(ParticipantId.reconstruct("participant"))
      ).toThrowError("参加者が3名いるペアには加入できません")
    })
  })

  describe("removeParticipant()", () => {
    it("指定した参加者を削除する", () => {
      const pair = Pair.reconstruct(PairId.reconstruct("a"), {
        name,
        participantIdList: [p_01, p_02, p_03],
      })
      pair.removeParticipant(p_02)
      expect(pair.participantIdList).toStrictEqual([p_01, p_03])
    })
    it("ペアに存在しない参加者は削除できない", () => {
      const pair = Pair.reconstruct(PairId.reconstruct("a"), {
        name: PairName.reconstruct("a"),
        participantIdList: [p_01, p_02, p_03],
      })
      expect(() =>
        pair.removeParticipant(ParticipantId.reconstruct("unknown-participant"))
      ).toThrowError("ペアに存在しない参加者は削除できません")
    })
    it("対象を指定しない場合は最後の参加者を削除する", () => {
      const pair = Pair.reconstruct(PairId.reconstruct("a"), {
        name,
        participantIdList: [p_01, p_02, p_03],
      })
      pair.removeParticipant()
      expect(pair.participantIdList).toStrictEqual([p_01, p_02])
    })
    it("参加者を2名未満にできない", () => {
      const pair = Pair.reconstruct(PairId.reconstruct("a"), {
        name,
        participantIdList: [p_01, p_02],
      })
      expect(() => pair.removeParticipant()).toThrowError(
        "参加者を2名未満にはできません"
      )
    })
  })
})
