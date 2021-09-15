import { Pair } from "../pair"
import { PairId } from "../pair-id"
import { PairName } from "../pair-name"
import { ParticipantId } from "../../participant/participant-id"

describe("Pair", () => {
  describe("create()", () => {
    describe("参加者の人数は2または3名のみ", () => {
      let [a, b, c, d]: ParticipantId[] = []
      beforeEach(() => {
        a = ParticipantId.create()
        b = ParticipantId.create()
        c = ParticipantId.create()
        d = ParticipantId.create()
      })
      let pairName: PairName
      beforeEach(() => {
        pairName = PairName.reconstruct("a")
      })
      it("参加者が1人もいない場合 エラーになる", () => {
        expect(() =>
          Pair.createFromFactory({ name: pairName, participantIdList: [] })
        ).toThrowError()
      })
      it("参加者が1人の場合 エラーになる", () => {
        expect(() =>
          Pair.createFromFactory({ name: pairName, participantIdList: [a] })
        ).toThrowError()
      })
      it("参加者が2人の場合 正しくペアを作成できる", () => {
        const pair = Pair.createFromFactory({
          name: pairName,
          participantIdList: [a, b],
        })
        expect(pair).toEqual(expect.any(Pair))
      })
      it("参加者が3人の場合 正しくペアを作成できる", () => {
        const pair = Pair.createFromFactory({
          name: pairName,
          participantIdList: [a, b, c],
        })
        expect(pair).toEqual(expect.any(Pair))
      })
      it("参加者が4人の場合 エラーになる", () => {
        expect(() =>
          Pair.createFromFactory({
            name: pairName,
            participantIdList: [a, b, c, d],
          })
        ).toThrowError()
      })
    })
  })

  const participant = ParticipantId.reconstruct("participant")
  const participant_a = ParticipantId.reconstruct("participant-a")
  const participant_b = ParticipantId.reconstruct("participant-b")
  describe("acceptParticipant()", () => {
    it("所属している参加者が2名のとき、新たな参加者が加入できる", () => {
      const pair = Pair.reconstruct(PairId.reconstruct("a"), {
        name: PairName.reconstruct("a"),
        participantIdList: [participant_a, participant_b],
      })

      pair.acceptParticipant(participant)
      expect(pair.participantIdList).toEqual([
        participant_a,
        participant_b,
        participant,
      ])
    })
  })
})
